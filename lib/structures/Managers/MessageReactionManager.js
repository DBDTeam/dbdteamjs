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
exports.MessageReactions = void 0;
const Endpoints = __importStar(require("../../rest/Endpoints"));
const utils_1 = require("../../utils");
const utils_2 = require("../../utils/utils");
/**
 * Represents a manager for handling message reactions.
 */
class MessageReactions {
    message;
    /**
     * The client
     * @type {Client}
     */
    #client;
    /**
     * The current message id
     * @type {string}
     */
    messageId;
    /**
     * The current channel id where the message was sent
     * @type {string}
     */
    channelId;
    /**
     * The reactions that the message has.
     * * @type {Array<string>}
    */
    reacts;
    /**
     * Constructs a new instance of the MessageReactions class.
     * @param {Client} client - The client instance to interact with the Discord API.
     * @param {Message} message - The message object associated with these reactions.
     * @param {Array<string>} reacts - The reactions associated with the message.
     */
    constructor(client, message, reacts) {
        this.message = message;
        this.#client = client;
        this.messageId = message.id;
        this.channelId = message.channelId;
        this.reacts = reacts;
    }
    get() {
        return this.reacts;
    }
    async fetch() {
        var response = await this.message.channel.messages.fetch(this.messageId);
        if (!response)
            return response;
        if (response.error)
            return response;
        this.reacts = response.reactions.reacts;
        return this.reacts;
    }
    /**
     * Gets the total count of reactions.
     * @returns {number} - The number of reactions.
     */
    get count() {
        return this.reacts.length;
    }
    /**
     * Removes specific reactions from the message.
     * @param {RemoveEmojiPayload} removeData - The data containing emojis and optional user to remove.
     * @returns {Promise<Nullable<EmojisEmptyAnswer[]>>} - The result of the removal operation.
     */
    async remove(removeData) {
        var emojis = Array.isArray(removeData.reactions) ? removeData.reactions : [removeData.reactions];
        var user = removeData.user || "@me";
        var results = new utils_1.Collection();
        for (var i of emojis) {
            var emoji = encodeURIComponent(utils_2.Utilities.getId(i));
            var result = await this.#client.rest.request("DELETE", Endpoints.ChannelMessageReactionUser(this.channelId, this.messageId, emoji, user), true);
            if (!result)
                return result;
            results.set(i, { success: result.error ? false : true, reaction: i });
        }
        if (results.size < 0)
            return null;
        return results;
    }
    /**
     * Adds reactions to the message.
     * @param {...string} emojis - The emojis to add as reactions.
     * @returns {Promise<Nullable<Collection<string, EmojisEmptyAnswer>>>} - The result of the add emoji operation.
     */
    async add(...emojis) {
        var results = new utils_1.Collection();
        for (var emoji of emojis) {
            var emojiEncoded = encodeURIComponent(utils_2.Utilities.getId(emoji));
            var result = await this.#client.rest.request("PUT", Endpoints.ChannelMessageReactionUser(this.channelId, this.messageId, emojiEncoded, "@me"), true);
            if (!result)
                return result;
            results.set(emoji, { success: result.error ? false : true, reaction: emoji });
        }
        return results;
    }
    /**
     * Removes all reactions from the message.
     * @returns {Promise<RESTResponse | null>} - The result of the removal operation.
     */
    async removeAll() {
        var result = await this.#client.rest.request("DELETE", Endpoints.ChannelMessageReactions(this.channelId, this.messageId), true);
        if (result?.isError())
            return false;
        this.reacts = [];
        return true;
    }
}
exports.MessageReactions = MessageReactions;
