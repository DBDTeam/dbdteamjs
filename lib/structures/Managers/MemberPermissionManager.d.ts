import { PermissionsType } from "../../common";
import { type Guild } from "../Guild";
import { type Member } from "../Member";
export declare class MemberPermissionManager {
    member: Member;
    private guild;
    constructor(member: Member, guild: Guild);
    get(): string;
    private checkPermission;
    /**
     * Checks if the member has all of the specified permissions.
     */
    has(permissions: PermissionsType | PermissionsType[] | Partial<Record<PermissionsType, boolean>>, forceAdmin?: boolean): boolean;
    /**
     * Checks if the member has at least one of the specified permissions.
     */
    hasAny(permissions: PermissionsType | PermissionsType[] | Partial<Record<PermissionsType, boolean>>, forceAdmin?: boolean): boolean;
}
