import { Client } from "../../client";
import { Nullable } from "../../common";
import { PermissionRoleNames, PermissionsChannelName } from "../../interfaces/channel/Permissions";
import { Channel } from "../BaseChannel";
import { Guild } from "../Guild";
import { Member } from "../Member";
export declare class MemberPermissionManager {
    private client;
    member: Member;
    guild: Guild;
    channel: Nullable<Channel>;
    constructor(client: Client, member: Member, guild: Guild, channel?: Nullable<Channel>);
    getPermissions(): string;
    getChannelPermissions(channel: Channel): bigint;
    hasPermission(permission: PermissionRoleNames | PermissionsChannelName, forceAdmin?: boolean): boolean;
}
