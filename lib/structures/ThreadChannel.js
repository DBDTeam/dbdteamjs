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
exports.ThreadChannel = void 0;
const Endpoints = __importStar(require("../rest/Endpoints"));
const utils_1 = require("../utils/utils");
const BaseChannel_1 = require("./BaseChannel");
const ChannelMessageManager_1 = require("./Managers/ChannelMessageManager");
const ThreadMemberManager_1 = require("./Managers/ThreadMemberManager");
const Message_1 = require("./Message");
const MessagePayload_1 = require("./Payloads/MessagePayload");
/**
 * @typedef {import('./TextChannel').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel').VoiceChannel} VoiceChannel
 * @typedef {import('./ForumChannel')} ForumChannel
 * @typedef {import('./Guild').Guild} Guild
 * @typedef {import('../client/Client').Client} Client
 */
/** @extends {Channel} */
class ThreadChannel extends BaseChannel_1.Channel {
    client;
    message_count;
    locked;
    created;
    auto_archive_duration;
    archived;
    archive_stamp;
    channel_id;
    channel;
    owner_id;
    owner;
    members;
    messages;
    /**
     * Represents a ThreadChannel
     * @param {Object} data - The ThreadChannel payload
     * @param {Client} client - The Client
     */
    constructor(data, client) {
        super(data, client);
        this.client = client;
        /**
         * The message count of the thread (stops when reaches 50 messages)
         * @type {number}
         */
        this.message_count = data.total_message_sent;
        /**
         * If the ThreadChannel is locked
         * @type {boolean | undefined}
         */
        this.locked = data.thread_metadata?.locked;
        /**
         * The time information when the ThreadChannel was created
         * @type {object}
         */
        this.created = (0, utils_1.getAllStamps)(data.thread_metadata?.create_timestamp);
        /**
         * The auto archive dration of the ThreadChannel in seconds.
         * @type {number}
         */
        this.auto_archive_duration = data.thread_metadata?.auto_archive_duration;
        /**
         * If the ThreadChannel is archived
         * @type {boolean}
         */
        this.archived = data.thread_metadata.archived;
        /**
         * The time information when the ThreadChannel was archived (only if the ThreadChannel is archived)
         * @type {object | undefined}
         */
        this.archive_stamp = (0, utils_1.getAllStamps)(data.thread_metadata?.archive_timestamp);
        /**
         * The cooldown of the ThreadChannel in seconds.
         * @type {string | undefined}
         */
        this.rate_limit_per_user = data.rate_limit_per_user;
        /**
         * The Channel Id where the ThreadChannel was created.
         * @type {number}
         */
        this.channel_id = data.parent_id;
        if (this.client.channels.cache.get(this.channel_id)) {
            /**
             * The Channel where the ThreadChannel was created.
             * @type {ForumChannel | TextChannel | VoiceChannel | undefined}
             */
            this.channel = this.client.channels.cache.get(this.channel_id);
        } // pa cuando no em cambies de rubro xd
        /**
         * The owner id of the ThreadChannel (The owner id means the creator of the ThreadChannel)
         * @type {number}
         */
        this.owner_id = data.owner_id;
        if (this.guild?.members?.cache?.get(this.owner_id)) {
            /**
             * The owner of the ThreadChannel (The owner means the creator of the ThreadChannel)
             * @type {number | undefined}
             */
            this.owner = this.guild.members.cache.get(this.owner_id);
        }
        /**
         * The ThreadMemberManager of the ThreadChannel.
         * @type {ThreadMemberManager}
         */
        this.members = new ThreadMemberManager_1.ThreadMemberManager(this.client, this);
        /**
         * The ChannelMessageManager of the ThreadChannel.
         * @type {ChannelMessageManager}
         */
        this.messages = new ChannelMessageManager_1.ChannelMessageManager(this, this.client);
    }
    /**
     * Edits the ThreadChannel
     * @param {object} obj - The new ThreadChannel Object
     * @returns {Promise<ThreadChannel>}
     * @async
     */
    async edit(obj) {
        const thread = {
            name: this.name,
            archived: false,
            auto_archive_duration: 1440,
            locked: false,
            invitable: true,
            rate_limit_per_user: 0,
            flags: 0,
            applied_tags: [],
        };
        const data = (0, utils_1.setObj)(thread, obj, {
            applied_tags: "tags",
            rate_limit_per_user: ["cooldown", "rateLimitPerUser"],
            auto_archive_duration: ["autoArchiveDuration"],
        });
        const response = await this.client.rest.request("PATCH", Endpoints.Channel(this.id), true, { data });
        if (!response)
            return null;
        return response?.error
            ? response
            : (0, utils_1.typeChannel)(response.data, this.client);
    }
    async leave() {
        const response = await this.client.rest.request("DELETE", Endpoints.ChannelThreadMember(this.id, "@me"), true);
        return response?.error ? response : true;
    }
    async archivedThreads(config) {
        config = (0, utils_1.setObj)({ before: null, limit: 5, type: "public" }, config);
        // let endpoint = Endpoints.ChannelThreadsArchived(this.id, config.type);
        // if (config.before) {
        //   // @ts-ignore
        //   endpoint = +`?before=${config.before}`;
        // }
        // if (config.limit) {
        //   endpoint = +config.before
        //     ? `&limit=${config.limit}`
        //     : `?limit=${config.limit}`;
        // }
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
        var result = await this.client.rest.request("POST", Endpoints.ChannelMessages(this.id), true, { data: message.payload }, null, message.files);
        if (!result)
            return;
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
exports.ThreadChannel = ThreadChannel;
