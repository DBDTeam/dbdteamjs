const { Base } = require("./Base.js");
const Endpoints = require("../REST/Endpoints.js")
const { typeChannel, setObj } = require("../Utils/utils.js");
const { ChannelPermissionManager } = require("./Managers/ChannelPermissionManager.js");

class DefaultChannel extends Base {
    #client;
    #data;
    constructor(data, client) {
        super(data.id)
        this.#data = data
        this.#client = client
        this.id = data.id;
        this.type = data.type;
        this.name = data.name;
        this.guild = data.guild;
        this.guildId = data.guild_id || data.guild.id;
        this.flags = this.flags
        this.permissions = new ChannelPermissionManager(data.permission_overwrites || [], this, client)
    }

    /*___patch(data) {
        //MEDIA OR FORUM
        //this.topic = data.topic;
        //this.lastMessageId = data.lastMessageId;
        this.avaibleTags = data.avaible_tags
        this.appliedTags = data.applied_tags
        this.defaultReactionEmoji = data.default_reaction_emoji
        this.defaultSortOrder = data.default_sort_order
        this.defaultForumLayout = data.default_forum_layout
    } 
    This thing will help me later
    */

    async clone() {
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
            default_thread_rate_limit_per_user: null
        };

        const data = setObj(channelObj, obj, {
            parent_id: "parent",
            permission_overwrites: "permissions",
            rtc_region: "rtc",
            video_quality_mode: "videoQuality",
            default_auto_archive_duration: "defaultAutoArchiveDuration",
            default_reaction_emoji: "defaultReactionEmoji"
        })

        var result = await this.#client.rest.request("POST", Endpoints.GUILD_CHANNELS(this.guildId), true, { data })

        return result?.error ? result : typeChannel(result.data, this.#client)
    }

    async edit(obj) {
        const reason = obj.reason || null
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
            default_thread_rate_limit_per_user: this.default_thread_rate_limit_per_user
        };

        const data = setObj(channelObj, obj, {
            parent_id: "parent",
            permission_overwrites: "permissions",
            rtc_region: "rtc",
            video_quality_mode: "videoQuality",
            default_auto_archive_duration: "defaultAutoArchiveDuration",
            default_reaction_emoji: "defaultReactionEmoji"
        })

        var result = await this.#client.rest.request("PATCH", Endpoints.CHANNEL(this.id), true, { data }, null, reason)

        return result?.error ? result : typeChannel(result.data, this.#client)
    }

    async delete(reason) {
        var result = await this.#client.rest.request("DELETE", Endpoints.CHANNEL(this.id), true,{}, null, reason?.trim() || null)

        return result?.error ? false : true
    }
    toString() {
        return `<#${this.id}>`
    }
}


module.exports = { Channel: DefaultChannel };