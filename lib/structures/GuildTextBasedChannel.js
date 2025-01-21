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
exports.GuildTextBasedChannel = void 0;
const ChannelMessageManager_1 = require("./Managers/ChannelMessageManager");
const Endpoints = __importStar(require("../rest/Endpoints"));
const Message_1 = require("./Message");
const MessagePayload_1 = require("./Payloads/MessagePayload");
const ClientError_1 = require("../client/errors/ClientError");
const ErrorList_1 = require("../client/errors/ErrorList");
const utils_1 = require("../utils/utils");
const MessageCollector_1 = require("./Collectors/MessageCollector");
const GuildChannel_1 = require("./GuildChannel");
class GuildTextBasedChannel extends GuildChannel_1.GuildChannel {
    /**
     * The Text Channel message manager
     */
    messages;
    /**
     * The last Text Channel message
     */
    last_message_id;
    /**
     * The rate limit per user of the channel.
     * @type {Nullable<number>}
     */
    rate_limit_per_user;
    /**
     * Creates a message in the Text Channel
     * @readonly
     * @function
     */
    sendMessage = async (body) => await this.createMessage(body);
    /**
     * Creates a message in the Text Channel
     * @readonly
     * @function
     */
    send = async (body) => await this.createMessage(body);
    /**
     * The Text Channel last pin time information
     */
    last_pin;
    constructor(data, client) {
        super(data, client);
        this.last_message_id = data.last_message_id;
        this.last_pin = utils_1.Utilities.getAllStamps(new Date(data.last_pin_timestamp || 0));
        this.rate_limit_per_user = data.rate_limit_per_user;
        this.messages = new ChannelMessageManager_1.ChannelMessageManager(this, this.client);
        this.sendMessage = async (body) => await this.createMessage(body);
        this.send = async (body) => await this.createMessage(body);
    }
    /**
     * Creates a message in the Text Channel
     * @param {MessagePayload} body - The message send payload
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     *
     * channel.createMessage(`Hello world!`).then((response) => {
     *  if(response.error){
     *      return console.log(response)
     *  } else {
     *      console.log(`Message sended successfully!`)
     *  }
     * })
     * @returns {Promise<Message | object>}
     */
    async createMessage(body) {
        if (typeof body === "string" || body instanceof String) {
            body = { content: body };
        }
        if (!body || typeof body !== "object")
            throw new ClientError_1.ClientTypeError(ErrorList_1.ErrorNames.InvalidType, "object", "body");
        if (!body?.content &&
            !body.files &&
            !body.embeds &&
            !body.poll &&
            !body.sticker_ids)
            throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.MissingRequiredProperties, "Message", ["content", "files", "embeds", "poll", "sticker_ids"]);
        const message = new MessagePayload_1.MessagePayload(body, body?.files);
        var result = await this.client.rest.request("POST", Endpoints.ChannelMessages(this.id), true, message.payload, null, message.files);
        if (!result)
            return null;
        if (!result.hasData())
            return result;
        const data = {
            ...result.data,
            member: this.guild.members.cache.get(result.data.author.id),
            guild_id: this.guildId,
        };
        return new Message_1.Message(data, this.client);
    }
    createMessageCollector(filter, options) {
        const collector = new MessageCollector_1.MessageCollector(this.client, filter, options);
        return collector;
    }
}
exports.GuildTextBasedChannel = GuildTextBasedChannel;
