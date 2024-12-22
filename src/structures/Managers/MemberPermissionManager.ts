import { Client } from "../../client";
import { Nullable } from "../../common";
import {
  PermissionRoleNames,
  PermissionsChannelName,
} from "../../interfaces/channel/Permissions";
import { PermissionsBitField } from "../../types";
import { Channel } from "../BaseChannel";
import { Guild } from "../Guild";
import { Member } from "../Member";

export class MemberPermissionManager {
  member: Member;
  guild: Guild;
  channel: Nullable<Channel>;

  constructor(
    private client: Client,
    member: Member,
    guild: Guild,
    channel?: Nullable<Channel>
  ) {
    this.member = member;
    this.guild = guild;
    this.channel = channel;
  }

  getPermissions(): string {
    let totalPermissions = BigInt(0);

    for (const role of this.member.roles.cache.toJSON()) {
      totalPermissions = totalPermissions | BigInt(role.permissions);
    }

    if (
      this.channel &&
      "permission_overwrites" in this.channel &&
      this.channel.permission_overwrites
    ) {
      totalPermissions =
        totalPermissions | this.getChannelPermissions(this.channel);
    }

    return (totalPermissions & BigInt(0xffffffff)).toString();
  }

  getChannelPermissions(channel: Channel): bigint {
    let channelPermissions = BigInt(0);

    if (!channel.permission_overwrites) return BigInt(0);

    for (const overwrite of channel.permission_overwrites) {
      if (overwrite.type === 0) {
        channelPermissions = channelPermissions | BigInt(overwrite.allow);
        channelPermissions = channelPermissions & BigInt(~overwrite.deny);
      } else if (overwrite.type === 1 && overwrite.id === this.member.id) {
        channelPermissions = channelPermissions | BigInt(overwrite.allow);
        channelPermissions = channelPermissions & BigInt(~overwrite.deny);
      }
    }

    return channelPermissions;
  }
  hasPermission(
    permission: PermissionRoleNames | PermissionsChannelName,
    forceAdmin: boolean = true
  ): boolean {
    const permissionBit = BigInt(
      //@ts-ignore
      PermissionsBitField.Roles[permission] || // @ts-ignore
        PermissionsBitField.Channels[permission]
    );
    if (!permissionBit) {
      throw new Error(`Permission "${permission}" don't exists.`);
    }

    const adminPerm = BigInt(PermissionsBitField.Roles.Administrator);
    const UserPerms = BigInt(this.getPermissions());

    var condition =
      (UserPerms & permissionBit) === permissionBit;

    if(forceAdmin && !condition) {
      condition = (adminPerm & UserPerms) === adminPerm;
    }

    return condition;
  }
}
