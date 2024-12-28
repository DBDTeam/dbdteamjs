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
exports.Member = void 0;
const Endpoints = __importStar(require("../rest/Endpoints"));
const utils_1 = require("../utils/utils");
const Base_1 = require("./Base");
const RolesManager_1 = require("./Managers/RolesManager");
const MemberEditPayload_1 = require("./Payloads/MemberEditPayload");
const User_1 = require("./User");
const MemberPermissionManager_1 = require("./Managers/MemberPermissionManager");
const ClientError_1 = require("../client/errors/ClientError");
const ErrorList_1 = require("../client/errors/ErrorList");
const interfaces_1 = require("../interfaces");
/**
 * Represents a guild member and provides methods to manage and interact with it.
 */
class Member extends Base_1.Base {
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
    /**
     * The guild where the member is located.
     */
    guild;
    #client;
    /**
     * Creates a new Member instance.
     * @param data - The data for the member.
     * @param guild - The guild the member belongs to.
     * @param client - The client instance.
     */
    constructor(data, guild, client) {
        super(data);
        this.#client = client;
        this.#d = data;
        this.guild = (typeof guild === "string" ? client.guilds.cache.get(guild) : guild);
        this.#PREMIUM = new Date(data?.premium_since);
        this.#TIMEOUTED = new Date(data?.communication_disabled_until);
        this.joined = (0, utils_1.getAllStamps)(this);
        this.user = this.author;
        this.muted = data?.mute;
        this.deafened = data?.deaf;
        this.flags = data?.flags;
        this.role_ids = data?.roles;
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
            user = this.#d.user ?? this.#d.author;
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
        this.roles = new RolesManager_1.MemberRolesManager(this.guild, this, this.#client);
        this.permissions = new MemberPermissionManager_1.MemberPermissionManager(this, this.guild);
        if (this.id === this.#client.user.id) {
            this.edit;
            this.kick;
            this.ban;
            this.leave;
        }
    }
    /**
     * Makes the member leave the guild.
     */
    async leave() {
        const response = await this.#client.rest.request("DELETE", Endpoints.UserGuild(this.guild.id), true);
        return response;
    }
    /**
     * Checks if the member is kickable.
     * @returns {boolean} True if the member can be kicked, false otherwise.
     */
    get kickable() {
        const highestRolePosition = this.roles.cache
            .toJSON()
            .sort((a, b) => b.position - a.position)?.[0]
            ?.position || 0;
        const clientMember = this.guild.members?.me;
        const clientHighestRolePosition = clientMember?.roles.cache
            .toJSON()
            .sort((a, b) => b.position - a.position)?.[0]
            ?.position || 0;
        const clientPermissions = clientMember?.roles.cache
            .toJSON()
            .reduce((permissions, role) => permissions | role.permissions, 0) || 0;
        const conditions = {
            kick: BigInt(clientPermissions) &
                (interfaces_1.PermissionsBits.KICK_MEMBERS | interfaces_1.PermissionsBits.ADMINISTRATOR),
            client: this.id !== this.#client.user.id,
            owner: this.id.toString() !== this.guild.owner_id,
            highest: highestRolePosition <= clientHighestRolePosition,
        };
        return Object.values(conditions).every(Boolean);
    }
    /**
     * Checks if the member is bannable.
     * @returns True if the member can be banned, false otherwise.
     */
    get bannable() {
        const highestRolePosition = this.roles.cache
            .toJSON()
            .sort((a, b) => b.position - a.position)?.[0]
            ?.position || 0;
        const clientMember = this.guild.members?.me;
        const clientHighestRolePosition = clientMember?.roles.cache
            .toJSON()
            .sort((a, b) => b.position - a.position)?.[0]
            ?.position || 0;
        const clientPermissions = clientMember?.roles.cache
            .toJSON()
            .reduce((permissions, role) => permissions | role.permissions, 0) || 0;
        const conditions = {
            ban: BigInt(clientPermissions) &
                (interfaces_1.PermissionsBits.BAN_MEMBERS | interfaces_1.PermissionsBits.ADMINISTRATOR),
            client: this.id !== this.#client.user.id,
            owner: this.id.toString() !== this.guild.owner_id,
            highest: highestRolePosition <= clientHighestRolePosition,
        };
        return Object.values(conditions).every(Boolean);
    }
    /**
     * Edits the member with the provided payload.
     * @param editPayload - The payload for editing the member.
     * @returns {Promise<boolean>} True if the edit was successful, false otherwise.
     */
    async edit(editPayload) {
        if (!editPayload || typeof editPayload !== "object")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "object", "editPayload");
        var payload = new MemberEditPayload_1.MemberEditPayload(editPayload);
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
        if (!nickname || typeof nickname !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "nickname");
        if (reason && typeof reason !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "reason");
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
        if (reason && typeof reason !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "reason");
        reason = reason?.trim();
        var response = await this.#client.rest.request("DELETE", Endpoints.GuildMember(this.guild.id, this.id), true, {}, reason);
        return response;
    }
    /**
     * Bans the member from the guild.
     * @param obj - The payload for banning the member.
     * @returns The response from the API.
     */
    async ban(data) {
        if (!data || typeof data !== "object")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "object", "data");
        if (data.delete_message_seconds &&
            typeof data.delete_message_seconds !== "number")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "number", "data.delete_message_seconds");
        if (data.reason && typeof data.reason !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "data.reason");
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
    static type = "Member";
}
exports.Member = Member;
