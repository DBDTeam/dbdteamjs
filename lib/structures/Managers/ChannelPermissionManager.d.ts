import { ChannelPermissionSuccessResponse, ObjectOfThePerms, TargetPayload } from "../../common/interfaces/general/Permissions";
import { PermissionsType } from "../../common/interfaces/general/Permissions";
import { Client } from "../../client/Client";
import { Nullable } from "../../common";
import { RESTResponse } from "../../rest/requestHandler";
export declare class ChannelPermissionManager {
    #private;
    private readonly channelId;
    /**
     * Constructs a new ChannelPermissionManager instance.
     * @param {string} channelId - The ID of the target channel.
     * @param {Client} #client - The #client instance to interact with the API.
     */
    constructor(channelId: string, client: Client);
    get channel(): import("..").Channel | import("..").TextChannel | import("..").VoiceChannel | import("..").ThreadChannel | import("..").CategoryChannel | undefined;
    /**
     * Resolves the permissions into bitwise values.
     * @param {ObjectOfThePerms} permsObj - The permissions to resolve.
     * @returns {Object} - Resolved added and removed permissions.
     */
    private resolvePermissions;
    /**
     * Edits permissions for a specific target.
     * @param {TargetPayload} target - The target payload.
     * @param {ObjectOfThePerms} perms - The permissions to apply.
     * @param {Nullable<string>} reason - The reason for the modification.
     * @returns {Promise<ChannelPermissionSuccessResponse | RESTResponse>} - API response.
     */
    edit(target: TargetPayload | "everyone", perms: ObjectOfThePerms, reason?: Nullable<string>): Promise<ChannelPermissionSuccessResponse | RESTResponse>;
    /**
     * Adds permissions for a specific target.
     * @param {TargetPayload} target - The target payload.
     * @param {PermissionsType[]} permissions - The permissions to add.
     * @param {Nullable<string>} reason - The reason for adding permissions.
     * @returns {Promise<ChannelPermissionSuccessResponse | RESTResponse>} - API response.
     */
    add(target: TargetPayload, permissions: PermissionsType[] | PermissionsType, reason?: Nullable<string>): Promise<ChannelPermissionSuccessResponse | RESTResponse>;
    /**
     * Removes permissions for a specific target.
     * @param {TargetPayload} target - The target payload.
     * @param {PermissionsType[]} permissions - The permissions to remove.
     * @param {Nullable<string>} reason - The reason for removing permissions.
     * @returns {Promise<ChannelPermissionSuccessResponse | RESTResponse>} - API response.
     */
    remove(target: TargetPayload, permissions: PermissionsType[] | PermissionsType, reason?: Nullable<string>): Promise<ChannelPermissionSuccessResponse | RESTResponse>;
    /**
     * Utility to get the allow and deny bitfields for a target in the channel.
     * @param {TargetPayload} target - The target payload to prepare.
     * @returns {{ allow: bigint, deny: bigint }} - The allow and deny bitfields for the target.
     */
    private getPermissionBitfields;
    /**
     * Checks if a target has all the specified permissions in the channel.
     * @param {TargetPayload} target - The target payload (e.g., user or role) whose permissions are being checked.
     * @param {Partial<Record<PermissionsType, boolean>>} permissions - An object where keys are permission names,
     * and values are booleans indicating whether the target should have (`true`) or not have (`false`) the permission.
     * @returns {Promise<boolean>} - Returns true if the target has all the permissions required, otherwise false.
     */
    has(target: TargetPayload, permissions: Partial<Record<PermissionsType, boolean>>): Promise<boolean>;
    /**
     * Checks if a target has at least one of the specified permissions in the channel.
     * @param {TargetPayload} target - The target payload (e.g., user or role) whose permissions are being checked.
     * @param {Partial<Record<PermissionsType, boolean>>} permissions - An object where keys are permission names,
     * and values are booleans indicating whether the target should have (`true`) or not have (`false`) the permission.
     * @returns {Promise<boolean>} - Returns true if the target has at least one of the required permissions, otherwise false.
     */
    hasAny(target: TargetPayload, permissions: Partial<Record<PermissionsType, boolean>>): Promise<boolean>;
    private determineTargetType;
    private prepareTarget;
}
