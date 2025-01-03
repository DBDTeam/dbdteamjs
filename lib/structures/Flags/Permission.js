"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionManager = void 0;
const ClientError_1 = require("../../client/errors/ClientError");
const ErrorList_1 = require("../../client/errors/ErrorList");
const interfaces_1 = require("../../common/interfaces");
class PermissionManager {
    static getPermissions(permissions) {
        let totalPermissions = BigInt(0);
        totalPermissions = totalPermissions | BigInt(permissions);
        return (totalPermissions & BigInt(0xffffffff)).toString();
    }
    static getChannelPermissions(channel, memberId) {
        let channelPermissions = BigInt(0);
        if (!channel || !channel.permission_overwrites)
            return BigInt(0);
        for (const overwrite of channel.permission_overwrites) {
            if (overwrite.type === 0) {
                channelPermissions = channelPermissions | BigInt(overwrite.allow);
                channelPermissions = channelPermissions & BigInt(~overwrite.deny);
            }
            else if (overwrite.type === 1 && overwrite.id === memberId) {
                channelPermissions = channelPermissions | BigInt(overwrite.allow);
                channelPermissions = channelPermissions & BigInt(~overwrite.deny);
            }
        }
        return channelPermissions;
    }
    static hasPermission(permissions, requiredPermissions, forceAdmin = true) {
        const adminPerm = BigInt(interfaces_1.PermissionsBits.ADMINISTRATOR);
        const userPerms = BigInt(permissions);
        const permissionList = Array.isArray(requiredPermissions)
            ? requiredPermissions
            : [requiredPermissions];
        for (const permission of permissionList) {
            const permissionBit = BigInt(interfaces_1.PermissionsBits[permission]);
            if (!permissionBit) {
                throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.InvalidPermission, permission);
            }
            let condition = (userPerms & permissionBit) === permissionBit;
            if (forceAdmin && !condition) {
                condition = (adminPerm & userPerms) === adminPerm;
            }
            if (!condition)
                return false;
        }
        return true;
    }
    static hasAnyPermission(permissions, requiredPermissions, forceAdmin = true) {
        const adminPerm = BigInt(interfaces_1.PermissionsBits.ADMINISTRATOR);
        const userPerms = BigInt(permissions);
        const permissionList = Array.isArray(requiredPermissions)
            ? requiredPermissions
            : [requiredPermissions];
        for (const permission of permissionList) {
            const permissionBit = BigInt(interfaces_1.PermissionsBits[permission]);
            if (!permissionBit) {
                throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.InvalidPermission, permission);
            }
            let condition = (userPerms & permissionBit) === permissionBit;
            if (forceAdmin && !condition) {
                condition = (adminPerm & userPerms) === adminPerm;
            }
            if (condition)
                return true;
        }
        return false;
    }
    static isValidPermission(permissions) {
        const permissionList = Array.isArray(permissions)
            ? permissions
            : [permissions];
        for (const permission of permissionList) {
            if (!(permission in interfaces_1.PermissionsBits)) {
                return false;
            }
        }
        return true;
    }
}
exports.PermissionManager = PermissionManager;
