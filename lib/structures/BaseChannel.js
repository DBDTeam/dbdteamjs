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
exports.Channel = void 0;
const Endpoints = __importStar(require("../rest/Endpoints"));
const utils_1 = require("../utils/utils");
const Base_1 = require("./Base");
const ChannelPermissionManager_1 = require("./Managers/ChannelPermissionManager");
const ChannelTypes_1 = require("../types/ChannelTypes");
/**
 * Represents a BaseChannel (for easier usage)
 * @param {object} data - The Channel payload
 * @param {Client} client - The Client
 *
 * @extends {Base}
 */
class Channel extends Base_1.Base {
    data;
    /**
     * The client associated with the channel.
     * @type {Client}
     */
    client;
    /**
     * The ID of the channel.
     * @type {Snowflake}
     */
    id;
    /**
     * The type of the channel.
     * @type {ChannelType}
     */
    type;
    /**
     * The name of the channel.
     * @type {Nullable<string>}
     */
    name;
    /**
     * The topic of the channel.
     * @type {Nullable<string>}
     */
    topic;
    /**
     * The bitrate of the channel.
     * @type {Nullable<number>}
     */
    bitrate;
    /**
     * The user limit of the channel.
     * @type {Nullable<number>}
     */
    user_limit;
    /**
     * The rate limit per user of the channel.
     * @type {Nullable<number>}
     */
    rate_limit_per_user;
    /**
     * The position of the channel.
     * @type {number}
     */
    position;
    /**
     * The permission overwrites of the channel.
     * @type {APIOverwrite[]}
     */
    permission_overwrites;
    /**
     * The parent ID of the channel.
     * @type {Nullable<Snowflake>}
     */
    parent_id;
    /**
     * Indicates whether the channel is NSFW.
     * @type {Nullable<boolean>}
     */
    nsfw;
    /**
     * The RTC region of the channel.
     * @type {Nullable<string>}
     */
    rtc_region;
    /**
     * The video quality mode of the channel.
     * @type {Nullable<VideoQualityMode>}
     */
    video_quality_mode;
    /**
     * The default auto archive duration of the channel.
     * @type {Nullable<number>}
     */
    default_auto_archive_duration;
    /**
     * The ID of the guild where the channel is located.
     * @type {Snowflake}
     */
    guildId;
    /**
     * The flags of the channel.
     * @type {number}
     */
    flags;
    /**
     * The permissions manager of the channel.
     * @type {ChannelPermissionManager}
     */
    permissions;
    /**
     * The default reaction emoji of the channel.
     * @type {any}
     */
    default_reaction_emoji;
    /**
     * The available tags of the channel.
     * @type {any}
     */
    available_tags;
    /**
     * The default sort order of the channel.
     * @type {any}
     */
    default_sort_order;
    /**
     * The default forum layout of the channel.
     * @type {any}
     */
    default_forum_layout;
    /**
     * The default thread rate limit per user of the channel.
     * @type {any}
     */
    default_thread_rate_limit_per_user;
    /**
     * Creates an instance of BaseChannel.
     * @param {APIChannel} data - The channel payload.
     * @param {Client} client - The client.
     */
    constructor(data, client) {
        super(data.id);
        this.data = data;
        this.data = data;
        this.client = client;
        this.id = data.id;
        this.type = data.type;
        this.name = data.name;
        this.patch(data);
    }
    patch(data) {
        this.id = data.id;
        this.type = data.type;
        this.name = data.name;
        if ("position" in data) {
            this.position = data.position;
        }
        if ("permission_overwrites" in data) {
            this.permission_overwrites = data.permission_overwrites;
        }
        if ("parent_id" in data) {
            this.parent_id = data.parent_id;
        }
        if ("nsfw" in data) {
            this.nsfw = data.nsfw;
        }
        if ("rtc_region" in data) {
            this.rtc_region = data.rtc_region;
        }
        if ("video_quality_mode" in data) {
            this.video_quality_mode = data.video_quality_mode;
        }
        if ("default_auto_archive_duration" in data) {
            this.default_auto_archive_duration = data.default_auto_archive_duration;
        }
        if ("guild_id" in data) {
            this.guildId = data.guild_id;
        }
        if ("flags" in data) {
            this.flags = data.flags;
        }
        if ("permission_overwrites" in data) {
            this.permissions = new ChannelPermissionManager_1.ChannelPermissionManager(data.permission_overwrites || [], this.id, this.client);
        }
        if ("topic" in data) {
            this.topic = data.topic;
        }
        if ("bitrate" in data) {
            this.bitrate = data.bitrate;
        }
        if ("user_limit" in data) {
            this.user_limit = data.user_limit;
        }
        if ("rate_limit_per_user" in data) {
            this.rate_limit_per_user = data.rate_limit_per_user;
        }
    }
    /**
     * The guild where the channel is located.
     * @type {Guild}
     */
    get guild() {
        if (!this.guildId)
            return;
        return this.client.guilds.cache.get(this.guildId);
    }
    /**
     * Clones the channel
     * @returns {Promise<DefaultChannel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel>}
     * @async
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     * channel.clone().then((result) => {
     *  if(result?.error){
     *      console.log(`Error :()`)
     *  } else {
     *      console.log(`Channel cloned successfully`)
     *  }
     * })
     */
    async clone(obj) {
        const channelObj = {
            name: null,
            type: null,
            topic: null,
            bitrate: null,
            user_limit: null,
            rate_limit_per_user: null,
            position: null,
            permission_overwrites: null,
            parent_id: null,
            nsfw: null,
            rtc_region: null,
            video_quality_mode: null,
            default_auto_archive_duration: null,
            default_reaction_emoji: null,
            available_tags: null,
            default_sort_order: null,
            default_forum_layout: null,
            default_thread_rate_limit_per_user: null,
        };
        const data = (0, utils_1.setObj)(channelObj, obj, {
            parent_id: "parent",
            permission_overwrites: "permissions",
            rtc_region: "rtc",
            video_quality_mode: "videoQuality",
            default_auto_archive_duration: "defaultAutoArchiveDuration",
            default_reaction_emoji: "defaultReactionEmoji",
        });
        if (!this.guildId)
            return null;
        var result = await this.client.rest.request("POST", Endpoints.GuildChannels(this.guildId), true, { data });
        if (!result || !result?.data)
            return null;
        return result?.error
            ? result
            : (0, utils_1.typeChannel)(result.data, this.client);
    }
    /**
     *
     * @param {object} obj - The Channel Edit payload
     * @returns {Promise<DefaultChannel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel>}
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     * channel.edit({ name: "hello" }).then((result) => {
     *  if(result?.error){
     *      console.log(`Error :()`)
     *  } else {
     *      console.log(`Channel edited successfully`)
     *  }
     * })
     * @async
     */
    async edit(obj, reason) {
        const channelObj = {
            name: this.name,
            topic: this.topic,
            bitrate: this.bitrate,
            user_limit: this.user_limit,
            rate_limit_per_user: this.rate_limit_per_user,
            position: this.position,
            permission_overwrites: this.permission_overwrites,
            parent_id: this.parent_id,
            nsfw: this.nsfw,
            rtc_region: this.rtc_region,
            video_quality_mode: this.video_quality_mode,
            default_auto_archive_duration: this.default_auto_archive_duration,
            default_reaction_emoji: this.default_reaction_emoji,
            available_tags: this.available_tags,
            default_sort_order: this.default_sort_order,
            default_forum_layout: this.default_forum_layout,
            default_thread_rate_limit_per_user: this.default_thread_rate_limit_per_user,
        };
        const data = (0, utils_1.setObj)(channelObj, obj, {
            parent_id: "parent",
            permission_overwrites: "permissions",
            rtc_region: "rtc",
            video_quality_mode: "videoQuality",
            default_auto_archive_duration: "defaultAutoArchiveDuration",
            default_reaction_emoji: "defaultReactionEmoji",
        });
        var result = await this.client.rest.request("PATCH", Endpoints.Channel(this.id), true, { data }, reason);
        if (!result || !result?.data)
            return null;
        return result?.error
            ? result
            : (0, utils_1.typeChannel)(result.data, this.client);
    }
    /**
     * Deletes the Channel
     * @param {string} reason - The reason
     * @returns {Promise<boolean>}
     */
    async delete(reason) {
        var result = await this.client.rest.request("DELETE", Endpoints.Channel(this.id), true, {}, reason?.trim() || null);
        return result?.error ? false : true;
    }
    /**
     * Returns the mention of the channel
     * @returns {string}
     * @example
     * const channel = client.channels.cache.get("1234567890123456")
     * channel.send(`Im sending this message in ${channel.toString()}`)
     */
    toString() {
        return `<#${this.id}>`;
    }
    isTextBased() {
        return [ChannelTypes_1.ChannelTypes.Text, ChannelTypes_1.ChannelTypes.Voice, ChannelTypes_1.ChannelTypes.PublicThread, ChannelTypes_1.ChannelTypes.PrivateThread].includes(this.type);
    }
}
exports.Channel = Channel;
