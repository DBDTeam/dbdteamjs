const { setObj, typeChannel, getAllStamps } = require("../Utils/utils");
const { Channel } = require("./DefaultChannel");
const Endpoints = require("../REST/Endpoints");
const { ThreadMemberManager } = require("./Managers/ThreadMemberManager");

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
    } /*{
        type: 11,
        total_message_sent: 98,
        thread_metadata: {
          locked: false,
          create_timestamp: '2024-03-01T22:51:12.188000+00:00',
          auto_archive_duration: 4320,
          archived: false,
          archive_timestamp: '2024-03-01T22:51:12.188000+00:00'
        },
        rate_limit_per_user: 0,
        parent_id: '766497696604487691',
        owner_id: '738824089128665118',
        name: 'qwe',
        message_count: 97,
        member_count: 4,
        last_message_id: '1213272648994267206',
        id: '1213257240459350026',
        guild_id: '759558437088264202',
        flags: 0
      }*/

    async edit(obj) {
        const thread = {
            name: this.name,
            archived: false,
            auto_archive_duration: 1440,
            locked: false,
            invitable: true,
            rate_limit_per_user: 60,
            flags: 0,
            applied_tags: []
        };

        const data = setObj(thread, obj)

        const response = await this.#client.rest.request("PATCH", Endpoints.CHANNEL(this.id), true, { data })

        return response?.error ? response : new typeChannel(response.data, this.#client)
    } 

    async leave() {
        const response = await this.#client.rest.request("DELETE", `/channels/${this.id}/thread-members/@me`, true)

        return response?.error ? response : true
    }
}

module.exports = { ThreadChannel }