import { APIRole, RESTPostAPIGuildRoleJSONBody } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
import { Guild } from "../Guild";
import { type Member } from "../Member";
import { EditRolePayload, GuildRole } from "../Role";
import { Nullable } from "../../common";
import { RESTResponse } from "../../rest/requestHandler";
type RoleOptions = {
    roles: string[];
    reason?: string | undefined | null;
};
/**
 * Manages the roles of a member in a guild.
 */
export declare class MemberRolesManager {
    #private;
    readonly guild: Guild;
    readonly member: Member;
    cache: Collection<string, GuildRole>;
    /**
     * Constructs a new MemberRolesManager.
     * @param guild - The guild the member belongs to.
     * @param member - The member whose roles are being managed.
     * @param client - The client instance.
     */
    constructor(guild: Guild, member: Member, client: Client);
    /**
     * Adds roles to a member.
     * @param addObject - An object containing roles to add and a reason.
     * @returns An object containing errors and success responses.
     */
    add(addObject: RoleOptions): Promise<{
        error: RESTResponse[];
        success: RESTResponse[];
    } | null>;
    /**
     * Removes roles from a member.
     * @param removeObject - An object containing roles to remove and a reason.
     * @returns An object containing errors and success responses.
     */
    remove(removeObject: RoleOptions): Promise<{
        error: RESTResponse[];
        success: RESTResponse[];
    } | null>;
    /**
     * Fetches roles of a member.
     * @param roleId - The role ID to fetch, or null to fetch all roles.
     * @returns A collection of guild roles or null if not found.
     */
    fetch(roleId?: string | null | undefined): Promise<Collection<string, GuildRole> | null>;
}
/**
 * Manages the roles in a guild.
 */
export declare class GuildRolesManager {
    #private;
    guild: Guild;
    cache: Collection<string, GuildRole>;
    /**
     * Constructs a new GuildRolesManager.
     * @param guild - The guild whose roles are being managed.
     * @param client - The client instance.
     */
    constructor(guild: Guild, client: Client);
    /**
     * Fetches roles from the guild.
     * @param roleId - The role ID to fetch, or null to fetch all roles.
     * @returns A collection of guild roles, a single guild role, or an error response.
     */
    fetch(roleId: string | null | undefined): Promise<Collection<string, GuildRole> | GuildRole | RESTResponse>;
    /**
     * Edits a role in the guild.
     *
     * @param {string} id - The ID of the role to edit.
     * @param {EditRolePayload} editOptions - An object containing the properties to edit and optionally a reason for the edit.
     *
     * @returns {Nullable<ErrorResponseFromApi | GuildRole | Collection<string, GuildRole[]>>} Returns the edited role if the request was successful, otherwise returns an error.
     */
    edit(id: string, editOptions: EditRolePayload): Promise<Nullable<RESTResponse | GuildRole>>;
    /**
     * Deletes roles from the guild.
     * @param deleteObject - An object containing roles to delete and a reason.
     * @returns An object containing errors and success responses or the current cache.
     */
    delete(deleteObject: RoleOptions): Promise<{
        error: RESTResponse[];
        success: GuildRole[];
    } | Collection<string, GuildRole>>;
    /**
     * Creates a new role in the guild.
     * @param createObject - An object containing the role creation data.
     * @returns The created role data or an error response.
     */
    create(createObject: RESTPostAPIGuildRoleJSONBody & {
        reason?: string;
    }): Promise<GuildRole | ((Record<string, any> | APIRole) & {
        error?: boolean;
    }) | null>;
}
export {};
