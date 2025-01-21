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
exports.GuildChannelManager = void 0;
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Collection_1 = require("../../utils/Collection");
const utils_1 = require("../../utils/utils");
class GuildChannelManager {
    #client;
    guildId;
    cache;
    /**
     * Constructs a new GuildChannelManager instance.
     * @param {string} guildId - The ID of the guild to manage channels for.
     * @param {Client} client - The client instance to interact with the Discord API.
     */
    constructor(guildId, client) {
        this.#client = client;
        this.guildId = guildId;
        this.cache = new Collection_1.Collection();
    }
    /**
     * Fetches all channels for the guild and populates the cache.
     * @private
     * @returns {Promise<Collection<string, GuildChannel>> | null} - A collection of channels or null if an error occurs.
     */
    async #fetchAllChannels() {
        const endpoint = Endpoints.GuildChannels(this.guildId);
        const response = await this.#client.rest.request("GET", endpoint);
        if (!response)
            return this.cache;
        if (!response.hasData())
            return response;
        var fetched = new Collection_1.Collection();
        for (let channelData of response.data) {
            const channel = await utils_1.Utilities.typeChannel(channelData, this.#client);
            fetched.set(channel.id, channel);
            this.cache.set(channel.id, channel);
        }
        return fetched;
    }
    /**
     * Fetches a specific channel by its ID.
     * @param {string} id - The ID of the channel to fetch.
     * @returns {Promise<Nullable<GuildChannel | Collection<string, any>> | RESTResponse>} - The fetched channel or null if not found.
     */
    async fetch(id) {
        if (typeof id !== "string") {
            return await this.#fetchAllChannels();
        }
        else {
            const response = await this.#client.rest.request("GET", Endpoints.Channel(id));
            if (!response || response?.error)
                return response;
            const channel = await utils_1.Utilities.typeChannel(response, this.#client);
            this.cache.set(channel.id, channel);
            this.#client.channels.cache.set(channel.id, channel);
            return channel;
        }
    }
    /**
     * Creates a new channel in the guild.
     * @param {ChannnelCreatePayload} channelObj - The channel creation payload.
     * @returns {Promise<Nullable<GuildChannel | RESTResponse>>} - The created channel or null if an error occurs.
     */
    async create(channelObj) {
        const reason = channelObj?.reason;
        const response = await this.#client.rest.request("POST", Endpoints.GuildChannels(this.guildId), true, channelObj, reason);
        if (!response || response.error)
            return response;
        return await utils_1.Utilities.typeChannel(response, this.#client);
    }
    /**
     * Deletes a channel from the guild.
     * @param {string} channelId - The ID of the channel to delete.
     * @param {string} [reason] - The reason for deleting the channel.
     * @returns {Promise<Nullable<GuildChannel | RESTResponse>>} - The deleted channel or null if an error occurs.
     */
    async delete(channelId, reason) {
        const response = await this.#client.rest.request("DELETE", Endpoints.Channel(channelId), true, undefined, reason);
        if (!response || response.error)
            return response;
        return await utils_1.Utilities.typeChannel(response, this.#client);
    }
}
exports.GuildChannelManager = GuildChannelManager;
