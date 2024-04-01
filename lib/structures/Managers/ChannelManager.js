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
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Collection_1 = require("../../utils/Collection");
const utils_1 = require("../../utils/utils");
class GuildChannelManager {
    client;
    guildId;
    cache;
    constructor(guildId, client) {
        this.client = client;
        this.guildId = guildId;
        this.cache = new Collection_1.Collection();
        this._fetchAllChannels();
    }
    async _fetchAllChannels() {
        try {
            const result = await this.client.rest.request("GET", Endpoints.GuildChannels(this.guildId), true);
            var _return = new Collection_1.Collection();
            if (!result)
                return null;
            var allChannels = result.data;
            if (!allChannels)
                return null;
            for (const i of allChannels) {
                var guild = this.client.channels.cache.get(i.id)?.guild ||
                    this.cache.get(i.id)?.guild;
                i.guild = guild;
                this.client.channels.cache.set(i.id, (0, utils_1.typeChannel)(i, this.client));
                this.cache.set(i.id, (0, utils_1.typeChannel)(i, this.client));
                _return.set(i.id, (0, utils_1.typeChannel)(i, this.client));
            }
            return _return;
        }
        catch (err) {
            console.log(err);
        }
    }
    async fetch(id) {
        if (!id || id?.length >= 17 || id?.length <= 18) {
            var res = await this._fetchAllChannels();
            return res;
        }
        else {
            const response = await this.client.rest.request("GET", Endpoints.Channel(id), true);
            if (!response)
                return null;
            if (!response.data)
                return null;
            const channel = response.data;
            this.cache.set(channel.id, channel);
            this.client.channels.cache.set(channel.id, channel);
            return channel;
        }
    }
    async create(channelObj = {}) {
        const reason = channelObj?.reason;
        const response = this.client.rest.request("POST", Endpoints.GuildChannels(this.guildId), true, channelObj, reason);
        if (response.error) {
            return response.error;
        }
        else {
            return await (0, utils_1.typeChannel)(response.data, this.client);
        }
    }
    async delete(channelId, reason) {
        const response = this.client.rest.request("DELETE", Endpoints.Channel(channelId), true, channelObj, reason);
        if (response.error) {
            return response.error;
        }
        else {
            return await (0, utils_1.typeChannel)(response.data, this.client);
        }
    }
}
class ChannelManager {
    constructor(client) {
        readOnly(this, "client", client);
        this.cache = new Collection_1.Collection();
    }
    async fetch(id) {
        var channel = await this.client.rest.request("GET", Endpoints.CHANNEL(id), true);
        channel = channel.data;
        return channel;
    }
}
module.exports = { GuildChannelManager, ChannelManager };
