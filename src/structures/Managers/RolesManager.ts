import { APIRole, RESTPostAPIGuildRoleJSONBody } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import {
  ErrorResponseFromApi,
  ResponseFromApi,
} from "../../interfaces/rest/requestHandler";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { setObj } from "../../utils/utils";
import { Guild } from "../Guild";
import { type Member } from "../Member";
import { EditRolePayload, GuildRole } from "../Role";
import { Nullable } from "../../common";

type RoleOptions = {
  roles: string[];
  reason?: string | undefined | null;
};

/**
 * Manages the roles of a member in a guild.
 */
export class MemberRolesManager {
  #client: Client;
  readonly guild: Guild;
  readonly member: Member;
  public cache: Collection<string, GuildRole>;

  /**
   * Constructs a new MemberRolesManager.
   * @param guild - The guild the member belongs to.
   * @param member - The member whose roles are being managed.
   * @param client - The client instance.
   */
  constructor(guild: Guild, member: Member, client: Client) {
    this.guild = guild;
    this.member = member;
    this.#client = client;
    this.cache = new Collection();
    this.#patch();
  }

  #patch() {
    const roles = this.guild.roles.cache
      .toJSON()
      .filter((role) => this.member.role_ids?.includes(role.id));

    for (var role of roles) {
      this.cache.set(role.id, role);
    }
  }

  /**
   * Adds roles to a member.
   * @param addObject - An object containing roles to add and a reason.
   * @returns An object containing errors and success responses.
   */
  async add(addObject: RoleOptions): Promise<{
    error: ErrorResponseFromApi[];
    success: ResponseFromApi[];
  } | null> {
    var roles = addObject.roles;

    var reason = addObject.reason;

    var errors: ErrorResponseFromApi[] = [];
    var success: any = [];

    for (var i in roles) {
      var response = await this.#client.rest.request(
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
      success,
    };
  }

  /**
   * Removes roles from a member.
   * @param removeObject - An object containing roles to remove and a reason.
   * @returns An object containing errors and success responses.
   */
  async remove(removeObject: RoleOptions): Promise<{
    error: ErrorResponseFromApi[];
    success: ResponseFromApi[];
  } | null> {
    var roles = removeObject.roles;

    var reason = removeObject.reason;

    var errors: ErrorResponseFromApi[] = [];
    var success: ResponseFromApi[] = [];

    for (var i in roles) {
      var response = await this.#client.rest.request(
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

  /**
   * Fetches roles of a member.
   * @param roleId - The role ID to fetch, or null to fetch all roles.
   * @returns A collection of guild roles or null if not found.
   */
  async fetch(
    roleId: string | null | undefined = null
  ): Promise<Collection<string, GuildRole> | null> {
    if (!this.guild.roles) return null;
    var response = await this.guild.roles.fetch(roleId);

    if (!response) return null;
    var check = response as ErrorResponseFromApi;
    if (!check.error) {
      if (response instanceof Collection) {
        var i: any = response
          .toJSON()
          .filter((i: any) => this.member?.role_ids?.includes(i.id));

        for (var x of i) {
          this.cache.set(x.id, x);
        }

        response = this.cache;
      }
    }

    return response as Collection<string, GuildRole>;
  }
}

/**
 * Manages the roles in a guild.
 */
export class GuildRolesManager {
  #client: Client;
  public guild: Guild;
  public cache: Collection<string, GuildRole>;

  /**
   * Constructs a new GuildRolesManager.
   * @param guild - The guild whose roles are being managed.
   * @param client - The client instance.
   */
  constructor(guild: Guild, client: Client) {
    this.#client = client;
    this.guild = guild;
    this.cache = new Collection();
  }

  /**
   * Fetches roles from the guild.
   * @param roleId - The role ID to fetch, or null to fetch all roles.
   * @returns A collection of guild roles, a single guild role, or an error response.
   */
  async fetch(
    roleId: string | null | undefined
  ): Promise<Collection<string, GuildRole> | GuildRole | ErrorResponseFromApi> {
    const response = await this.#client.rest.request(
      "GET",
      Endpoints.GuildRoles(this.guild.id),
      true
    );

    if (!response || !response.data) return this.cache;

    var r: any;

    var _allGuildRoles = response.data;

    for (var i of _allGuildRoles as Array<any>) {
      var x = new GuildRole(i, this.guild, this.#client);
      this.cache.set(i.id, x);

      if (roleId == i.id) {
        r = x;
      }
    }
    return r;
  }

  /**
   * Edits a role in the guild.
   *
   * @param {string} id - The ID of the role to edit.
   * @param {EditRolePayload} editOptions - An object containing the properties to edit and optionally a reason for the edit.
   *
   * @returns {Nullable<ErrorResponseFromApi | GuildRole | Collection<string, GuildRole[]>>} Returns the edited role if the request was successful, otherwise returns an error.
   */
  async edit(
    id: string,
    editOptions: EditRolePayload
  ): Promise<Nullable<ErrorResponseFromApi | GuildRole>> {
    let reason = editOptions.reason;
    delete editOptions.reason;
    var response = await this.#client.rest.request(
      "PATCH",
      Endpoints.GuildRole(this.guild.id, id),
      true,
      { data: editOptions },
      reason
    );

    if (!response) return null;

    if (response.error) return response as ErrorResponseFromApi;
    else {
      if (response?.data) {
        let role = new GuildRole(
          response.data as APIRole,
          this.guild,
          this.#client
        );
        this.cache.set(role.id, role);
        return role;
      }

      return null;
    }
  }

  /**
   * Deletes roles from the guild.
   * @param deleteObject - An object containing roles to delete and a reason.
   * @returns An object containing errors and success responses or the current cache.
   */
  async delete(
    deleteObject: RoleOptions
  ): Promise<
    | { error: ErrorResponseFromApi[]; success: ResponseFromApi[] }
    | Collection<string, GuildRole>
  > {
    var roles = deleteObject.roles;

    var reason = deleteObject.reason;

    var errors: ErrorResponseFromApi[] = [];
    var success: ResponseFromApi[] = [];

    for (var i in roles) {
      var response = await this.#client.rest.request(
        "DELETE",
        Endpoints.GuildRole(this.guild.id, roles[i]),
        true,
        {},
        reason
      );

      if (!response) return this.cache;

      if (response.error) {
        errors.push(response as ErrorResponseFromApi);
      } else {
        success.push(response as ResponseFromApi);
      }
    }

    return { error: errors, success };
  }

  /**
   * Creates a new role in the guild.
   * @param createObject - An object containing the role creation data.
   * @returns The created role data or an error response.
   */
  async create(
    createObject: RESTPostAPIGuildRoleJSONBody & { reason?: string }
  ) {
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

    const response = await this.#client.rest.request(
      "POST",
      Endpoints.GuildRoles(this.guild.id),
      true,
      { data },
      reason
    );

    if (!response) return null;

    if (response.error) {
      return response;
    } else {
      if (!response.data) return null;

      this.cache.set(
        response.data.id,
        new GuildRole(response.data as APIRole, this.guild.id, this.#client)
      );

      return response.data;
    }
  }
}
