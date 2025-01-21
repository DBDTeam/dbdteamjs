import { APIRole, RESTPostAPIGuildRoleJSONBody } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { Guild } from "../Guild";
import { type Member } from "../Member";
import { EditRolePayload, GuildRole } from "../Role";
import { Nullable } from "../../common";
import { Utilities } from "../../utils/utils";
import { RESTResponse } from "../../rest/requestHandler";

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
    if(!this.guild) return;
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
    error: RESTResponse[];
    success: RESTResponse[];
  } | null> {
    var roles = addObject.roles;

    var reason = addObject.reason;

    var errors: RESTResponse[] = [];
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
        errors.push(response as RESTResponse);
      } else {
        success.push(response as RESTResponse);
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
    error: RESTResponse[];
    success: RESTResponse[];
  } | null> {
    var roles = removeObject.roles;

    var reason = removeObject.reason;

    var errors: RESTResponse[] = [];
    var success: RESTResponse[] = [];

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
        errors.push(response as RESTResponse);
      } else {
        success.push(response as RESTResponse);
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
    var check = response as RESTResponse;
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
  ): Promise<Collection<string, GuildRole> | GuildRole | RESTResponse> {
    const response = await this.#client.rest.request<APIRole>(
      "GET",
      Endpoints.GuildRole(this.guild.id, roleId as string),
      true
    );

    if (!response || response.error) return response as RESTResponse;

    return new GuildRole(response.data, this.guild, this.#client);
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
  ): Promise<Nullable<RESTResponse | GuildRole>> {
    let reason = editOptions.reason;
    delete editOptions.reason;
    var response = await this.#client.rest.request<APIRole>(
      "PATCH",
      Endpoints.GuildRole(this.guild.id, id),
      true,
      editOptions,
      reason
    );

    if (!response) return null;

    if (!response.hasData()) return response as RESTResponse;
        let role = new GuildRole(
          response.data,
          this.guild,
          this.#client
        );
        this.cache.set(role.id, role);
        return role;
  }

  /**
   * Deletes roles from the guild.
   * @param deleteObject - An object containing roles to delete and a reason.
   * @returns An object containing errors and success responses or the current cache.
   */
  async delete(
    deleteObject: RoleOptions
  ): Promise<
    | { error: RESTResponse[]; success: GuildRole[] }
    | Collection<string, GuildRole>
  > {
    var roles = deleteObject.roles;

    var reason = deleteObject.reason;

    var errors: RESTResponse[] = [];
    var success: GuildRole[] = [];

    for (var i in roles) {
      var response = await this.#client.rest.request<APIRole>(
        "DELETE",
        Endpoints.GuildRole(this.guild.id, roles[i]),
        true,
        {},
        reason
      );

      if (!response) return this.cache;

      if (!response.hasData()) errors.push(response as RESTResponse);
        const role = new GuildRole(response.data, this.guild, this.#client)
        success.push(role);
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

    var data = Utilities.setObj(base, createObject, {
      unicode_emoji: "unicodeEmoji",
    });

    var reason = data.reason;

    delete data.reason;

    var response = await this.#client.rest.request<APIRole>(
      "POST",
      Endpoints.GuildRoles(this.guild.id),
      true,
      data,
      reason
    );

    if (!response || !response.hasData()) return response;
    const role = new GuildRole(
      response.data,
      this.guild.id,
      this.#client
    );
    this.cache.set(response.data.id, role);

    return role;
  }
}
