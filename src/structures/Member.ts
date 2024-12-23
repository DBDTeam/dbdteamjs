import { Client } from "../client/Client";
import { Nullable, PresenceData } from "../common";
import * as Endpoints from "../rest/Endpoints";
import { PermissionsBitField } from "../types/PermissionsBitFields";
import { SnowflakeInformation, getAllStamps } from "../utils/utils";
import { Base } from "./Base";
import { Guild } from "./Guild";
import { MemberRolesManager } from "./Managers/RolesManager";
import { MemberEditPayload } from "./Payloads/MemberEditPayload";
import { User } from "./User";
import {
  ErrorResponseFromApi,
  ResponseFromApi,
} from "../interfaces/rest/requestHandler";
import { GuildRole } from "./Role";
import { MemberPermissionManager } from "./Managers/MemberPermissionManager";
import { RESTPatchAPIGuildMemberJSONBody } from "discord-api-types/v10";

/**
 * Represents a guild member and provides methods to manage and interact with it.
 */
class Member extends Base {
  readonly #DATE: Date;
  readonly #PREMIUM: Date;
  readonly #TIMEOUTED: Date;
  readonly #d: any;

  /**
   * The date the member joined the guild.
   */
  joined: SnowflakeInformation;

  /**
   * The user associated with this member.
   */
  user: User;

  /**
   * Whether the member is muted.
   */
  muted: boolean;

  /**
   * Whether the member is deafened.
   */
  deafened: boolean;

  /**
   * The flags associated with the member.
   */
  flags: bigint;

  /**
   * The permissions of the member.
   */
  permissions!: MemberPermissionManager;

  /**
   * The IDs of the roles assigned to the member.
   */
  role_ids: string[];

  /**
   * The roles manager for the member.
   */
  roles!: MemberRolesManager;

  /**
   * The presence status of the member.
   */
  presence: Nullable<PresenceData>;

  /**
   * The nickname of the member.
   */
  nick: Nullable<string>;

  /**
   * The avatar of the member.
   */
  avatar: Nullable<string>;

  /**
   * The date the member started boosting the guild.
   */
  premiumSince!: SnowflakeInformation;

  /**
   * Whether the member is pending.
   */
  pending!: boolean;

  /**
   * The date until the member is communication disabled.
   */
  communicationDisabledUntil!: Nullable<SnowflakeInformation>;

  /**
   * The timeout date of the member.
   */
  timeoutUntil!: Nullable<SnowflakeInformation>;

  /**
   * Whether the member is communication disabled.
   */
  communicationDisabled!: boolean;

  /**
   * Whether the member is timeouted.
   */
  timeouted!: boolean;

  /**
   * The guild where the member is located.
   */
  guild: Guild;

  #client: Client;

  /**
   * Creates a new Member instance.
   * @param data - The data for the member.
   * @param guild - The guild the member belongs to.
   * @param client - The client instance.
   */
  constructor(data: Record<any, any>, guild: Guild | string, client: Client) {
    super(data);
    this.#client = client;
    this.#d = data;

    this.guild =
      (typeof guild === "string"
        ? client.guilds.cache.get(guild)
        : guild) as Guild;

    this.#DATE = new Date(data?.joined_at || data?.join_timestamp);
    this.#PREMIUM = new Date(data?.premium_since);
    this.#TIMEOUTED = new Date(data?.communication_disabled_until);

    this.joined = getAllStamps(this) as SnowflakeInformation;
    this.user = this.author;

    this.muted = data?.mute;
    this.deafened = data?.deaf;
    this.flags = data?.flags;
    this.role_ids = data?.roles;
    this.presence = null;

    this._patch(data);
  }

  /**
   * Gets the user associated with this member.
   * @returns The User instance of the member.
   */
  get author() {
    if (this.id === this.#client.user.id) {
      return this.#client.user;
    }

    let user: any = this.#client.users.cache.get(this.id);

    if (!user) {
      user = this.#d.user ?? this.#d.author;
      this.#client.users.cache.set(this.id, new User(user, this.#client));
    }

    return user;
  }

