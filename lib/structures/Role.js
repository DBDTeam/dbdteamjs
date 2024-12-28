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
exports.GuildRole = void 0;
const Endpoints = __importStar(require("../rest/Endpoints"));
const ImageResolver_1 = require("../utils/ImageResolver");
const Base_1 = require("./Base");
const interfaces_1 = require("../interfaces");
const ClientError_1 = require("../client/errors/ClientError");
const ErrorList_1 = require("../client/errors/ErrorList");
/**
 * Represents a Discord Guild Role
 */
class GuildRole extends Base_1.Base {
    data;
    /**
     * The ID of the guild to which the role belongs.
     */
    guildId;
    /**
     * The name of the role.
     */
    name;
    /**
     * Whether the role is displayed separately in the member list.
     */
    hoist;
    /**
     * The role's icon hash, if it has one.
     */
    icon;
    /**
     * The role's position in the hierarchy.
     */
    position;
    /**
     * The permissions the role has.
     */
    permissions;
    /**
     * Whether the role is managed by an integration.
     */
    managed;
    /**
     * Whether the role is mentionable.
     */
    mentionable;
    /**
     * The role's tags.
     */
    tags;
    /**
     * The role's flags.
     */
    role_flags;
    /**
     * The guild to which the role belongs.
     */
    guild;
    /**
     * A reference to the client.
     */
    #client;
    constructor(data, guild, client) {
        super(client);
        this.data = data;
        this.#client = client;
        this.data = data;
        this.id = data.id;
        this.guildId = guild?.id || guild;
        this.guild = client.guilds.cache.get(guild.id);
        this.name = data.name;
        this.hoist = !!data.hoist;
        this.icon = null;
        this.position = data.position;
        this.permissions = Number(data.permissions);
        this.managed = !!data.managed;
        this.mentionable = !!data.mentionable;
        this.tags = {};
        this.role_flags = data.flags;
        this._patch();
    }
    _patch() {
        if (this.data.icon) {
            this.icon = this.data.icon;
        }
        if (this.data.tags) {
            this.tags = this.data.tags;
        }
    }
    async delete(reason = undefined) {
        const me = this.guild.members.me;
        if (!me.permissions.hasPermission(interfaces_1.PermissionNames.ManageRoles))
            throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.MissingPermissions, "ManageRoles");
        const response = await this.#client.rest.request("DELETE", Endpoints.GuildRole(this.guildId, this.id), true, {}, reason);
        return response?.error ? false : true;
    }
    async edit(body, reason) {
        const me = this.guild.members.me;
        if (!me.permissions.hasPermission(interfaces_1.PermissionNames.ManageRoles))
            throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.MissingPermissions, "ManageRoles");
        if (!body && typeof body !== "object")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "RESTPatchAPIGuildRoleJSONBody & { position?: number }", "body");
        const response = await this.#client.rest.request("PATCH", Endpoints.GuildRole(this.guildId, this.id), true, body, reason);
        if (response?.error || !response) {
            return response;
        }
        else {
            return new GuildRole(response.data, this.guild, this.#client);
        }
    }
    async setName(name, reason) {
        if (!name && typeof name !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "name");
        if (reason && typeof reason !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "reason");
        const response = await this.edit({ name }, reason);
        return response;
    }
    async setPosition(position, reason) {
        if (!position && typeof position !== "number")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "number", "position");
        if (reason && typeof reason !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "reason");
        const response = await this.edit({ position }, reason);
        return response;
    }
    async setColor(color, reason) {
        if (!color && typeof color !== "number")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "number", "color");
        if (reason && typeof reason !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "reason");
        const response = await this.edit({ color }, reason);
        return response;
    }
    async setHoist(hoist, reason) {
        if (!hoist && typeof hoist !== "boolean")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "boolean", "hoist");
        if (reason && typeof reason !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "reason");
        const response = await this.edit({ hoist: !!hoist }, reason);
        return response;
    }
    async setIcon(icon, reason) {
        if (!icon && typeof icon !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "icon");
        if (reason && typeof reason !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "reason");
        const data = await (0, ImageResolver_1.resolveImage)(icon);
        const response = await this.edit({ icon: data.uri }, reason);
        return response;
    }
    async setEmoji(unicode_emoji, reason) {
        if (!unicode_emoji && typeof unicode_emoji !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "unicode_emoji");
        if (reason && typeof reason !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "reason");
        const response = await this.edit({ unicode_emoji }, reason);
        return response;
    }
    async setMentionable(mentionable, reason) {
        if (!mentionable && typeof mentionable !== "boolean")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "boolean", "mentionable");
        if (reason && typeof reason !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "reason");
        const response = await this.edit({ mentionable }, reason);
        return response;
    }
}
exports.GuildRole = GuildRole;
