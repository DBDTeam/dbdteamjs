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
exports.ChannelMessageManager = void 0;
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Collection_1 = require("../../utils/Collection");
const utils_1 = require("../../utils/utils");
const Message_1 = require("../Message");
class ChannelMessageManager {
    channel;
    #client;
    cache;
    constructor(channel, client) {
        this.channel = channel;
        this.channel = channel;
        this.#client = client;
        this.cache = new Collection_1.Collection();
    }
    get guild() {
        if ("guild" in this.channel)
            return this.channel.guild;
        else
            null;
    }
    async fetch(msgId) {
        if (typeof msgId === "object" && msgId instanceof Object) {
            const config = {
                limit: 50,
                after: null,
                before: null,
                around: null,
            };
            const data = (0, utils_1.setObj)(config, msgId, {});
            var endpoint = Endpoints.ChannelMessages(this.channel.id);
            const conditions = {
                limit: data.limit >= 1 && data.limit <= 100,
                after: !!data.after,
                before: !!data.before,
                round: !!data.round,
            };
            if (conditions.limit) {
                endpoint += "?limit=" + data.limit;
            }
            if (data.after) {
                endpoint += (conditions.limit ? "?after=" : "&after=") + data.after;
            }
            if (data.before) {
                endpoint +=
                    (conditions.limit || conditions.after ? "?before=" : "&before=") +
                        data.before;
            }
            if (data.around) {
                endpoint +=
                    (conditions.limit || conditions.before ? "?round=" : "&round=") +
                        data.round;
            }
            const messages = await this.#client.rest.request("GET", endpoint, true);
            if (!messages)
                return;
            if (messages.error) {
                return null;
            }
            else {
                var response = [];
                for (var i of messages.data) {
                    const msg = new Message_1.Message(i, this.#client);
                    if (!this.channel.messages)
                        return null;
                    if (this.channel?.messages.cache.get(i.id)) {
                        if (!msg.channel && !this.channel) {
                            msg.channel = this.channel;
                        }
                        this.channel.messages.cache.set(i.id, msg);
                    }
                    response.push(msg);
                }
                return response;
            }
        }
        else if (typeof msgId === "string") {
            const response = await this.#client.rest.request("GET", Endpoints.ChannelMessage(this.channel.id, msgId), true);
            if (!response)
                return null;
            if (response.error) {
                return null;
            }
            else {
                if (!response.data)
                    return null;
                const msg = new Message_1.Message(//@ts-ignore
                { ...response.data, guild: this.guild }, this.#client);
                if (!msg.channel && !this.channel) {
                    msg.channel = this.channel;
                }
                if (this.channel.messages.cache.get(response.data.id)) {
                    this.channel.messages.cache.set(response.data.id, msg);
                }
                return msg;
            }
        }
    }
}
exports.ChannelMessageManager = ChannelMessageManager;
