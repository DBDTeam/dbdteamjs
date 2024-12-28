import { ChannelPermissionSuccessResponse, ObjectOfThePerms, TargetPayload } from "../../interfaces/channel/Permissions";
import { PermissionsType } from "../../interfaces/channel/Permissions";
import { Client } from "../../client/Client";
import { Nullable } from "../../common";
import { ResponseFromApi } from "../../interfaces/rest/requestHandler";
export declare class ChannelPermissionManager {
    #private;
    private readonly channelId;
    /**
     * Constructs a new ChannelPermissionManager instance.
     * @param {string} channelId - The ID of the target channel.
     * @param {Client} #client - The #client instance to interact with the API.
     */
    constructor(channelId: string, client: Client);
    get channel(): import("..").Channel | import("..").VoiceChannel | import("..").TextChannel | import("..").ThreadChannel | import("..").CategoryChannel | undefined;
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
     * @returns {Promise<ChannelPermissionSuccessResponse | ResponseFromApi>} - API response.
     */
    edit(target: TargetPayload | "everyone", perms: ObjectOfThePerms, reason?: Nullable<string>): Promise<ChannelPermissionSuccessResponse | ResponseFromApi>;
    /**
     * Adds permissions for a specific target.
     * @param {TargetPayload} target - The target payload.
     * @param {PermissionsType[]} permissions - The permissions to add.
     * @param {Nullable<string>} reason - The reason for adding permissions.
     * @returns {Promise<ChannelPermissionSuccessResponse | ResponseFromApi>} - API response.
     */
    add(target: TargetPayload, permissions: PermissionsType[] | PermissionsType, reason?: Nullable<string>): Promise<ChannelPermissionSuccessResponse | ResponseFromApi>;
    /**
     * Removes permissions for a specific target.
     * @param {TargetPayload} target - The target payload.
     * @param {PermissionsType[]} permissions - The permissions to remove.
     * @param {Nullable<string>} reason - The reason for removing permissions.
     * @returns {Promise<ChannelPermissionSuccessResponse | ResponseFromApi>} - API response.
     */
    remove(target: TargetPayload, permissions: PermissionsType[] | PermissionsType, reason?: Nullable<string>): Promise<ChannelPermissionSuccessResponse | ResponseFromApi>;
    private determineTargetType;
    private prepareTarget;
}
