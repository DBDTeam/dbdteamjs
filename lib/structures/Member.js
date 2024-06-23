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
exports.Member = void 0;
const Endpoints = __importStar(require("../rest/Endpoints"));
const PermissionsBitFields_1 = require("../types/PermissionsBitFields");
const utils_1 = require("../utils/utils");
const Base_1 = require("./Base");
const RolesManager_1 = require("./Managers/RolesManager");
const MemberEditPayload_1 = require("./Payloads/MemberEditPayload");
const User_1 = require("./User");
/**
 * Represents a guild member and provides methods to manage and interact with it.
 */
class Member extends Base_1.Base {
    guild;
    #DATE;
    #PREMIUM;
    #TIMEOUTED;
    #d;
    /**
     * The date the member joined the guild.
     */
    joined;
    /**
     * The user associated with this member.
     */
    user;
    /**
     * Whether the member is muted.
     */
    muted;
    /**
     * Whether the member is deafened.
     */
    deafened;
    /**
     * The flags associated with the member.
     */
    flags;
    /**
     * The permissions of the member.
     */
    permissions;
    /**
     * The IDs of the roles assigned to the member.
     */
    role_ids;
    /**
     * The roles manager for the member.
     */
    roles;
    /**
     * The presence status of the member.
     */
    presence;
    /**
     * The nickname of the member.
     */
    nick;
    /**
     * The avatar of the member.
     */
    avatar;
    /**
     * The date the member started boosting the guild.
     */
    premiumSince;
    /**
     * Whether the member is pending.
     */
    pending;
    /**
     * The date until the member is communication disabled.
     */
    communicationDisabledUntil;
    /**
     * The timeout date of the member.
     */
    timeoutUntil;
    /**
     * Whether the member is communication disabled.
     */
    communicationDisabled;
    /**
     * Whether the member is timeouted.
     */
    timeouted;
    #client;
    /**
     * Creates a new Member instance.
     * @param data - The data for the member.
     * @param guild - The guild the member belongs to.
     * @param client - The client instance.
     */
    constructor(data, guild, client) {
        super(client);
        this.guild = guild;
        this.#client = client;
        this.#d = data;
        if (typeof guild === "string") {
            this.guild = client.guilds.cache.get(guild);
        }
        this.guild = guild;
        this.#DATE = new Date(data.joined_at);
        this.#PREMIUM = new Date(data.premium_since);
        this.#TIMEOUTED = new Date(data.communication_disabled_until);
        this.joined = (0, utils_1.getAllStamps)(this);
        this.user = this.author;
        this.muted = data.mute;
        this.deafened = data.deaf;
        this.flags = data.flags;
        this.permissions = data.permissions;
        this.role_ids = data.roles;
        this.roles = new RolesManager_1.MemberRolesManager(this.guild, this, this.#client);
        this.presence = null;
        this._patch(data);
    }
    /**
     * Gets the user associated with this member.
     * @returns The User instance of the member.
     */
    get author() {
        if (this.id === this.#client.user.id) {
            return this.#client.user;
        }
        let user = this.#client.users.cache.get(this.id);
        if (!user) {
            user = this.#d.user || this.#d.author;
            this.#client.users.cache.set(this.id, new User_1.User(user, this.#client));
        }
        return user;
    }
    /**
     * Patches the member with new data.
     * @param data - The data to patch the member with.
     * @private
     */
    _patch(data) {
        if ("nick" in data && data.nick !== null && data.nick !== undefined) {
            this.nick = data.nick;
        }
        if ("avatar" in data && data.avatar !== null && data.avatar !== undefined) {
            this.avatar = data.avatar;
        }
        if ("premium_since" in data &&
            data.premium_since !== null &&
            data.premium_since !== undefined) {
            this.premiumSince = (0, utils_1.getAllStamps)(this.#PREMIUM);
        }
        if ("pending" in data) {
            this.pending = data.pending;
        }
        if ("permissions" in data && !data.permissions) {
            this.permissions = data.permissions;
        }
        if ("communication_disabled_until" in data) {
            this.communicationDisabledUntil = (0, utils_1.getAllStamps)(this.#TIMEOUTED);
            this.timeoutUntil = this.communicationDisabledUntil;
            this.communicationDisabled = data.communication_disabled_until
                ? true
                : false;
            this.timeouted = this.communicationDisabled;
        }
        if (this.id === this.#client.user.id) {
            this.edit;
            this.kick;
            this.ban;
            this.leave = async () => {
                const response = await this.#client.rest.request("DELETE", Endpoints.UserGuild(this.guild.id), true);
                return response;
            };
        }
    }
    /**
     * Makes the member leave the guild.
     */
    leave() { }
    /**
     * Checks if the member is kickable.
     * @returns True if the member can be kicked, false otherwise.
     */
    get kickable() {
        var _p = 0;
        var _h = this.roles.cache
            .toJSON()
            .sort((a, b) => b.position - a.position)?.[0]?.position || 0;
        const c = this.guild.members?.me;
        var _h1 = c?.roles.cache
            .toJSON()
            .sort((a, b) => b.position - a.position)?.[0]?.position || 0;
        for (var perms of c?.roles?.cache.toJSON() || []) {
            _p |= perms.permissions;
        }
        const conditions = {
            kick: _p & PermissionsBitFields_1.PermissionsBitField.Roles.KickMembers ||
                _p & PermissionsBitFields_1.PermissionsBitField.Roles.Administrator,
            client: this.id !== this.#client.user.id,
            owner: this.id.toString() !== this.guild.owner_id,
            highest: _h <= _h1,
        };
        var expression = !!conditions.kick &&
            conditions.client &&
            conditions.owner &&
            conditions.highest;
        return expression;
    }
    /**
     * Checks if the member is bannable.
     * @returns True if the member can be banned, false otherwise.
     */
    get bannable() {
        var _p = 0;
        var _h = this.roles.cache
            .toJSON()
            .sort((a, b) => b.position - a.position)?.[0]?.position || 0;
        const c = this.guild.members?.me;
        var _h1 = c?.roles.cache
            .toJSON()
            .sort((a, b) => b.position - a.position)?.[0]?.position || 0;
        for (var perms of c?.roles.cache.toJSON() || []) {
            _p |= perms.permissions;
        }
        const conditions = {
            ban: _p & PermissionsBitFields_1.PermissionsBitField.Roles.BanMembers ||
                _p & PermissionsBitFields_1.PermissionsBitField.Roles.Administrator,
            client: this.id !== this.#client.user.id,
            owner: this.id.toString() !== this.guild.owner_id,
            highest: _h <= _h1,
        };
        var expression = !!conditions.ban &&
            conditions.client &&
            conditions.owner &&
            conditions.highest;
        return expression;
    }
    /**
     * Edits the member with the provided payload.
     * @param obj - The payload for editing the member.
     * @returns {Promise<boolean>} True if the edit was successful, false otherwise.
     */
    async edit(obj) {
        var payload = new MemberEditPayload_1.MemberEditPayload(obj);
        var reason = payload.payload.reason;
        delete payload.payload.reason;
        var response = await this.#client.rest.request("PATCH", Endpoints.GuildMember(this.guild.id, this.id), true, { data: payload.payload }, reason);
        if (response?.error) {
            return false;
        }
        else {
            return true;
        }
    }
    /**
     * Changes the nickname of the member.
     * @param nickname - The new nickname.
     * @param reason - The reason for changing the nickname.
     * @returns The response from the API.
     */
    async changeNickname(nickname, reason) {
        reason = reason?.trim();
        var response = await this.#client.rest.request("PATCH", Endpoints.GuildMember(this.guild.id, this.id), true, { data: { roles: this.roles, flags: this.flags, nick: nickname } }, reason);
        return response;
    }
    /**
     * Kicks the member from the guild.
     * @param reason - The reason for kicking the member.
     * @returns The response from the API.
     */
    async kick(reason) {
        reason = reason?.trim();
        var response = await this.#client.rest.request("DELETE", Endpoints.GuildMember(this.guild.id, this.id), true, {}, reason);
        return response;
    }
    /**
     * Bans the member from the guild.
     * @param obj - The payload for banning the member.
     * @returns The response from the API.
     */
    async ban(obj) {
        const banObj = {
            delete_message_seconds: 0,
            reason: null,
        };
        var data = (0, utils_1.setObj)(banObj, obj, {
            delete_message_seconds: "deleteMessageSeconds",
        });
        var response = await this.#client.rest.request("PUT", Endpoints.GuildBan(this.guild.id, this.id), true, {}, data.reason);
        return response;
    }
    /**
     * Returns a string representation of the member.
     * @returns The mention string of the member.
     */
    toString() {
        return `<@${this.id}>`;
    }
}
exports.Member = Member;
