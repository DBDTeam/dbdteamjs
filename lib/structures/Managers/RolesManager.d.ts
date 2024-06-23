import { type Client } from "../../client/Client";
import { GuildMemberRoleOptions, GuildRoleCreatePayload } from "../../interfaces/member/role";
import { ErrorResponseFromApi, ResponseFromApi } from "../../interfaces/rest/requestHandler";
import { Collection } from "../../utils/Collection";
import { Guild } from "../Guild";
import { type Member } from "../Member";
import { GuildRole } from "../Role";
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
    add(addObject: GuildMemberRoleOptions): Promise<{
        error: ErrorResponseFromApi[];
        success: ResponseFromApi[];
    } | null>;
    /**
     * Removes roles from a member.
     * @param removeObject - An object containing roles to remove and a reason.
     * @returns An object containing errors and success responses.
     */
    remove(removeObject: GuildMemberRoleOptions): Promise<{
        error: ErrorResponseFromApi[];
        success: ResponseFromApi[];
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
    fetch(roleId: string | null | undefined): Promise<Collection<string, GuildRole> | GuildRole | ErrorResponseFromApi>;
    /**
     * Deletes roles from the guild.
     * @param deleteObject - An object containing roles to delete and a reason.
     * @returns An object containing errors and success responses or the current cache.
     */
    delete(deleteObject: GuildMemberRoleOptions): Promise<{
        error: ErrorResponseFromApi[];
        success: ResponseFromApi[];
    } | Collection<string, GuildRole>>;
    /**
     * Creates a new role in the guild.
     * @param createObject - An object containing the role creation data.
     * @returns The created role data or an error response.
     */
    create(createObject: GuildRoleCreatePayload): Promise<Record<any, any> | ResponseFromApi | null>;
}
