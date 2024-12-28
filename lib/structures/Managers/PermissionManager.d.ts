import { Nullable } from "../../common";
import { PermissionsType } from "../../interfaces";
import { type Channel } from "../BaseChannel";
export declare class PermissionManager {
    static getPermissions(permissions: string): string;
    static getChannelPermissions(channel: Nullable<Channel>, memberId: string): bigint;
    static hasPermission(permissions: string, requiredPermissions: PermissionsType | PermissionsType[], forceAdmin?: boolean): boolean;
    static hasAnyPermission(permissions: string, requiredPermissions: PermissionsType | PermissionsType[], forceAdmin?: boolean): boolean;
    static isValidPermission(permissions: PermissionsType | PermissionsType[]): boolean;
}
