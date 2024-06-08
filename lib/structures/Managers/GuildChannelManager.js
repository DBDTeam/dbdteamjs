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
exports.GuildChannelManager = void 0;
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Collection_1 = require("../../utils/Collection");
const utils_1 = require("../../utils/utils");
class GuildChannelManager {
    #client;
    guildId;
    cache;
    constructor(guildId, client) {
        this.#client = client;
        this.guildId = guildId;
        this.cache = new Collection_1.Collection();
    }
    async _fetchAllChannels() {
        try {
            const response = await this.#client.rest.request("GET", Endpoints.GuildChannels(this.guildId), true);
            var _return = new Collection_1.Collection();
            if (!response?.error)
                return response;
            var allChannels = response.data;
            for (var i of allChannels) {
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
            return err;
        }
    }
    /**
     * Fetches a channel in the current guild (if param id is defined, otherwise, fetches the first 100 channels of the guild.)
     * @param {string|undefined|null} id - The Channel Id that will be fetched in the current guild.
     * @returns {Promise<Collection<string, CategoryChannel | TextBasedChannel | ForumChannel> | ErrorResponseFromApi | undefined | CategoryChannel | TextBasedChannel | ForumChannel> | ErrorResponseFromApi>}
     */
    async fetch(id) {
        if (!id || id?.length >= 17 || id?.length <= 18) {
            var res = await this._fetchAllChannels();
            return res;
        }
        else {
            const response = await this.#client.rest.request("GET", Endpoints.Channel(id), true);
            if (!response || response?.error === true)
                return response;
            var channel = (0, utils_1.typeChannel)(response.data, this.#client);
            if (!channel)
                return response;
            this.cache.set(channel.id, channel);
            this.#client.channels.cache.set(channel.id, channel);
            return channel;
        }
    }
}
exports.GuildChannelManager = GuildChannelManager;
