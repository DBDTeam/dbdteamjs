const { setObj, typeChannel, getAllStamps } = require("../Utils/utils");
const { Channel } = require("./DefaultChannel");
const Endpoints = require("../REST/Endpoints");
const { ThreadMemberManager } = require("./Managers/ThreadMemberManager");
const { ChannelMessageManager } = require("./Managers/ChannelMessageManager");

class ThreadChannel extends Channel {
    #client;
    constructor(data, client) {
        super(data, client)
        this.#client = client;
        this.guild = data.guild
        this.messageCount = data.total_message_sent
        this.locked = data.thread_metadata?.locked
        this.created = getAllStamps(data.thread_metadata?.create_timestamp)
        this.autoArchiveDuration = data.thread_metadata?.auto_archive_duration
        this.archived = data.thread_metadata.archived
        this.archiveStamp = getAllStamps(data.thread_metadata?.archive_timestamp)
        this.rateLimitPerUser = data.rate_limit_per_user
        this.channelId = data.parent_id
        if(this.#client.channels.cache.get(this.channelId)) {
            this.channel = this.#client.channels.cache.get(this.channelId)
        }
        this.ownerId = data.owner_id
        if(this.guild?.members?.cache?.get(this.ownerId)) {
            this.ownerId = this.guild.members.cache.get(this.ownerId)
        }
        this.members = new ThreadMemberManager(this.#client, this)
        this.messages = new ChannelMessageManager(this, this.#client)
    }

    async edit(obj) {
        const thread = {
            name: this.name,
            archived: false,
            auto_archive_duration: 1440,
            locked: false,
            invitable: true,
            rate_limit_per_user: 0,
            flags: 0,
            applied_tags: []
        };

        const data = setObj(thread, obj, {
            applied_tags: "tags",
            rate_limit_per_user: ["cooldown", "rateLimitPerUser"],
            auto_archive_duration: ["autoArchiveDuration"]
        })

        const response = await this.#client.rest.request("PATCH", Endpoints.CHANNEL(this.id), true, { data })

        return response?.error ? response : new typeChannel(response.data, this.#client)
    } 

    async leave() {
        const response = await this.#client.rest.request("DELETE", Endpoints.ChannelThreadMember(this.id, "@me"), true)

        return response?.error ? response : true
    }

    async archivedThreads(config) {
        config = setObj({ before: null, limit: 5 }, config)

        var endpoint = Endpoints.ChannelThreadsArchived(this.id)

        if(config.before){
            endpoint =+ `?before=${config.before}`
        }
        if(config.limit){
            endpoint =+ config.before ? `&limit=${config.limit}` : `?limit=${config.limit}`
        }
    }
}

module.exports = { ThreadChannel }