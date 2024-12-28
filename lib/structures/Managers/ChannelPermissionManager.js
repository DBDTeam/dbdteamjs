"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelPermissionManager = void 0;
const Permissions_1 = require("../../interfaces/channel/Permissions");
const Endpoints = __importStar(require("../../rest/Endpoints"));
const PermissionManager_1 = require("./PermissionManager");
const ClientError_1 = require("../../client/errors/ClientError");
const ErrorList_1 = require("../../client/errors/ErrorList");
class ChannelPermissionManager {
    #permissionsBits = Permissions_1.PermissionsBits;
    #client;
    channelId;
    /**
     * Constructs a new ChannelPermissionManager instance.
     * @param {string} channelId - The ID of the target channel.
     * @param {Client} #client - The #client instance to interact with the API.
     */
    constructor(channelId, client) {
        this.channelId = channelId;
        this.#client = client;
    }
    get channel() {
        return this.#client.channels.cache.get(this.channelId);
    }
    /**
     * Resolves the permissions into bitwise values.
     * @param {ObjectOfThePerms} permsObj - The permissions to resolve.
     * @returns {Object} - Resolved added and removed permissions.
     */
    resolvePermissions(permsObj) {
        let allow = BigInt(0);
        let deny = BigInt(0);
        if (permsObj.allow) {
            const allowArray = Array.isArray(permsObj.allow)
                ? permsObj.allow
                : [permsObj.allow];
            for (const perm of allowArray) {
                if (!PermissionManager_1.PermissionManager.isValidPermission(perm))
                    throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.InvalidPermission, perm);
                allow |= this.#permissionsBits[perm];
            }
        }
        if (permsObj.deny) {
            const denyArray = Array.isArray(permsObj.deny)
                ? permsObj.deny
                : [permsObj.deny];
            for (const perm of denyArray) {
                if (!PermissionManager_1.PermissionManager.isValidPermission(perm))
                    throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.InvalidPermission, perm);
                deny |= this.#permissionsBits[perm];
            }
        }
        return { allow: allow.toString(), deny: deny.toString() };
    }
    /**
     * Edits permissions for a specific target.
     * @param {TargetPayload} target - The target payload.
     * @param {ObjectOfThePerms} perms - The permissions to apply.
     * @param {Nullable<string>} reason - The reason for the modification.
     * @returns {Promise<ChannelPermissionSuccessResponse | ResponseFromApi>} - API response.
     */
    async edit(target, perms, reason = null) {
        const preparedTarget = this.prepareTarget(target);
        const resolvedPerms = this.resolvePermissions(perms);
        const data = {
            id: this.channel?.id,
            targetId: preparedTarget.targetId,
            type: preparedTarget.type,
            allow: resolvedPerms.allow || [],
            deny: resolvedPerms.deny || [],
        };
        const response = await this.#client.rest.request("PUT", Endpoints.ChannelPermissions(this.channelId, data.targetId), true, { data }, reason);
        return response;
    }
    /**
     * Adds permissions for a specific target.
     * @param {TargetPayload} target - The target payload.
     * @param {PermissionsType[]} permissions - The permissions to add.
     * @param {Nullable<string>} reason - The reason for adding permissions.
     * @returns {Promise<ChannelPermissionSuccessResponse | ResponseFromApi>} - API response.
     */
    async add(target, permissions, reason = null) {
        const perms = { allow: permissions };
        return this.edit(target, perms, reason);
    }
    /**
     * Removes permissions for a specific target.
     * @param {TargetPayload} target - The target payload.
     * @param {PermissionsType[]} permissions - The permissions to remove.
     * @param {Nullable<string>} reason - The reason for removing permissions.
     * @returns {Promise<ChannelPermissionSuccessResponse | ResponseFromApi>} - API response.
     */
    async remove(target, permissions, reason = null) {
        const perms = { deny: permissions };
        return this.edit(target, perms, reason);
    }
    determineTargetType(target) {
        const isUser = target?.constructor?.type === "User" ||
            target?.constructor?.type === "Member" ||
            target?.constructor?.type === "ThreadMember";
        return isUser ? "1" : "0";
    }
    prepareTarget(target) {
        let targetId;
        let targetType;
        if (target === "everyone") {
            targetId = this.channel?.guildId;
            targetType = "0";
        }
        else {
            targetId = target.target?.id;
            targetType = target.type ?? this.determineTargetType(target.target);
        }
        return {
            targetId,
            type: targetType,
        };
    }
}
exports.ChannelPermissionManager = ChannelPermissionManager;
