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
exports.Message = void 0;
const Endpoints = __importStar(require("../rest/Endpoints"));
const Collection_1 = require("../utils/Collection");
const utils_1 = require("../utils/utils");
const Base_1 = require("./Base");
const ReactionMessage_1 = require("./Managers/ReactionMessage");
const Member_1 = require("./Member");
const EditMessagePayload_1 = require("./Payloads/EditMessagePayload");
const MessagePayload_1 = require("./Payloads/MessagePayload");
const User_1 = require("./User");
/**
 * Represents a Discord message.
 */
class Message extends Base_1.Base {
    data;
    /**
     * The client associated with the message.
     * @type {Client}
     */
    client;
    /**
     * The ID of the message.
     * @type {string}
     */
    id;
    /**
     * The ID of the guild where the message was sent.
     * @type {string | undefined}
     */
    guildId;
    /**
     * The author of the message.
     * @type {User}
     */
    author;
    /**
     * The user associated with the message.
     * @type {User}
     */
    user;
    /**
     * The member object associated with the message.
     * @type {Member | undefined}
     */
    member;
    /**
     * Mentions in the message.
     * @type {{
     *   roles: Collection<string, string>;
     *   channels: Collection<string, APIChannelMention>;
     *   users: Collection<string, Member | User>;
     * }}
     */
    mentions;
    /**
     * A nonce that can be used for optimistic message sending.
     * @type {unknown}
     */
    nonce;
    /**
     * The type of the message.
     * @type {number}
     */
    type;
    /**
     * The ID of the channel where the message was sent.
     * @type {string}
     */
    channelId;
    /**
     * The content of the message.
     * @type {string}
     */
    content;
    /**
     * The channel where the message was sent.
     * @type {(Channel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel | undefined)}
     */
    channel;
    /**
     * The guild where the message was sent.
     * @type {(Guild | undefined)}
     */
    guild;
    /**
     * Reactions associated with the message.
     * @type {MessageReactions}
     */
    reactions;
    /**
     * Whether the message was text-to-speech.
     * @type {boolean}
     */
    tts;
    /**
     * Flags of the message.
     * @type {number}
     */
    flags;
    /**
     * Information about when the message was sent.
     * @type {{ stamp: number; unix: number; date: Date }}
     */
    sended;
    /**
     * Embeds in the message.
     * @type {unknown[]}
     */
    embeds;
    /**
     * Attachments in the message.
     * @type {unknown[]}
     */
    attachments;
    /**
     * Stickers attached to the message.
     * @type {Collection<string, unknown>}
     */
    stickers;
    /**
     * Whether the message is pinned.
     * @type {boolean}
     */
    pinned;
    /**
     * The ID of the webhook that sent the message.
     * @type {string | undefined}
     */
    webhookId;
    /**
     * Information about the associated thread.
     * @type {any}
     */
    thread;
    /**
     * Creates an instance of Message.
     * @param {APIMessage} data - The data of the message.
     * @param {Client} client - The client.
     */
    constructor(data, client) {
        super(client);
        this.data = data;
        this.data = data;
        this.client = client;
        this.id = data.id;
        this.type = data.type || 0;
        this.channelId = data.channel_id;
        this.author = this._user;
        this.user = this._user;
        this.content = data.content;
        this.mentions = {
            users: new Collection_1.Collection(),
            roles: new Collection_1.Collection(),
            channels: new Collection_1.Collection(),
        };
        this.channel = this.client.channels.cache.get(this.channelId);
        this.guild =
            this.client.guilds.cache.get(this.guildId) ||
                this.client.channels.cache.get(this.channelId)?.guild;
        this.member = this.guild?.members?.cache.get(this.user.id);
        this.reactions = new ReactionMessage_1.MessageReactions(this.client, this, data.reactions || []);
        this.tts = data.tts;
        this.flags = data.flags || 0;
        this.sended = (0, utils_1.getAllStamps)(this);
        this.embeds = data.embeds || [];
        this.attachments = data.attachments || [];
        this.stickers = new Collection_1.Collection();
        this.nonce = data.nonce || 0;
        this.pinned = data.pinned;
        this.patch(data);
    }
    /**
     * Patches the message data.
     * @param {APIMessage} data - The data of the message.
     */
    patch(data) {
        if ("member" in data && data.member) {
            this.member = new Member_1.Member({ ...data.member, id: this.user.id }, this.guild, this.client);
        }
        if ("guild_id" in data) {
            this.guildId =
                data.guild_id ||
                    (this.guild && this.guild.id) ||
                    this.client.channels.cache.get(this.channelId)?.guild?.id;
        }
        if ("webhook_id" in data) {
            this.webhookId = data.webhook_id;
        }
        for (const i of data?.mentions || []) {
            if ("member" in i) {
                this.mentions.users.set(i.id, new User_1.User(i.member, this.client));
            }
            else {
                this.mentions.users.set(i.id, new User_1.User(i, this.client));
            }
        }
        for (const i of data?.mention_roles || []) {
            this.mentions.roles.set(i, i);
        }
        if (data?.mention_channels) {
            for (const i of data.mention_channels) {
                this.mentions.channels.set(i.id, i);
            }
        }
        if (data?.sticker_items) {
            for (const i of data.sticker_items) {
                this.stickers.set(i.id, i);
            }
        }
    }
    /**
     * Replies to the message.
     * @param {MessagePayloadData | string} obj - The message payload or content.
     * @returns {Promise<Message | null>} A promise that resolves to the sent message, or null if failed.
     */
    async reply(obj) {
        let message;
        if (typeof obj === "string") {
            message = new MessagePayload_1.MessagePayload(obj);
        }
        else {
            message = new MessagePayload_1.MessagePayload(obj);
        }
        const result = await this.client.rest.request("POST", Endpoints.ChannelMessages(this.channelId), true, { data: message.payload }, null, message.files);
        if (!result)
            return null;
        if (!result.error && result.data) {
            const data = {
                ...result.data,
                guild: this.guild,
                member: this.guild?.members?.cache.get(result.data.author.id),
            };
            return new Message(data, this.client);
        }
        else {
            return null;
        }
    }
    /**
     * Edits the message.
     * @param {EditMessagePayload | string} obj - The edit message payload or content.
     * @returns {Promise<Message | undefined>} A promise that resolves to the edited message, or undefined if failed.
     */
    async edit(obj) {
        let message;
        if (typeof obj === "string") {
            message = new EditMessagePayload_1.EditMessagePayload(obj);
        }
        else {
            message = new EditMessagePayload_1.EditMessagePayload(obj);
        }
        const result = await this.client.rest.request("PATCH", Endpoints.ChannelMessage(this.channelId, this.id), true, { data: message.payload }, null, message.files);
        if (!result)
            return;
        if (!result.error && result.data) {
            const data = {
                ...result.data,
                guild: this.guild,
                member: this.guild?.members?.cache.get(result.data.author.id),
            };
            return new Message(data, this.client);
        }
        else {
            return undefined;
        }
    }
    /**
     * Removes all embeds from the message.
     * @returns {Promise<Message | undefined>} A promise that resolves to the updated message, or undefined if failed.
     */
    async removeEmbeds() {
        const result = await this.client.rest.request("PATCH", Endpoints.ChannelMessage(this.channelId, this.id), true, { data: { flags: 4 } });
        if (!result)
            return;
        if (!result.error && result.data) {
            const data = {
                ...result.data,
                guild: this.guild,
                member: this.guild?.members?.cache.get(result.data.author.id),
            };
            return new Message(data, this.client);
        }
        else {
            return undefined;
        }
    }
    /**
     * Deletes the message.
     * @returns {Promise<void>} A promise that resolves once the message is deleted.
     */
    async delete() {
        await this.client.rest.request("DELETE", Endpoints.ChannelMessage(this.channelId, this.id), true);
    }
    /**
     * Gets the user associated with the message.
     * @returns {User} The user associated with the message.
     */
    get _user() {
        if (this.webhookId && "user" in this.data) {
            return this.data.user;
        }
        else {
            const x = new User_1.User(this.data.author, this.client);
            this.client.users.cache.set(x.id, x);
            return x;
        }
    }
    /**
     * Gets the channel by its ID.
     * @param {string} channelId - The ID of the channel.
     * @returns {Promise<Channel | null>} A promise that resolves to the channel, or null if not found.
     */
    async _getChannel(channelId) {
        const result = await this.client.rest.request("GET", Endpoints.Channel(channelId), true);
        if (!result?.error || result) {
            let channel = result;
            if (this.guild)
                channel.guild = this.guild;
            channel = (0, utils_1.typeChannel)(channel.data, this.client);
            this.client.channels.cache.set(channel.id, channel);
            this.guild?.channels.cache.set(channel.id, channel);
            return channel;
        }
        else {
            return null;
        }
    }
}
exports.Message = Message;
