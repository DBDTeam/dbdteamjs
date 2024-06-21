import { APIUser } from "discord-api-types/v10";
import { Client } from "../client/Client";
import { Nullable, PresenceData } from "../common";
import * as Endpoints from "../rest/Endpoints";
import { PermissionsBitField } from "../types/PermissionsBitFields";
import { SnowflakeInformation, getAllStamps, setObj } from "../utils/utils";
import { Base } from "./Base";
import { Guild } from "./Guild";
import { MemberRolesManager } from "./Managers/RolesManager";
import { MemberEditPayload } from "./Payloads/MemberEditPayload";
import { User } from "./User";
import { ErrorResponseFromApi, ResponseFromApi } from "../interfaces/rest/requestHandler";

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
  permissions: any;

  /**
   * The IDs of the roles assigned to the member.
   */
  role_ids: string[];

  /**
   * The roles manager for the member.
   */
  roles: MemberRolesManager;

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

  #client: Client;

  /**
   * Creates a new Member instance.
   * @param data - The data for the member.
   * @param guild - The guild the member belongs to.
   * @param client - The client instance.
   */
  constructor(data: Record<any, any>, readonly guild: Guild, client: Client) {
    super(client);
    this.#client = client;
    this.#d = data;

    if (typeof guild === "string") {
      this.guild = client.guilds.cache.get(guild) as Guild;
    }

    this.guild = guild as Guild;

    this.#DATE = new Date(data.joined_at);
    this.#PREMIUM = new Date(data.premium_since);
    this.#TIMEOUTED = new Date(data.communication_disabled_until);

    this.joined = getAllStamps(this) as SnowflakeInformation;
    this.user = this.author;

    this.muted = data.mute;
    this.deafened = data.deaf;
    this.flags = data.flags;
    this.permissions = data.permissions;
    this.role_ids = data.roles;

    this.roles = new MemberRolesManager(this.guild, this, this.#client);
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
  
    let user:any = this.#client.users.cache.get(this.id);
    
    if (!user) {
      user = this.#d.user as APIUser || this.#d.author as APIUser;
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
      this.communicationDisabledUntil = getAllStamps(this.#TIMEOUTED) as SnowflakeInformation;
      this.timeoutUntil = this.communicationDisabledUntil;
      this.communicationDisabled = data.communication_disabled_until
        ? true
        : false;
      this.timeouted = this.communicationDisabled;
    }

    if (this.id === this.#client.user.id) {
      this.edit;
      this.kick;
      this.ban;
      this.leave = async () => {
        const response = await this.#client.rest.request(
          "DELETE",
          Endpoints.UserGuild(this.guild.id),
          true
        );
        return response;
      };
    }
  }

  /**
   * Makes the member leave the guild.
   */
  leave() {}

  /**
   * Checks if the member is kickable.
   * @returns True if the member can be kicked, false otherwise.
   */
  get kickable() {
    var _p = 0;
    var _h =
      this.roles.cache
        .toJSON()
        .sort((a: any, b: any) => b.position - a.position)?.[0]?.position || 0;
    const c = this.guild.members?.me;
    var _h1 =
      c?.roles.cache
        .toJSON()
        .sort((a: any, b: any) => b.position - a.position)?.[0]?.position || 0;
    for (var perms of c?.roles?.cache.toJSON() || []) {
      _p |= perms.permissions;
    }

    const conditions = {
      kick:
        _p & PermissionsBitField.Roles.KickMembers ||
        _p & PermissionsBitField.Roles.Administrator,
      client: this.id !== this.#client.user.id,
      owner: this.id.toString() !== this.guild.owner_id,
      highest: _h <= _h1,
    };

    var expression =
      !!conditions.kick &&
      conditions.client &&
      conditions.owner &&
      conditions.highest;

    return expression;
  }

  /**
   * Checks if the member is bannable.
   * @returns True if the member can be banned, false otherwise.
   */
  get bannable() {
    var _p = 0;
    var _h =
      this.roles.cache
        .toJSON()
        .sort((a: any, b: any) => b.position - a.position)?.[0]?.position || 0;
    const c = this.guild.members?.me;
    var _h1 =
      c?.roles.cache
        .toJSON()
        .sort((a: any, b: any) => b.position - a.position)?.[0]?.position || 0;
    for (var perms of c?.roles.cache.toJSON() || []) {
      _p |= perms.permissions;
    }

    const conditions = {
      ban:
        _p & PermissionsBitField.Roles.BanMembers ||
        _p & PermissionsBitField.Roles.Administrator,
      client: this.id !== this.#client.user.id,
      owner: this.id.toString() !== this.guild.owner_id,
      highest: _h <= _h1,
    };

    var expression =
      !!conditions.ban &&
      conditions.client &&
      conditions.owner &&
      conditions.highest;

    return expression;
  }

  /**
   * Edits the member with the provided payload.
   * @param obj - The payload for editing the member.
   * @returns {Promise<boolean>} True if the edit was successful, false otherwise.
   */
  async edit(obj: any): Promise<boolean> {
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
  async changeNickname(nickname: string, reason: string): Promise<Nullable<ErrorResponseFromApi | ResponseFromApi>> {
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
  async kick(reason: string): Promise<Nullable<ErrorResponseFromApi | ResponseFromApi>> {
    reason = reason?.trim();

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
  async ban(obj: { delete_message_seconds: number, reason: string }): Promise<Nullable<ErrorResponseFromApi | ResponseFromApi>> {
    const banObj = {
      delete_message_seconds: 0,
      reason: null,
    };

    var data = setObj(banObj, obj, {
      delete_message_seconds: "deleteMessageSeconds",
    });

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