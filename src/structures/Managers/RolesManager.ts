import { Collection } from "../../utils/Collection";
import { setObj } from "../../utils/utils";
import * as Endpoints from "../../rest/Endpoints";
import { GuildRole } from "../Role";
import { type Client } from "../../client/Client"
import { type Guild } from "../Guild"
import { type Member } from "../Member";
import { ErrorResponseFromApi, Methods, ResponseFromApi } from "../../interfaces/rest/requestHandler";
import { APIRole } from "discord-api-types/v10";
import { GuildMemberRoleOptions, GuildRoleCreatePayload } from "../../interfaces/member/role";

export class MemberRolesManager {
  private client: Client;
  readonly guild: Guild;
  readonly member: Member;
  public cache: Collection<string, GuildRole>;
  constructor(guild: Guild, member: Member, client: Client) {
    this.guild = guild
    this.member = member
    this.client = client;
    this.cache = new Collection();
    this.patch();
  }
  private patch() {
    for (var i in this.member.roles || []) {
      if(!this.guild.roles) return null;
      var roleFound = this.guild.roles.cache.get(this.member.roles[i]);
      this.cache.set(this.member.roles[i], roleFound);
    }
  }

  async add(addObject: GuildMemberRoleOptions): Promise<{ error: ErrorResponseFromApi[], success: ResponseFromApi[] } | null> {
    var roles = addObject.roles

    var reason = addObject.reason;

    var errors: ErrorResponseFromApi[] = [];
    var success: any = [];

    for (var i in roles) {
      var response = await this.client.rest.request(
        "PUT",
        Endpoints.GuildMemberRole(this.guild.id, this.member.id, roles[i]),
        true,
        {},
        reason
      );

      if (!response) return null;

      if (response.error) {
        errors.push(response as ErrorResponseFromApi);
      } else {
        success.push(response as ResponseFromApi);
      }
    }

    return {
      error: errors,
      success
    };
  }
  async remove(removeObject: GuildMemberRoleOptions): Promise<{ error: ErrorResponseFromApi[], success: ResponseFromApi[] } | null> {
    var roles =
      removeObject.roles

    var reason = removeObject.reason;

    var errors: ErrorResponseFromApi[] = []
    var success: ResponseFromApi[] = []

    for (var i in roles) {
      var response = await this.client.rest.request(
        "DELETE",
        Endpoints.GuildMemberRole(this.guild.id, this.member.id, roles[i]),
        true,
        {},
        reason
      );

      if (!response) return null;

      if (response.error) {
        errors.push(response as ErrorResponseFromApi);
      } else {
        success.push(response as ResponseFromApi);
      }
    }

    return { error: errors, success };
  }

  async fetch(roleId: string | null | undefined = null): Promise<Collection<string, GuildRole> | null> {
    if(!this.guild.roles) return null;
    var response = await this.guild.roles.fetch(roleId);

    if (!response) return null;
    var check = response as ErrorResponseFromApi
    if (!check.error) {
      if (response instanceof Collection) {
        var i = response
          .toJSON()
          .filter((i) => this.member?.roles?.includes(i.id));

        for (var x of i) {
          this.cache.set(x.id, x);
        }

        response = this.cache;
      }
    }

    return response as Collection<string, GuildRole>;
  }
}

export class GuildRolesManager {
  private client: Client;
  public guild: Guild;
  public cache: Collection<string, GuildRole>;
  constructor(guild: Guild, client: Client) {
    this.client = client;
    this.guild = guild;
    this.cache = new Collection();
  }

  async fetch(roleId: string | null | undefined): Promise<Collection<string, GuildRole> | GuildRole | ErrorResponseFromApi> {
    const response = await this.client.rest.request(
      "GET",
      Endpoints.GuildRoles(this.guild.id),
      true
    );

    if (!response || !response.data) return this.cache;

    var r:any;

    var _allGuildRoles = response.data;

    for (var i of _allGuildRoles as Array<any>) {
      var x = new GuildRole(i, this.guild, this.client);
      this.cache.set(i.id, x);

      if (roleId == i.id) {
        r = x;
      }
    }
      return r;
  }

  async delete(deleteObject: GuildMemberRoleOptions): Promise<{ error: ErrorResponseFromApi[], success: ResponseFromApi[] } | Collection<string, GuildRole>> {
    var roles = deleteObject.roles

    var reason = deleteObject.reason;

    var errors: ErrorResponseFromApi[] = []
    var success: ResponseFromApi[] = []

    for (var i in roles) {
      var response = await this.client.rest.request(
        "DELETE",
        Endpoints.GuildRole(this.guild.id, roles[i]),
        true,
        {},
        reason
      );

      if(!response) return this.cache;

      if (response.error) {
        errors.push(response as ErrorResponseFromApi);
      } else {
        success.push(response as ResponseFromApi);
      }
    }

    return { error: errors, success };
  }

  async create(createObject: GuildRoleCreatePayload) {
    const base = {
      name: "New Role",
      permissions: "0",
      color: 0,
      hoist: false,
      icon: null,
      unicode_emoji: null,
      mentionable: false,
      reason: null,
    };

    var data = setObj(base, createObject, { unicode_emoji: "unicodeEmoji" });

    var reason = data.reason;

    delete data.reason;

    const response = await this.client.rest.request(
      "POST",
      Endpoints.GuildRoles(this.guild.id),
      true,
      { data },
      reason
    );

    if(!response) return null;

    if (response.error) {
      return response;
    } else {
      if(!response.data) return null;

      this.cache.set(
        response.data.id,
        new GuildRole(response.data as APIRole, this.guild.id, this.client)
      );

      return response.data;
    }
  }
}
