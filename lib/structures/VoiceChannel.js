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
exports.VoiceChannel = void 0;
const Endpoints = __importStar(require("../rest/Endpoints"));
const BaseChannel_1 = require("./BaseChannel");
const Message_1 = require("./Message");
const MessagePayload_1 = require("./Payloads/MessagePayload");
/** @extends {Channel} */
class VoiceChannel extends BaseChannel_1.Channel {
    bitrate;
    user_limit;
    rate_limit_per_user;
    region;
    video_quality;
    session_id;
    sendMessage;
    send;
    client;
    /**
     * Represents a Voice Channel
     * @param {object} data - Voice Channel Payload
     * @param {Client} client
     */
    constructor(data, client) {
        super(data, client);
        this.client = client;
        /**
         * The actual bitrate of the Voice Channel
         * @type {string}
         */
        this.bitrate = data.bitrate;
        /**
         * The maximum amount of users that are able to be in the Voice Channel
         * @type {number | undefined}
         */
        this.user_limit = data.user_limit;
        /**
         * The cooldown of the Text Channel of the Voice Channel in seconds
         * @type {number}
         */
        this.rate_limit_per_user = data.rate_limit_per_user;
        /**
         * The region of the Voice Channel
         * @type {string}
         */
        this.region = data.rtc_region;
        /**
         * The video quality of the Voice Channel
         * @type {string}
         */
        this.video_quality = data.video_quality_mode;
        /**
         * The session Id to join the Voice Channel
         * @type {string}
         */
        this.session_id = data.session_id;
        /**
         * Voice channel message manager
         * @type {ChannelMessageManager}
         */
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
     * @returns {Promise<Message | Object>}
     */
    async createMessage(obj) {
        const message = new MessagePayload_1.MessagePayload(obj, obj.files);
        var result = await this.client.rest.request("POST", Endpoints.ChannelMessages(this.id), true, { data: message.payload }, null, message.files);
        if (!result)
            return null;
        if (!result.error) {
            result.data = {
                ...result.data,
                guild: this.guild,
                member: this.guild?.members?.cache.get(result.data?.author.id),
            };
            return new Message_1.Message(result.data, this.client);
        }
        else {
            return result;
        }
    }
}
exports.VoiceChannel = VoiceChannel;
