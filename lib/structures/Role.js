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
exports.GuildRole = void 0;
const Endpoints = __importStar(require("../rest/Endpoints"));
const ImageResolver_1 = require("../utils/ImageResolver");
const Base_1 = require("./Base");
/**
 * Represents a Discord Guild Role
 */
class GuildRole extends Base_1.Base {
    data;
    client;
    guildId;
    name;
    hoist;
    icon;
    position;
    permissions;
    managed;
    mentionable;
    tags;
    flags;
    guild;
    constructor(data, guild, client) {
        super(client);
        this.data = data;
        this.client = client;
        this.data = data;
        this.id = data.id;
        this.guildId = guild?.id || guild;
        if (client.guilds && client.guilds.cache)
            this.guild = client.guilds.cache.get(guild.id);
        this.name = data.name;
        this.hoist = !!data.hoist;
        this.icon = null;
        this.position = data.position;
        this.permissions = data.permissions;
        this.managed = !!data.managed;
        this.mentionable = !!data.mentionable;
        this.tags = {};
        this.flags = data.flags;
        this._patch();
    }
    _patch() {
        if (this.data.icon && this.data.icon) {
            this.icon = this.data.icon;
        }
        if (this.data.tags) {
            this.tags = this.data.tags;
        }
    }
    async delete(reason = undefined) {
        const response = await this.client.rest.request("DELETE", Endpoints.GuildRole(this.guildId, this.id), true, {}, reason);
        return response ? false : true;
    }
    async edit(body, reason) {
        const response = await this.client.rest.request("PATCH", Endpoints.GuildRole(this.guildId, this.id), true, body, reason);
        if (!response) {
            return response;
        }
        else {
            return new GuildRole(response.data, this.guildId, this.client);
        }
    }
    async setName(name, reason) {
        const response = await this.edit({ name }, reason);
        return response;
    }
    async setPosition(position, reason) {
        const response = await this.edit({ position }, reason);
        return response;
    }
    async setColor(color, reason) {
        const response = await this.edit({ color }, reason);
        return response;
    }
    async setHoist(hoist, reason) {
        const response = await this.edit({ hoist: !!hoist }, reason);
        return response;
    }
    async setIcon(icon, reason) {
        const data = await (0, ImageResolver_1.resolveImage)(icon);
        const response = await this.edit({ icon: data.uri }, reason);
        return response;
    }
    async setEmoji(unicode_emoji, reason) {
        const response = await this.edit({ unicode_emoji }, reason);
        return response;
    }
    async setMentionable(mentionable, reason) {
        const response = await this.edit({ mentionable: !!mentionable }, reason);
        return response;
    }
}
exports.GuildRole = GuildRole;
