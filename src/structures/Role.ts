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
  guildId: any;
  name: any;
  hoist: boolean;
  icon: string | null;
  position: any;
  permissions: any;
  managed: boolean;
  mentionable: boolean;
  tags: APIRoleTags;
  flags: any;
  readonly guild?: Guild;
  #client: Client;

  constructor(public data: APIRole, guild: Guild, client: Client) {
    super(client);
    this.#client = client;

    this.data = data;
    this.id = data.id;
    this.guildId = guild?.id || guild;
    if (client.guilds && client.guilds.cache)
      this.guild = client.guilds.cache.get(guild.id);
    this.name = data.name;
    this.hoist = !!data.hoist;
    this.icon = null;
    this.position = data.position;
    this.permissions = data.permissions;
    this.managed = !!data.managed;
    this.mentionable = !!data.mentionable;
    this.tags = {};
    this.flags = data.flags;

    this._patch();
  }

  _patch() {
    if (this.data.icon && this.data.icon) {
      this.icon = this.data.icon;
    }
    if (this.data.tags) {
      this.tags = this.data.tags;
    }
  }

  async delete(reason = undefined) {
    const response = await this.#client.rest.request(
      "DELETE",
      Endpoints.GuildRole(this.guildId, this.id),
      true,
      {},
      reason
    );

    return response ? false : true;
  }

  async edit(
    body: RESTPatchAPIGuildRoleJSONBody & { position?: number },
    reason?: string
  ) {
    const response = await this.#client.rest.request(
      "PATCH",
      Endpoints.GuildRole(this.guildId, this.id),
      true,
      body,
      reason
    );

    if (!response) {
      return response;
    } else {
      return new GuildRole(response.data as APIRole, this.guildId, this.#client);
    }
  }

  async setName(name: string, reason?: string) {
    const response = await this.edit({ name }, reason);

    return response;
  }

  async setPosition(position: number, reason?: string) {
    const response = await this.edit({ position }, reason);

    return response;
  }

  async setColor(color: number, reason?: string) {
    const response = await this.edit({ color }, reason);

    return response;
  }

  async setHoist(hoist: boolean, reason?: string) {
    const response = await this.edit({ hoist: !!hoist }, reason);

    return response;
  }

  async setIcon(icon: string, reason?: string) {
    const data = await resolveImage(icon);
    const response = await this.edit({ icon: data.uri }, reason);

    return response;
  }

  async setEmoji(unicode_emoji: string, reason?: string) {
    const response = await this.edit({ unicode_emoji }, reason);

    return response;
  }

  async setMentionable(mentionable: boolean, reason?: string) {
    const response = await this.edit({ mentionable: !!mentionable }, reason);

    return response;
  }
}
