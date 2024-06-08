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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelPermissionManager = void 0;
const User_1 = require("../User");
const PermissionsBitFields_1 = require("../../types/PermissionsBitFields");
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Member_1 = require("../Member");
const ThreadMember_1 = require("../ThreadMember");
class ChannelPermissionManager {
    #Perms;
    #client;
    target;
    overwrites;
    constructor(overwrites, target, client) {
        this.#client = client;
        this.target = target;
        this.#Perms = PermissionsBitFields_1.PermissionsBitField.Channels;
        this.overwrites = overwrites;
    }
    #resolve(permsObj) {
        var addedPerms = 0, addedPermsArr = [];
        var removedPerms = 0, removedPermsArr = [];
        for (const allowPerm of (permsObj?.allow || [])) {
            if (this.#Perms.hasOwnProperty(allowPerm) &&
                !permsObj?.deny?.includes(allowPerm)) {
                addedPerms |= this.#Perms[allowPerm];
                addedPermsArr.push(this.#Perms[allowPerm]);
            }
        }
        for (const denyPerm of (permsObj.deny || [])) {
            if (this.#Perms.hasOwnProperty(denyPerm) &&
                !permsObj?.allow?.includes(denyPerm)) {
                removedPerms |= this.#Perms[denyPerm];
                removedPermsArr.push(this.#Perms[denyPerm]);
            }
        }
        return { removedPerms, addedPerms, removedPermsArr, addedPermsArr };
    }
    /**
     *
     * @param targetObj
     * @param permsObj
     * @param reason
     * @returns
     */
    async edit(targetObj, permsObj, reason = null) {
        let addedPerms = 0;
        let removedPerms = 0;
        const obj = getType(targetObj == "everyone" ? this.target.guildId : targetObj, this.target);
        if (!permsObj)
            return null;
        const result = this.#resolve(permsObj);
        const data = {
            allow: result?.addedPerms,
            deny: result?.removedPerms,
            id: obj.targetId,
            type: obj.type,
        };
        var response = await this.#client.rest.request("PUT", Endpoints.ChannelPermissions(obj.id, obj.targetId), true, { data }, reason);
        if (response?.error) {
            return response;
        }
        else {
            return { ...response, allow: addedPerms, deny: removedPerms };
        }
    }
    async add(targetObj, permsObj, reason = null) {
        const obj = getType(targetObj == "everyone" ? this.target.guildId : targetObj, this.target);
        const result = this.#resolve(permsObj);
        const response = await this.edit(obj, { allow: result?.addedPermsArr }, reason);
        return { ...response, allow: result?.addedPerms };
    }
    async remove(targetObj, permsObj, reason = null) {
        const obj = getType(targetObj == "everyone" ? this.target.guildId : targetObj, this.target);
        const result = this.#resolve(permsObj);
        const response = await this.edit(obj, { deny: result?.removedPermsArr }, reason);
        return { ...response, deny: result?.removedPerms };
    }
}
exports.ChannelPermissionManager = ChannelPermissionManager;
function getType(obj, channel) {
    var isUser = obj instanceof User_1.User || obj instanceof Member_1.Member || obj instanceof ThreadMember_1.ThreadMember;
    return isUser
        ? {
            type: 1,
            id: channel.id,
            targetId: obj.id || obj.user.id,
        }
        : {
            type: 0,
            id: channel.id,
            targetId: obj.id,
        };
}
