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
exports.ChannelManager = exports.GuildChannelManager = void 0;
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
        this._fetchAllChannels();
    }
    /**
     * Fetches all channels for the guild and populates the cache.
     * @private
     * @returns {Promise<Collection<string, Channel>> | null} - A collection of channels or null if an error occurs.
     */
    async _fetchAllChannels() {
        try {
            const result = await this.#client.rest.request("GET", Endpoints.GuildChannels(this.guildId), true);
            var _return = new Collection_1.Collection();
            if (!result)
                return null;
            var allChannels = result.data;
            if (!allChannels)
                return null;
            for (const i of allChannels) {
                var guild = this.#client.channels.cache.get(i.id)?.guild ||
                    this.cache.get(i.id)?.guild;
                i.guild = guild;
                this.#client.channels.cache.set(i.id, (0, utils_1.typeChannel)(i, this.#client));
                this.cache.set(i.id, (0, utils_1.typeChannel)(i, this.#client));
                _return.set(i.id, (0, utils_1.typeChannel)(i, this.#client));
            }
            return _return;
        }
        catch (err) {
            console.log(err);
        }
    }
    /**
     * Fetches a specific channel by its ID.
     * @param {string} id - The ID of the channel to fetch.
     * @returns {Promise<Channel | null>} - The fetched channel or null if not found.
     */
    async fetch(id) {
        if (!id || id?.length >= 17 || id?.length <= 18) {
            var res = await this._fetchAllChannels();
            return res;
        }
        else {
            const response = await this.#client.rest.request("GET", Endpoints.Channel(id), true);
            if (!response)
                return null;
            if (!response.data)
                return null;
            const channel = await (0, utils_1.typeChannel)(response.data, this.#client);
            this.cache.set(channel.id, channel);
            this.#client.channels.cache.set(channel.id, channel);
            return channel;
        }
    }
    /**
     * Creates a new channel in the guild.
     * @param {ChannnelCreatePayload} channelObj - The channel creation payload.
     * @returns {Promise<Nullable<Channel | ErrorResponseFromApi>>} - The created channel or null if an error occurs.
     */
    async create(channelObj) {
        const reason = channelObj?.reason;
        const response = await this.#client.rest.request("POST", Endpoints.GuildChannels(this.guildId), true, channelObj, reason);
        if (!response)
            return response;
        if (response?.error) {
            return response;
        }
        else {
            return await (0, utils_1.typeChannel)(response.data, this.#client);
        }
    }
    /**
     * Deletes a channel from the guild.
     * @param {string} channelId - The ID of the channel to delete.
     * @param {string} [reason] - The reason for deleting the channel.
     * @returns {Promise<Nullable<Channel | ErrorResponseFromApi>>} - The deleted channel or null if an error occurs.
     */
    async delete(channelId, reason) {
        const response = await this.#client.rest.request("DELETE", Endpoints.Channel(channelId), true, undefined, reason);
        if (!response)
            return response;
        if (response.error) {
            return response;
        }
        else {
            return await (0, utils_1.typeChannel)(response.data, this.#client);
        }
    }
}
exports.GuildChannelManager = GuildChannelManager;
class ChannelManager {
    #client;
    cache;
    /**
     * Constructs a new ChannelManager instance.
     * @param {Client} client - The client instance to interact with the Discord API.
     */
    constructor(client) {
        this.#client = client;
        this.cache = new Collection_1.Collection();
    }
    /**
     * Fetches a specific channel by its ID.
     * @param {string} id - The ID of the channel to fetch.
     * @returns {Promise<Channel | null>} - The fetched channel or null if an error occurs.
     */
    async fetch(id) {
        const response = await this.#client.rest.request("GET", Endpoints.Channel(id), true);
        if (!response || response.status !== 200)
            return response;
        return await (0, utils_1.typeChannel)(response.data, this.#client);
    }
}
exports.ChannelManager = ChannelManager;
