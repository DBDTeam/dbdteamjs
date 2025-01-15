import { ClientError } from "../../client/errors/ClientError";
import { ErrorNames } from "../../client/errors/ErrorList";
import { Nullable } from "../../common";
import { PermissionsBits, PermissionsType } from "../../common/interfaces";
import { GuildChannel } from "../GuildChannel";

export class PermissionManager {
  static getPermissions(permissions: string): string {
    let totalPermissions = BigInt(0);

    totalPermissions = totalPermissions | BigInt(permissions);

    return (totalPermissions & BigInt(0xffffffff)).toString();
  }

  static getChannelPermissions(
    channel: Nullable<GuildChannel>,
    memberId: string
  ): bigint {
    let channelPermissions = BigInt(0);

    if (!channel || !channel.permission_overwrites) return BigInt(0);

    for (const overwrite of channel.permission_overwrites) {
      if (overwrite.type === 0) {
        channelPermissions = channelPermissions | BigInt(overwrite.allow);
        channelPermissions = channelPermissions & BigInt(~overwrite.deny);
      } else if (overwrite.type === 1 && overwrite.id === memberId) {
        channelPermissions = channelPermissions | BigInt(overwrite.allow);
        channelPermissions = channelPermissions & BigInt(~overwrite.deny);
      }
    }

    return channelPermissions;
  }

  static hasPermission(
    permissions: string,
    requiredPermissions: PermissionsType | PermissionsType[],
    forceAdmin: boolean = true
  ): boolean {
    const adminPerm = BigInt(PermissionsBits.ADMINISTRATOR);
    const userPerms = BigInt(permissions);

    const permissionList = Array.isArray(requiredPermissions)
      ? requiredPermissions
      : [requiredPermissions];

    for (const permission of permissionList) {
      const permissionBit = BigInt(PermissionsBits[permission]);
      if (!permissionBit) {
        throw new ClientError(ErrorNames.InvalidPermission, permission);
      }

      let condition = (userPerms & permissionBit) === permissionBit;

      if (forceAdmin && !condition) {
        condition = (adminPerm & userPerms) === adminPerm;
      }

      if (!condition) return false;
    }

    return true;
  }

  static hasAnyPermission(
    permissions: string,
    requiredPermissions: PermissionsType | PermissionsType[],
    forceAdmin: boolean = true
  ): boolean {
    const adminPerm = BigInt(PermissionsBits.ADMINISTRATOR);
    const userPerms = BigInt(permissions);

    const permissionList = Array.isArray(requiredPermissions)
      ? requiredPermissions
      : [requiredPermissions];

    for (const permission of permissionList) {
      const permissionBit = BigInt(PermissionsBits[permission]);
      if (!permissionBit) {
        throw new ClientError(ErrorNames.InvalidPermission, permission);
      }

      let condition = (userPerms & permissionBit) === permissionBit;

      if (forceAdmin && !condition) {
        condition = (adminPerm & userPerms) === adminPerm;
      }

      if (condition) return true;
    }

    return false;
  }

  static isValidPermission(
    permissions: PermissionsType | PermissionsType[]
  ): boolean {
    const permissionList = Array.isArray(permissions)
      ? permissions
      : [permissions];

    for (const permission of permissionList) {
      if (!(permission in PermissionsBits)) {
        return false;
      }
    }

    return true;
  }
}
