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
exports.MessageReactions = void 0;
const Endpoints = __importStar(require("../../rest/Endpoints"));
const utils_1 = require("../../utils/utils");
class MessageReactions {
    client;
    messageId;
    channelId;
    guildId;
    reactions;
    constructor(client, msgObj, reacts) {
        this.client = client;
        this.messageId = msgObj.id;
        this.channelId = msgObj.channelId;
        this.guildId = msgObj.guildId;
        this.reactions = reacts;
    }
    get count() {
        return this.reactions.length;
    }
    async remove(removeData) {
        // TODO: I need help with this, i'm not understanding this error when i use:
        //async remove(removeData: RemoveEmojiPayload): Promise<Array<ResponseFromApi | ErrorResponseFromApi | null>>
        var emojis = removeData.emojis;
        var user = removeData.user || "@me";
        var results = [];
        if (typeof emojis === "object" && Array.isArray(emojis)) {
            for (var i of emojis) {
                var emoji = encodeURIComponent((0, utils_1.getId)(i));
                var result = await this.client.rest.request("DELETE", Endpoints.ChannelMessageReactionUser(this.channelId, this.messageId, emoji, user), true);
                results.push(result);
            }
            return results;
        }
    }
    async add(...emojis) {
        var results = [];
        for (var i of emojis) {
            var emoji = encodeURIComponent((0, utils_1.getId)(i));
            var result = await this.client.rest.request("PUT", Endpoints.ChannelMessageReactionUser(this.channelId, this.messageId, emoji, "@me"), true);
            results.push(result);
        }
        return results;
    }
    async removeAll() {
        var result = await this.client.rest.request("DELETE", Endpoints.ChannelMessageReactions(this.channelId, this.messageId), true);
        return result;
    }
}
exports.MessageReactions = MessageReactions;
