"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberPermissionManager = void 0;
const ClientError_1 = require("../../client/errors/ClientError");
const ErrorList_1 = require("../../client/errors/ErrorList");
const common_1 = require("../../common");
class MemberPermissionManager {
    member;
    guild;
    constructor(member, guild) {
        this.member = member;
        this.guild = guild;
    }
    get() {
        const rolePermissions = this.member.roles.cache
            .toJSON()
            .map((role) => role.permissions);
        const totalPermissions = rolePermissions.reduce((acc, permission) => BigInt(acc) | BigInt(permission), BigInt(0));
        return (totalPermissions & BigInt(0xffffffff)).toString();
    }
    checkPermission(permissions, forceAdmin, matchAll) {
        if (!permissions || !["string", "object"].includes(typeof permissions))
            throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.InvalidType, "string | object", "permissions");
        const adminPerm = BigInt(common_1.PermissionsBits.ADMINISTRATOR);
        const userPerms = BigInt(this.get());
        if (typeof permissions === "string") {
            permissions = [permissions];
        }
        if (typeof permissions === "object" && !Array.isArray(permissions)) {
            const conditions = Object.entries(permissions).map(([perm, required]) => {
                const permissionBit = BigInt(common_1.PermissionsBits[perm]);
                if (!permissionBit) {
                    throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.InvalidPermission, perm);
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
            const permissionBit = BigInt(common_1.PermissionsBits[permission]);
            if (!permissionBit) {
                throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.InvalidPermission, permission);
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
    has(permissions, forceAdmin = true) {
        return this.checkPermission(permissions, forceAdmin, true);
    }
    /**
     * Checks if the member has at least one of the specified permissions.
     */
    hasAny(permissions, forceAdmin = true) {
        return this.checkPermission(permissions, forceAdmin, false);
    }
}
exports.MemberPermissionManager = MemberPermissionManager;
