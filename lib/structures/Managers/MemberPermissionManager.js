"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberPermissionManager = void 0;
const PermissionManager_1 = require("./PermissionManager");
class MemberPermissionManager {
    member;
    guild;
    constructor(member, guild) {
        this.member = member;
        this.guild = guild;
    }
    get permissions() {
        const rolePermissions = this.member.roles.cache
            .toJSON()
            .map((role) => role.permissions);
        var totalPermissions = rolePermissions.reduce((acc, permission) => BigInt(acc) | BigInt(permission), BigInt(0));
        return (totalPermissions & BigInt(0xffffffff)).toString();
    }
    hasAnyPermission(permissions, forceAdmin = true) {
        return PermissionManager_1.PermissionManager.hasPermission(this.permissions, permissions, forceAdmin);
    }
    hasPermission(permissions, forceAdmin = true) {
        return PermissionManager_1.PermissionManager.hasPermission(this.permissions, permissions, forceAdmin);
    }
}
exports.MemberPermissionManager = MemberPermissionManager;
