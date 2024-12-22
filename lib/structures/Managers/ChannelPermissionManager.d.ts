import { type Client } from "../../client/Client";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";
import { Nullable } from "../../common";
import { ChannelPermissionSuccessResponse, ObjectOfThePerms, TargetPayload } from "../../interfaces/channel/Permissions";
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
     * @param {TargetPayload | "everyone"} TargetPayload - The target object or "everyone".
     * @param {ObjectOfThePerms} permsObj - The permissions object.
     * @param {Nullable<string>} reason - The reason for the permission change.
     * @returns {Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>} - The response from the API.
     */
    edit(TargetPayload: TargetPayload | "everyone", permsObj: ObjectOfThePerms, reason?: Nullable<string>): Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>;
    /**
     * Adds permissions to a target object.
     * @param {TargetPayload | "everyone"} TargetPayload - The target object or "everyone".
     * @param {ObjectOfThePerms} permsObj - The permissions object.
     * @param {Nullable<string>} reason - The reason for adding the permissions.
     * @returns {Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>} - The response from the API.
     */
    add(TargetPayload: TargetPayload | "everyone", permsObj: ObjectOfThePerms, reason?: Nullable<string>): Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>;
    /**
     * Removes permissions from a target object.
     * @param {Record<string, any> | "everyone"} TargetPayload - The target object or "everyone".
     * @param {Record<string, any>} permsObj - The permissions object.
     * @param {string | null | undefined} reason - The reason for removing the permissions.
     * @returns {Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>} - The response from the API.
     */
    remove(TargetPayload: Record<string, any> | "everyone", permsObj: Record<string, any>, reason?: string | null | undefined): Promise<ErrorResponseFromApi | ChannelPermissionSuccessResponse | null>;
}
