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
class ChannelPermissionManager {
    Perms;
    client;
    target;
    overwrites;
    constructor(overwrites, target, client) {
        this.client = client;
        this.target = target;
        this.Perms = PermissionsBitFields_1.PermissionsBitField.Channels;
        this.overwrites = overwrites;
    }
    async edit(userObj, permsObj, reason = null) {
        let addedPerms = 0;
        let removedPerms = 0;
        const obj = getType(userObj == "everyone" ? this.target.guildId : userObj, this.target);
        for (const allowPerm of permsObj.allow) {
            if (this.Perms.hasOwnProperty(allowPerm) && !(permsObj.deny.includes(allowPerm))) {
                addedPerms |= this.Perms[allowPerm];
            }
        }
        for (const denyPerm of permsObj.deny) {
            if (this.Perms.hasOwnProperty(denyPerm) && !(permsObj.allow.includes(denyPerm))) {
                removedPerms |= this.Perms[denyPerm];
            }
        }
        const data = {
            allow: addedPerms,
            deny: removedPerms,
            id: obj.targetId,
            type: obj.type
        };
        var response = await this.client.rest.request("PUT", Endpoints.ChannelPermissions(obj.id, obj.targetId), true, { data }, reason);
        return { ...response, allow: addedPerms, deny: removedPerms };
    }
    async add(userObj, permsObj, reason = null) {
        let addedPerms = 0;
        const obj = getType(userObj == "everyone" ? this.target.guildId : userObj, this.target);
        for (const allowPerm of permsObj.allow) {
            if (this.Perms.hasOwnProperty(allowPerm) && !(permsObj.deny.includes(allowPerm))) {
                addedPerms |= this.Perms[allowPerm];
            }
        }
        const response = await this.edit(obj, { allow: addedPerms }, reason);
        return { ...response, allow: addedPerms };
    }
    async remove(userObj, permsObj, reason = null) {
        let removedPerms = 0;
        const obj = getType(userObj == "everyone" ? this.target.guildId : userObj, this.target);
        for (const denyPerm of permsObj.deny) {
            if (this.Perms.hasOwnProperty(denyPerm) && !(permsObj.allow.includes(denyPerm))) {
                removedPerms |= this.Perms[denyPerm];
            }
        }
        const response = await this.edit(obj, { deny: removedPerms }, reason);
        return { ...response, deny: removedPerms };
    }
}
exports.ChannelPermissionManager = ChannelPermissionManager;
function getType(obj, channel) {
    var isUser = obj instanceof User_1.User || obj instanceof Member_1.Member;
    return isUser ? {
        type: 1,
        id: channel.id,
        targetId: obj.id || obj.user.id
    } : {
        type: 0,
        id: channel.id,
        targetId: obj.id
    };
}
