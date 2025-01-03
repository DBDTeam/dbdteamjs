import { ClientError } from "../../client/errors/ClientError";
import { ErrorNames } from "../../client/errors/ErrorList";
import { PermissionsBits, PermissionsType } from "../../common";
import { type Guild } from "../Guild";
import { type Member } from "../Member";

export class MemberPermissionManager {
  member: Member;
  private guild: Guild;

  constructor(member: Member, guild: Guild) {
    this.member = member;
    this.guild = guild;
  }

  get permissions(): string {
    const rolePermissions = this.member.roles.cache
      .toJSON()
      .map((role: any) => role.permissions);

    const totalPermissions = rolePermissions.reduce(
      (acc: any, permission: PermissionsType) =>
        BigInt(acc) | BigInt(permission),
      BigInt(0)
    );

    return (totalPermissions & BigInt(0xffffffff)).toString();
  }

  private checkPermission(
    permissions:
      | PermissionsType
      | PermissionsType[]
      | Partial<Record<PermissionsType, boolean>>,
    forceAdmin: boolean,
    matchAll: boolean
  ): boolean {
    const adminPerm = BigInt(PermissionsBits.ADMINISTRATOR);
    const userPerms = BigInt(this.permissions);

    if (typeof permissions === "string") {
      permissions = [permissions];
    }

    if (typeof permissions === "object" && !Array.isArray(permissions)) {
      const conditions = Object.entries(permissions).map(([perm, required]) => {
        const permissionBit = BigInt(PermissionsBits[perm as PermissionsType]);
        if (!permissionBit) {
          throw new ClientError(ErrorNames.InvalidPermission, perm);
        }

        let hasPerm = (userPerms & permissionBit) === permissionBit;

        if (forceAdmin && !hasPerm) {
          hasPerm = (adminPerm & userPerms) === adminPerm;
        }

        return required ? hasPerm : !hasPerm;
      });

      return matchAll ? conditions.every(Boolean) : conditions.some(Boolean);
    }

    const permissionList = Array.isArray(permissions) ? permissions : [permissions];

    const results = permissionList.map((permission) => {
      const permissionBit = BigInt(PermissionsBits[permission]);
      if (!permissionBit) {
        throw new ClientError(ErrorNames.InvalidPermission, permission);
      }

      let hasPerm = (userPerms & permissionBit) === permissionBit;

      if (forceAdmin && !hasPerm) {
        hasPerm = (adminPerm & userPerms) === adminPerm;
      }

      return hasPerm;
    });

    return matchAll ? results.every(Boolean) : results.some(Boolean);
  }

  /**
   * Checks if the member has all of the specified permissions.
   */
  has(
    permissions:
      | PermissionsType
      | PermissionsType[]
      | Partial<Record<PermissionsType, boolean>>,
    forceAdmin: boolean = true
  ): boolean {
    return this.checkPermission(permissions, forceAdmin, true);
  }

  /**
   * Checks if the member has at least one of the specified permissions.
   */
  hasAny(
    permissions:
      | PermissionsType
      | PermissionsType[]
      | Partial<Record<PermissionsType, boolean>>,
    forceAdmin: boolean = true
  ): boolean {
    return this.checkPermission(permissions, forceAdmin, false);
  }
}
