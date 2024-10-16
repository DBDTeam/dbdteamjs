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
const Message_1 = require("./Message");
const MessagePayload_1 = require("./Payloads/MessagePayload");
const TextBasedChannel_1 = require("./TextBasedChannel");
/** @extends {Channel} */
class VoiceChannel extends TextBasedChannel_1.TextBasedChannel {
    /**
     * The actual bitrate of the Voice Channel
     */
    bitrate;
    /**
     * The maximum amount of users that are able to be in the Voice Channel
     */
    user_limit;
    /**
     * The cooldown of the Text Channel of the Voice Channel in seconds
     */
    rate_limit_per_user;
    /**
     * The region of the Voice Channel
     */
    region;
    /**
     * The video quality of the Voice Channel
     */
    video_quality;
    /**
     * The session Id to join the Voice Channel
     * @type {string}
     */
    session_id;
    /**
     * Creates a message in the Text Channel
     * @readonly
     * @function
     */
    sendMessage = (body) => this.createMessage(body);
    /**
     * Creates a message in the Text Channel
     * @readonly
     * @function
     */
    send = (body) => this.createMessage(body);
    client;
    /**
     * Represents a Voice Channel
     * @param {object} data - Voice Channel Payload
     * @param {Client} client
     */
    constructor(data, client) {
        super(data, client);
        this.client = client;
        this.bitrate = data.bitrate;
        this.user_limit = data.user_limit;
        this.rate_limit_per_user = data.rate_limit_per_user;
        this.region = data.rtc_region;
        this.video_quality = data.video_quality_mode;
        this.session_id = data.session_id;
        this.sendMessage = (body) => this.createMessage(body);
        this.send = (body) => this.createMessage(body);
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
