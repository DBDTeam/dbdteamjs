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
exports.TextChannel = void 0;
const Endpoints = __importStar(require("../rest/Endpoints"));
const utils_1 = require("../utils/utils");
const BaseChannel_1 = require("./BaseChannel");
const ChannelMessageManager_1 = require("./Managers/ChannelMessageManager");
const Message_1 = require("./Message");
const MessagePayload_1 = require("./Payloads/MessagePayload");
/** @extends {Channel} */
class TextChannel extends BaseChannel_1.Channel {
    #client;
    last_message_id;
    last_pin;
    rate_limit_per_user;
    messages;
    cooldown;
    sendMessage;
    send;
    /**
     * Represents a Text Channel
     * @param {*} data
     * @param {Client} client
     */
    constructor(data, client) {
        super(data, client);
        this.#client = this.client;
        /**
         * The Text Channel position
         * @type {number}
         */
        this.position = data.position;
        /**
         * The Text Channel permissions overwrites
         * @type {object}
         */
        this.permission_overwrites = data.permission_overwrites;
        /**
         * The Text Channel topic
         * @type {string | undefined}
         */
        this.topic = data.topic;
        /**
         * If the Text Channel has enabled the NSFW option
         * @type {boolean}
         */
        this.nsfw = data.nsfw;
        /**
         * The last Text Channel message
         * @type {string | undefined}
         */
        this.last_message_id = data.last_message_id;
        /**
         * The Text Channel parent id (category id)
         * @type {string}
         */
        this.parent_id = data.parent_id;
        /**
         * The Text Channel last pin time information
         * @type {object}
         */
        this.last_pin = (0, utils_1.getAllStamps)(data.last_pin_timestamp);
        /**
         * The Text Channel cooldown per user in seconds
         * @type {number}
         */
        this.rate_limit_per_user = data.rate_limit_per_user;
        /**
         * The Text Channel message manager
         * @type {ChannelMessageManager}
         */
        this.messages = new ChannelMessageManager_1.ChannelMessageManager(this, this.#client);
        /**
         * The Text Channel cooldown per user in seconds
         * @readonly
         * @type {number}
         */
        this.cooldown = this.rate_limit_per_user;
        /**
         * Creates a message in the Text Channel
         * @readonly
         */
        this.sendMessage = (...args) => this.createMessage(args);
        /**
         * Creates a message in the Text Channel
         * @readonly
         */
        this.send = (...args) => this.createMessage(args);
    }
    /**
     * Creates a message in the Text Channel
     * @param {MessagePayload} obj - The message send payload
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
    async createMessage(obj) {
        const message = new MessagePayload_1.MessagePayload(obj, obj.files);
        var result = await this.#client.rest.request("POST", Endpoints.ChannelMessages(this.id), true, { data: message.payload }, null, message.files);
        if (!result)
            return null;
        if (!result.error) {
            const data = {
                ...result.data,
                guild: this.guild,
                member: this.guild?.members?.cache.get(result.data?.author.id),
            };
            return new Message_1.Message(data, this.#client);
        }
        else {
            return result;
        }
    }
}
exports.TextChannel = TextChannel;
