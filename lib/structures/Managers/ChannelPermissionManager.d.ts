import { type Client } from "../../client/Client";
import { ErrorResponseFromApi, ResponseFromApi } from "../../interfaces/rest/requestHandler";
import { Nullable } from "../../common";
interface ChannelPermissionSuccessResponse extends ResponseFromApi {
    /**
    * The allowed perms of the response. (if any)
    */
    allow?: number;
    /**
     * The disallowed perms of the response. (if any)
     */
    deny?: number;
}
interface targetObj {
    /**
     * The type of permission overwrite, 0 for GuildRoles, 1 for GuildMembers.
     */
    type?: 0 | 1;
    /**
     * The target id of the role or member.
     */
    targetId: string;
    /**
     * The Channel Id
     */
    id?: string;
}
interface ObjectOfThePerms {
    /**
     * The array of permissions bitwise to allow in the current channel.
     */
    allow?: number[];
    /**
     * The array of permissions bitwise to disable in the current channel.
     */
    deny?: number[];
}
export declare class ChannelPermissionManager {
    #private;
    private target;
    overwrites: Record<string, any>;
    /**
     * Constructs a new ChannelPermissionManager instance.
     * @param {any} overwrites - The permission overwrites for the channel.
     * @param {string} target - The target channel or guild ID.
     * @param {Client} client - The client instance to interact with the Discord API.
     */
    constructor(overwrites: any, target: string, client: Client);
    /**
     * Edits the permissions for a target object.
     * @param {targetObj | "everyone"} targetObj - The target object or "everyone".
     * @param {ObjectOfThePerms} permsObj - The permissions object.
     * @param {Nullable<string>} reason - The reason for the permission change.
     * @returns {Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>} - The response from the API.
     */
    edit(targetObj: targetObj | "everyone", permsObj: ObjectOfThePerms, reason?: Nullable<string>): Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>;
    /**
     * Adds permissions to a target object.
     * @param {targetObj | "everyone"} targetObj - The target object or "everyone".
     * @param {ObjectOfThePerms} permsObj - The permissions object.
     * @param {Nullable<string>} reason - The reason for adding the permissions.
     * @returns {Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>} - The response from the API.
     */
    add(targetObj: targetObj | "everyone", permsObj: ObjectOfThePerms, reason?: Nullable<string>): Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>;
    /**
     * Removes permissions from a target object.
     * @param {Record<string, any> | "everyone"} targetObj - The target object or "everyone".
     * @param {Record<string, any>} permsObj - The permissions object.
     * @param {string | null | undefined} reason - The reason for removing the permissions.
     * @returns {Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>} - The response from the API.
     */
    remove(targetObj: Record<string, any> | "everyone", permsObj: Record<string, any>, reason?: string | null | undefined): Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>;
}
export {};
