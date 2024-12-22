"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberPermissionManager = void 0;
const types_1 = require("../../types");
class MemberPermissionManager {
    client;
    member;
    guild;
    channel;
    constructor(client, member, guild, channel) {
        this.client = client;
        this.member = member;
        this.guild = guild;
        this.channel = channel;
    }
    getPermissions() {
        let totalPermissions = BigInt(0);
        for (const role of this.member.roles.cache.toJSON()) {
            totalPermissions = totalPermissions | BigInt(role.permissions);
        }
        if (this.channel &&
            "permission_overwrites" in this.channel &&
            this.channel.permission_overwrites) {
            totalPermissions =
                totalPermissions | this.getChannelPermissions(this.channel);
        }
        return (totalPermissions & BigInt(0xffffffff)).toString();
    }
    getChannelPermissions(channel) {
        let channelPermissions = BigInt(0);
        if (!channel.permission_overwrites)
            return BigInt(0);
        for (const overwrite of channel.permission_overwrites) {
            if (overwrite.type === 0) {
                channelPermissions = channelPermissions | BigInt(overwrite.allow);
                channelPermissions = channelPermissions & BigInt(~overwrite.deny);
            }
            else if (overwrite.type === 1 && overwrite.id === this.member.id) {
                channelPermissions = channelPermissions | BigInt(overwrite.allow);
                channelPermissions = channelPermissions & BigInt(~overwrite.deny);
            }
        }
        return channelPermissions;
    }
    hasPermission(permission, forceAdmin = true) {
        const permissionBit = BigInt(
        //@ts-ignore
        types_1.PermissionsBitField.Roles[permission] || // @ts-ignore
            types_1.PermissionsBitField.Channels[permission]);
        if (!permissionBit) {
            throw new Error(`Permission "${permission}" don't exists.`);
        }
        const adminPerm = BigInt(types_1.PermissionsBitField.Roles.Administrator);
        const UserPerms = BigInt(this.getPermissions());
        var condition = (UserPerms & permissionBit) === permissionBit;
        if (forceAdmin && !condition) {
            condition = (adminPerm & UserPerms) === adminPerm;
        }
        return condition;
    }
}
exports.MemberPermissionManager = MemberPermissionManager;
