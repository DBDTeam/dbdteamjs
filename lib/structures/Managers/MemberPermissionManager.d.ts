import { PermissionsType } from "../../interfaces";
import { Guild } from "../Guild";
import { Member } from "../Member";
export declare class MemberPermissionManager {
    member: Member;
    private guild;
    constructor(member: Member, guild: Guild);
    get permissions(): string;
    hasAnyPermission(permissions: PermissionsType | PermissionsType, forceAdmin?: boolean): boolean;
    hasPermission(permissions: PermissionsType[] | PermissionsType, forceAdmin?: boolean): boolean;
}
