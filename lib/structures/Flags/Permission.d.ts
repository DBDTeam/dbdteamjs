import { Nullable } from "../../common";
import { PermissionsType } from "../../common/interfaces";
import { GuildChannel } from "../GuildChannel";
export declare class PermissionManager {
    static getPermissions(permissions: string): string;
    static getChannelPermissions(channel: Nullable<GuildChannel>, memberId: string): bigint;
    static hasPermission(permissions: string, requiredPermissions: PermissionsType | PermissionsType[], forceAdmin?: boolean): boolean;
    static hasAnyPermission(permissions: string, requiredPermissions: PermissionsType | PermissionsType[], forceAdmin?: boolean): boolean;
    static isValidPermission(permissions: PermissionsType | PermissionsType[]): boolean;
}
