import { PermissionsType } from "../../interfaces";
import { Guild } from "../Guild";
import { Member } from "../Member";
import { PermissionManager } from "./PermissionManager";

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
      .map((role) => role.permissions);

    var totalPermissions = rolePermissions.reduce(
      (acc, permission) => BigInt(acc) | BigInt(permission),
      BigInt(0)
    );

    return (totalPermissions & BigInt(0xffffffff)).toString();
  }

  hasAnyPermission(
    permissions: PermissionsType | PermissionsType,
    forceAdmin: boolean = true
  ) {
    return PermissionManager.hasPermission(
      this.permissions,
      permissions,
      forceAdmin
    );
  }

  hasPermission(
    permissions: PermissionsType[] | PermissionsType,
    forceAdmin: boolean = true
  ): boolean {
    return PermissionManager.hasPermission(
      this.permissions,
      permissions,
      forceAdmin
    );
  }
}
