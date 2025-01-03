import { Client } from "../client/Client";
import { Guild } from "./Guild";

import {
  APIRole,
  APIRoleTags,
  RESTPatchAPIGuildRoleJSONBody,
} from "discord-api-types/v10";
import * as Endpoints from "../rest/Endpoints";
import { resolveImage } from "../utils/ImageResolver";
import { Base } from "./Base";
import { PermissionNames } from "../common/interfaces";
import { ClientError, ClientTypeError } from "../client/errors/ClientError";
import { ErrorNames } from "../client/errors/ErrorList";
import { RESTResponse } from "../rest/requestHandler";

export interface EditRolePayload {
  name: string;
  permissions: string;
  color: number;
  hoist: boolean;
  icon: string;
  unicode_emoji: string;
  mentionable: boolean;
  reason?: string;
}

/**
 * Represents a Discord Guild Role
 */
export class GuildRole extends Base {
  /**
   * The ID of the guild to which the role belongs.
   */
  guildId: string;

  /**
   * The name of the role.
   */
  name: string;

  /**
   * Whether the role is displayed separately in the member list.
   */
  hoist: boolean;

  /**
   * The role's icon hash, if it has one.
   */
  icon: string | null;

  /**
   * The role's position in the hierarchy.
   */
  position: number;

  /**
   * The permissions the role has.
   */
  permissions: number;

  /**
   * Whether the role is managed by an integration.
   */
  managed: boolean;

  /**
   * Whether the role is mentionable.
   */
  mentionable: boolean;

  /**
   * The role's tags.
   */
  tags: APIRoleTags;

  /**
   * The role's flags.
   */
  role_flags: number;

  /**
   * The guild to which the role belongs.
   */
  private guild: Guild;

  /**
   * A reference to the client.
   */
  #client: Client;

  constructor(public data: APIRole, guild: Guild, client: Client) {
    super(client);
    this.#client = client;

    this.data = data;
    this.id = data.id;
    this.guildId = guild?.id || guild;
    this.guild = client.guilds.cache.get(guild.id) as Guild;
    this.name = data.name;
    this.hoist = !!data.hoist;
    this.icon = null;
    this.position = data.position;
    this.permissions = Number(data.permissions);
    this.managed = !!data.managed;
    this.mentionable = !!data.mentionable;
    this.tags = {};
    this.role_flags = data.flags;

    this._patch();
  }

  _patch() {
    if (this.data.icon) {
      this.icon = this.data.icon;
    }
    if (this.data.tags) {
      this.tags = this.data.tags;
    }
  }

  async delete(reason = undefined) {
    const me = this.guild.members.me;

    if (!me.permissions.has(PermissionNames.ManageRoles))
      throw new ClientError(ErrorNames.MissingPermissions, "ManageRoles");
    const response = await this.#client.rest.request(
      "DELETE",
      Endpoints.GuildRole(this.guildId, this.id),
      true,
      {},
      reason
    );

    return response?.error ? false : true;
  }

  async edit(
    body: RESTPatchAPIGuildRoleJSONBody & { position?: number },
    reason?: string
  ): Promise<RESTResponse | GuildRole> {
    const me = this.guild.members.me;

    if (!me.permissions.has(PermissionNames.ManageRoles))
      throw new ClientError(ErrorNames.MissingPermissions, "ManageRoles");

    if (!body && typeof body !== "object")
      throw new ClientTypeError(
        ErrorNames.InvalidType,
        "RESTPatchAPIGuildRoleJSONBody & { position?: number }",
        "body"
      );

    const response = await this.#client.rest.request(
      "PATCH",
      Endpoints.GuildRole(this.guildId, this.id),
      true,
      body,
      reason
    );

    if (response?.error || !response) {
      return response as RESTResponse;
    }
      return new GuildRole(
        response.data as APIRole,
        this.guild as Guild,
        this.#client
      );
  }

  async setName(name: string, reason?: string) {
    if (!name && typeof name !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "name");
    if (reason && typeof reason !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "reason");
    const response = await this.edit({ name }, reason);

    return response;
  }

  async setPosition(position: number, reason?: string) {
    if (!position && typeof position !== "number")
      throw new ClientTypeError(ErrorNames.InvalidType, "number", "position");
    if (reason && typeof reason !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "reason");
    const response = await this.edit({ position }, reason);

    return response;
  }

  async setColor(color: number, reason?: string) {
    if (!color && typeof color !== "number")
      throw new ClientTypeError(ErrorNames.InvalidType, "number", "color");
    if (reason && typeof reason !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "reason");
    const response = await this.edit({ color }, reason);

    return response;
  }

  async setHoist(hoist: boolean, reason?: string) {
    if (!hoist && typeof hoist !== "boolean")
      throw new ClientTypeError(ErrorNames.InvalidType, "boolean", "hoist");
    if (reason && typeof reason !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "reason");
    const response = await this.edit({ hoist: !!hoist }, reason);

    return response;
  }

  async setIcon(icon: string, reason?: string) {
    if (!icon && typeof icon !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "icon");
    if (reason && typeof reason !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "reason");
    const data = await resolveImage(icon);
    const response = await this.edit({ icon: data?.uri }, reason);

    return response;
  }

  async setEmoji(unicode_emoji: string, reason?: string) {
    if (!unicode_emoji && typeof unicode_emoji !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "unicode_emoji");
    if (reason && typeof reason !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "reason");
    const response = await this.edit({ unicode_emoji }, reason);

    return response;
  }

  async setMentionable(mentionable: boolean, reason?: string) {
    if (!mentionable && typeof mentionable !== "boolean")
      throw new ClientTypeError(ErrorNames.InvalidType, "boolean", "mentionable");
    if (reason && typeof reason !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "reason");
    const response = await this.edit({ mentionable }, reason);

    return response;
  }
}
