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
/**
 * Represents a manager for handling message reactions.
 */
class MessageReactions {
    client;
    messageId;
    channelId;
    guildId;
    reactions;
    /**
     * Constructs a new instance of the MessageReactions class.
     * @param {Client} client - The client instance to interact with the Discord API.
     * @param {Message} msgObj - The message object associated with these reactions.
     * @param {Array<any>} reacts - The reactions associated with the message.
     */
    constructor(client, msgObj, reacts) {
        this.client = client;
        this.messageId = msgObj.id;
        this.channelId = msgObj.channelId;
        this.guildId = msgObj.guildId;
        this.reactions = reacts;
    }
    /**
     * Gets the total count of reactions.
     * @returns {number} - The number of reactions.
     */
    get count() {
        return this.reactions.length;
    }
    /**
     * Removes specific reactions from the message.
     * @param {RemoveEmojiPayload} removeData - The data containing emojis and optional user to remove.
     * @returns {Promise<Nullable<ResponseFromApi[] | ErrorResponseFromApi[]>>} - The result of the removal operation.
     */
    async remove(removeData) {
        var emojis = removeData.emojis;
        var user = removeData.user || "@me";
        var results = [];
        if (typeof emojis === "object" && Array.isArray(emojis)) {
            for (var i of emojis) {
                var emoji = encodeURIComponent((0, utils_1.getId)(i));
                var result = await this.client.rest.request("DELETE", Endpoints.ChannelMessageReactionUser(this.channelId, this.messageId, emoji, user), true);
                if (!result)
                    continue;
                if (result?.error) {
                    results.push(result);
                }
                else {
                    results.push(result);
                }
            }
            if (!results?.[0])
                return null;
            return results;
        }
    }
    /**
     * Adds reactions to the message.
     * @param {...string} emojis - The emojis to add as reactions.
     * @returns {Promise<Array<ResponseFromApi | ErrorResponseFromApi | null>>} - The result of the add operation.
     */
    async add(...emojis) {
        var results = [];
        for (var i of emojis) {
            var emoji = encodeURIComponent((0, utils_1.getId)(i));
            var result = await this.client.rest.request("PUT", Endpoints.ChannelMessageReactionUser(this.channelId, this.messageId, emoji, "@me"), true);
            results.push(result);
        }
        return results;
    }
    /**
     * Removes all reactions from the message.
     * @returns {Promise<ResponseFromApi | ErrorResponseFromApi | null>} - The result of the removal operation.
     */
    async removeAll() {
        var result = await this.client.rest.request("DELETE", Endpoints.ChannelMessageReactions(this.channelId, this.messageId), true);
        return result;
    }
}
exports.MessageReactions = MessageReactions;
