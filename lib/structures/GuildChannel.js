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
exports.GuildChannel = void 0;
const BaseChannel_1 = require("./BaseChannel");
const ClientError_1 = require("../client/errors/ClientError");
const ErrorList_1 = require("../client/errors/ErrorList");
const Endpoints = __importStar(require("../rest/Endpoints"));
const utils_1 = require("../utils");
const Managers_1 = require("./Managers");
class GuildChannel extends BaseChannel_1.Channel {
    /**
     * The guild id where the channel is located.
     * @type {string}
     */
    /**
     * If the channel is nsfw
     * @type {Nullable<boolean>}
     */
    nsfw;
    parent_id;
    permission_overwrites;
    position;
    permissions;
    guildId;
    constructor(data, client) {
        super(data, client);
        this.guildId = data.guild_id;
        this.nsfw = data.nsfw;
        this.parent_id = data.parent_id;
        this.permission_overwrites = data.permission_overwrites;
        this.position = data.position;
        this.permissions = new Managers_1.ChannelPermissionManager(this.id, this.client);
    }
    /**
     * The guild where the channel is located.
     * @type {Guild}
     */
    get guild() {
        return this.client.guilds.cache.get(this.guildId);
    }
    /**
     * Clones the channel
     * @returns {Promise<Nullable<ThreadChannel | VoiceChannel | Channel | TextChannel | CategoryChannel | RESTResponse>> }
     * @async
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     * channel.clone().then((result) => {
     *  if(result?.error){
     *      console.log(`Error :(`)
     *  } else {
     *      console.log(`Channel cloned successfully`)
     *  }
     * })
     */
    async clone(reason) {
        const data = this;
        if (reason && typeof reason !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "reason");
        var result = await this.client.rest.request("POST", Endpoints.GuildChannels(this.guildId), true, data, reason);
        if (!result || !result?.error)
            return null;
        return result?.error
            ? result
            : utils_1.Utilities.typeChannel(result, this.client);
    }
    /**
     *
     * @param {object} obj - The Channel Edit payload
     * @returns {Promise<DefaultChannel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel>}
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     * channel.edit({ name: "hello" }).then((result) => {
     *  if(result?.error){
     *      console.log(`Error :()`)
     *  } else {
     *      console.log(`Channel edited successfully`)
     *  }
     * })
     * @async
     */
    async edit(data, reason) {
        if (!data || typeof data !== "object")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "object", "data");
        var result = await this.client.rest.request("PATCH", Endpoints.Channel(this.id), true, data, reason);
        if (!result || !result?.error)
            return null;
        return result?.error
            ? result
            : utils_1.Utilities.typeChannel(result, this.client);
    }
    /**
     * Deletes the Channel
     * @param {string} reason - The reason
     * @returns {Promise<boolean>}
     */
    async delete(reason) {
        if (reason && typeof reason !== "string")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "string", "reason");
        var result = await this.client.rest.request("DELETE", Endpoints.Channel(this.id), true, {}, reason?.trim() || null);
        return result?.error ? false : true;
    }
}
exports.GuildChannel = GuildChannel;