  /**
   * Patches the member with new data.
   * @param data - The data to patch the member with.
   * @private
   */
  _patch(data: any) {
    if ("nick" in data && data.nick !== null && data.nick !== undefined) {
      this.nick = data.nick;
    }
    if ("avatar" in data && data.avatar !== null && data.avatar !== undefined) {
      this.avatar = data.avatar;
    }
    if (
      "premium_since" in data &&
      data.premium_since !== null &&
      data.premium_since !== undefined
    ) {
      this.premiumSince = getAllStamps(this.#PREMIUM) as SnowflakeInformation;
    }
    if ("pending" in data) {
      this.pending = data.pending;
    }
    if ("permissions" in data && !data.permissions) {
      this.permissions = data.permissions;
    }
    if ("communication_disabled_until" in data) {
      this.communicationDisabledUntil = getAllStamps(
        this.#TIMEOUTED
      ) as SnowflakeInformation;
      this.timeoutUntil = this.communicationDisabledUntil;
      this.communicationDisabled = data.communication_disabled_until
        ? true
        : false;
      this.timeouted = this.communicationDisabled;
    }

    this.roles = new MemberRolesManager(this.guild, this, this.#client);

    this.permissions = new MemberPermissionManager(
      this.#client,
      this,
      this.guild
    );

    if (this.id === this.#client.user.id) {
      this.edit;
      this.kick;
      this.ban;
      this.leave;
    }
  }

  /**
   * Makes the member leave the guild.
   */
  async leave() {
    const response = await this.#client.rest.request(
      "DELETE",
      Endpoints.UserGuild(this.guild.id),
      true
    );
    return response;
  }

  /**
   * Checks if the member is kickable.
   * @returns {boolean} True if the member can be kicked, false otherwise.
   */
  get kickable() {
    const highestRolePosition =
      this.roles.cache
        .toJSON()
        .sort((a: GuildRole, b: GuildRole) => b.position - a.position)?.[0]
        ?.position || 0;

    const clientMember = this.guild.members?.me;
    const clientHighestRolePosition =
      clientMember?.roles.cache
        .toJSON()
        .sort((a: GuildRole, b: GuildRole) => b.position - a.position)?.[0]
        ?.position || 0;

    const clientPermissions =
      clientMember?.roles.cache
        .toJSON()
        .reduce((permissions, role) => permissions | role.permissions, 0) || 0;

    const conditions = {
      kick:
        clientPermissions &
        (PermissionsBitField.Roles.KickMembers |
          PermissionsBitField.Roles.Administrator),
      client: this.id !== this.#client.user.id,
      owner: this.id.toString() !== this.guild.owner_id,
      highest: highestRolePosition <= clientHighestRolePosition,
    };

    return Object.values(conditions).every(Boolean);
  }

  /**
   * Checks if the member is bannable.
   * @returns True if the member can be banned, false otherwise.
   */
  get bannable() {
    const highestRolePosition =
      this.roles.cache
        .toJSON()
        .sort((a: GuildRole, b: GuildRole) => b.position - a.position)?.[0]
        ?.position || 0;

    const clientMember = this.guild.members?.me;
    const clientHighestRolePosition =
      clientMember?.roles.cache
        .toJSON()
        .sort((a: GuildRole, b: GuildRole) => b.position - a.position)?.[0]
        ?.position || 0;

    const clientPermissions =
      clientMember?.roles.cache
        .toJSON()
        .reduce((permissions, role) => permissions | role.permissions, 0) || 0;

    const conditions = {
      ban:
        clientPermissions &
        (PermissionsBitField.Roles.BanMembers |
          PermissionsBitField.Roles.Administrator),
      client: this.id !== this.#client.user.id,
      owner: this.id.toString() !== this.guild.owner_id,
      highest: highestRolePosition <= clientHighestRolePosition,
    };

    return Object.values(conditions).every(Boolean);
  }

  /**
   * Edits the member with the provided payload.
   * @param obj - The payload for editing the member.
   * @returns {Promise<boolean>} True if the edit was successful, false otherwise.
   */
  async edit(obj: RESTPatchAPIGuildMemberJSONBody): Promise<boolean> {
    var payload = new MemberEditPayload(obj);

    var reason = payload.payload.reason;

    delete payload.payload.reason;

    var response = await this.#client.rest.request(
      "PATCH",
      Endpoints.GuildMember(this.guild.id, this.id),
      true,
      { data: payload.payload },
      reason
    );

    if (response?.error) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Changes the nickname of the member.
   * @param nickname - The new nickname.
   * @param reason - The reason for changing the nickname.
   * @returns The response from the API.
   */
  async changeNickname(
    nickname: string,
    reason?: string
  ): Promise<Nullable<ErrorResponseFromApi | ResponseFromApi>> {
    reason = reason?.trim();
    var response = await this.#client.rest.request(
      "PATCH",
      Endpoints.GuildMember(this.guild.id, this.id),
      true,
      { data: { roles: this.roles, flags: this.flags, nick: nickname } },
      reason
    );

    return response;
  }

  /**
   * Kicks the member from the guild.
   * @param reason - The reason for kicking the member.
   * @returns The response from the API.
   */
  async kick(
    reason: string
  ): Promise<Nullable<ErrorResponseFromApi | ResponseFromApi>> {
    var response = await this.#client.rest.request(
      "DELETE",
      Endpoints.GuildMember(this.guild.id, this.id),
      true,
      {},
      reason
    );

    return response;
  }

  /**
   * Bans the member from the guild.
   * @param obj - The payload for banning the member.
   * @returns The response from the API.
   */
  async ban(data: {
    delete_message_seconds?: number;
    reason?: string;
  }): Promise<Nullable<ErrorResponseFromApi | ResponseFromApi>> {
    var response = await this.#client.rest.request(
      "PUT",
      Endpoints.GuildBan(this.guild.id, this.id),
      true,
      {},
      data.reason
    );

    return response;
  }

  /**
   * Returns a string representation of the member.
   * @returns The mention string of the member.
   */
  toString() {
    return `<@${this.id}>`;
  }
}

export { Member };
