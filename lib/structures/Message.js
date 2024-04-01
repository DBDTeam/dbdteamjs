"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const Endpoints_js_1 = __importDefault(require("../rest/Endpoints.js"));
const Collection_1 = require("../utils/Collection");
const utils_1 = require("../utils/utils");
const Base_1 = require("./Base");
const ReactionMessage_1 = require("./Managers/ReactionMessage");
const Member_js_1 = require("./Member.js");
const EditMessagePayload_1 = require("./Payloads/EditMessagePayload");
const MessagePayload_1 = require("./Payloads/MessagePayload");
const User_1 = require("./User");
/**
 * Represents a Discord message
 */
class Message extends Base_1.Base {
    justUser;
    type;
    channelId;
    guildId;
    author;
    user;
    content;
    mentions;
    channel;
    guild;
    member;
    reactions;
    tts;
    flags;
    sended;
    embeds;
    attachments;
    stickers;
    pinned;
    webhookId;
    thread;
    data;
    constructor(data, client) {
        super(client);
        this.data = data;
        this.justUser = data.author || data.user;
        /**
         * @type {string}
         * Represents the ID of the Message
         */
        this.id = data.id;
        /**
         * The type of the message.
         * @type {string}
         */
        this.type = data.type;
        /**
         * The channel id of where the message was sent
         * @type {string}
         */
        this.channelId = data.channel_id;
        /**
         * The guild id of where the message was sent
         * @type {string}
         */
        this.guildId =
            data.guild_id ||
                data.guild?.id ||
                this.client.channels.cache.get(this.channelId).guild?.id;
        /**
         * The author of the message.
         * @type {User}
         */
        this.author = this._user;
        /**
         * The author of the message
         * @type {User}
         */
        this.user = this._user;
        /**
         * The content of the message.
         * @type {string}
         */
        this.content = data.content;
        /**
         * The mentions of the message.
         * @type {object|undefined}
         */
        this.mentions = {
            users: new Collection_1.Collection(),
            roles: new Collection_1.Collection(),
            channels: new Collection_1.Collection(),
        };
        /**
         * Represents the current channel
         * @type {TextChannel|VoiceChannel|ThreadChannel|DefaultChannel}
         */
        this.channel = this.client.channels.cache.get(this.channelId);
        /**
         * Represents the current guild
         * @type {Guild}
         */
        this.guild =
            this.client.guilds.cache.get(this.guildId) ||
                this.client.channels.cache.get(this.channelId)?.guild;
        /**
         * Represents the member
         * @type {Member}
         */
        this.member = this.guild.members.cache.get(this.user.id);
        /**
         * Represents the reactions of the message
         * @type {MessageReactions}
         */
        this.reactions = new ReactionMessage_1.MessageReactions(this.client, this, data.reactions || []);
        /**
         * If the message was sended with TTS
         * @type {boolean}
         */
        this.tts = data.tts;
        /**
         * The message flags
         * @type {number}
         */
        this.flags = data.flags;
        /**
         * The Date, unix and timestamp of when the message was sent
         * @type {object}
         */
        this.sended = (0, utils_1.getAllStamps)(this.getCreatedAt);
        /**
         * The embeds of the message (if any)
         * @type {object}
         */
        this.embeds = data.embeds;
        /**
         * The attachments of the message (if any)
         * @type {Collection}
         */
        this.attachments = data.attachments;
        /**
         * The stickers of the message (if any)
         * @type {Collection}
         */
        this.stickers = new Collection_1.Collection();
        /**
         * The nonce of the message
         * @type {number}
         * @readonly
         */
        readOnly(this, "nonce", data.nonce);
        /**
         * If the message is pinned
         * @type {boolean}
         */
        this.pinned = data.pinned;
        this._patch(data);
    }
    getCreatedAt(getCreatedAt) {
        throw new Error("Method not implemented.");
    }
    _patch(data) {
        if (!this.member) {
            this.member = new Member_js_1.Member({ ...data.member, id: this.user.id }, this.guild, this.client);
        }
        if ("webhook_id" in data) {
            /**
             * The webhook id of the message (if any)
             * @type {string|undefined}
             */
            this.webhookId = data.webhook_id;
        }
        if ("thread" in data) {
            /**
             * The thread where the message was sent. (if any)
             * @type {object|undefined}
             */
            this.thread = data.thread;
        }
        for (var i of data?.mentions) {
            this.mentions.users.set(i.id, new User_1.User(i, this.client));
        }
        for (var i of data?.mention_roles) {
            this.mentions.roles.set(i.id, i);
        }
        if ("mentions_channels" in data) {
            for (var i of data?.mention_channels) {
                this.mentions.channels.set(i.id, i);
            }
        }
        if ("stickers" in data) {
            for (var i of data?.stickers) {
                this.stickers.set(i.id, i);
            }
        }
    }
    /**
     *
     * @param {object} obj - Send a message in the channel
     * @example
     * <Message>.reply({
     *  content: `Hello!`,
     *  mentions: { repliedUser: false }
     * })
     * @returns {Promise<Message>}
     */
    async reply(obj) {
        const message = new MessagePayload_1.MessagePayload(obj, obj?.files);
        var result = await this.client.rest.request("POST", Endpoints_js_1.default.ChannelMessages(this.channelId), true, { data: message.payload }, null, message.files);
        if (!result.error) {
            result.data = {
                ...result.data,
                guild: this.guild,
                member: this.guild.members.cache.get(result.data.author.id),
            };
            return new Message(result.data, this.client);
        }
        else {
            return result;
        }
    }
    /**
     *
     * @param {object} obj - Edits the message (Only if the message author is the client)
     * @example
     * <Message>.edit({
     *  content: "This is the content of the new message"
     * })
     * @returns {Promise<Message>}
     */
    async edit(obj) {
        const message = new EditMessagePayload_1.EditMessagePayload(obj, obj.files);
        var result = await this.client.rest.request("PATCH", Endpoints_js_1.default.ChannelMessage(this.channelId, this.id), true, { data: message.payload }, null, message.files);
        if (!result.error) {
            result.data = {
                ...result.data,
                guild: this.guild,
                member: this.guild.members.cache.get(result.data.author.id),
            };
            return new Message(result.data, this.client);
        }
        else {
            return result;
        }
    }
    /**
     * Remove the embeds of the message
     * @returns {Promise<Message>}
     */
    async removeEmbeds() {
        var result = await this.client.rest.request("PATCH", Endpoints_js_1.default.ChannelMessage(this.channelId, this.id), true, { data: { flags: 4 } });
        if (!result.error) {
            result.data = {
                ...result.data,
                guild: this.guild,
                member: this.guild.members.cache.get(result.data.author.id),
            };
            return new Message(result.data, this.client);
        }
        else {
            return result;
        }
    }
    /**
     * Deletes the message
     * @returns {Promise<Message>}
     */
    async delete() {
        var result = await this.client.rest.request("DELETE", Endpoints_js_1.default.ChannelMessage(this.channelId, this.id), true);
        return result;
    }
    get _user() {
        if (this.webhookId) {
            return this.data.user;
        }
        else {
            var x = new User_1.User(this.justUser, this.client);
            this.client.users.cache.set(x.id, x);
            return x;
        }
    }
    async _getChannel(channelId) {
        var channel = await this.client.rest.request("GET", Endpoints_js_1.default.Channel(channelId), true);
        if (!channel?.error) {
            channel.guild = this.guild;
            channel = (0, utils_1.typeChannel)(channel.data, this.client);
            this.client.channels.cache.set(channel.id, channel);
            this.guild.channels.cache.set(channel.id, channel);
            return channel;
        }
        else {
            return null;
        }
    }
}
exports.Message = Message;
