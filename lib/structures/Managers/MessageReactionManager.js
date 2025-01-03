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
const utils_1 = require("../../utils/utils");
/**
 * Represents a manager for handling message reactions.
 */
class MessageReactions {
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
     * The guild id
     * @type { string }
     */
    guildId;
    /**
     * The reactions that the message has.
     * * @type {Array<string>}
    */
    reactions;
    /**
     * Constructs a new instance of the MessageReactions class.
     * @param {Client} client - The client instance to interact with the Discord API.
     * @param {Message} msgObj - The message object associated with these reactions.
     * @param {Array<string>} reacts - The reactions associated with the message.
     */
    constructor(client, msgObj, reacts) {
        this.#client = client;
        this.messageId = msgObj.id;
        this.channelId = msgObj.channelId;
        this.guildId = msgObj.guild.id;
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
     * @returns {Promise<Nullable<EmojisEmptyAnswer[]>>} - The result of the removal operation.
     */
    async remove(removeData) {
        var emojis = removeData.emojis;
        var user = removeData.user || "@me";
        var results = [];
        if (typeof emojis === "object" && Array.isArray(emojis)) {
            for (var i of emojis) {
                var emoji = encodeURIComponent(utils_1.Utilities.getId(i));
                var result = await this.#client.rest.request("DELETE", Endpoints.ChannelMessageReactionUser(this.channelId, this.messageId, emoji, user), true);
                if (!result)
                    continue;
                results.push({ success: result.error ? false : true, emoji });
            }
            if (!results?.[0])
                return null;
            for (var index in results) {
                const result = results[index];
                if ("success" in result && !result.success) {
                    this.reactions.splice(Number(index), 1);
                }
            }
            return results;
        }
    }
    /**
     * Adds reactions to the message.
     * @param {...string} emojis - The emojis to add as reactions.
     * @returns {Promise<Nullable<EmojisEmptyAnswer[]>>} - The result of the add emoji operation.
     */
    async add(...emojis) {
        var results = [];
        for (var i of emojis) {
            var emoji = encodeURIComponent(utils_1.Utilities.getId(i));
            var result = await this.#client.rest.request("PUT", Endpoints.ChannelMessageReactionUser(this.channelId, this.messageId, emoji, "@me"), true);
            if (!result)
                continue;
            results.push({ success: result.error ? false : true, emoji });
        }
        for (var index in results) {
            const result = results[index];
            if ("success" in result && !result.success) {
                this.reactions.push(decodeURIComponent(result.emoji));
            }
        }
        return results;
    }
    /**
     * Removes all reactions from the message.
     * @returns {Promise<RESTResponse | null>} - The result of the removal operation.
     */
    async removeAll() {
        var result = await this.#client.rest.request("DELETE", Endpoints.ChannelMessageReactions(this.channelId, this.messageId), true);
        this.reactions = [];
        return result?.error ? false : true;
    }
}
exports.MessageReactions = MessageReactions;
