const { setObj, typeChannel, getAllStamps } = require("../Utils/utils");
const { Channel } = require("./DefaultChannel");
const Endpoints = require("../REST/Endpoints");
const { ThreadMemberManager } = require("./Managers/ThreadMemberManager");
const { ChannelMessageManager } = require("./Managers/ChannelMessageManager");
const { MessagePayload } = require("./Payloads/MessagePayload");

class ThreadChannel extends Channel {
    #client;
    /**
     * Represents a ThreadChannel
     * @param {object} data - The ThreadChannel payload
     * @param {Client} client - The Client
     */
    constructor(data, client) {
        super(data, client)
        this.#client = client;
        /**
         * The Guild
         * @type {Guild}
         */
        this.guild = data.guild
        /**
         * The message count of the thread (stops when reaches 50 messages)
         * @type {number}
         */
        this.messageCount = data.total_message_sent
        /**
         * If the ThreadChannel is locked
         * @type {boolean | undefined}
         */
        this.locked = data.thread_metadata?.locked
        /**
         * The time information when the ThreadChannel was created
         * @type {object}
         */
        this.created = getAllStamps(data.thread_metadata?.create_timestamp)
        /**
         * The auto archive dration of the ThreadChannel in seconds.
         * @type {number}
         */
        this.autoArchiveDuration = data.thread_metadata?.auto_archive_duration
        /**
         * If the ThreadChannel is archived
         * @type {boolean}
         */
        this.archived = data.thread_metadata.archived
        /**
         * The time information when the ThreadChannel was archived (only if the ThreadChannel is archived)
         * @type {object | undefined}
         */
        this.archiveStamp = getAllStamps(data.thread_metadata?.archive_timestamp)
        /**
         * The cooldown of the ThreadChannel in seconds.
         * @type {string | undefined}
         */
        this.rateLimitPerUser = data.rate_limit_per_user
        /**
         * The Channel Id where the ThreadChannel was created.
         * @type {number}
         */
        this.channelId = data.parent_id
        if(this.#client.channels.cache.get(this.channelId)) {
            /**
             * The Channel where the ThreadChannel was created.
             * @type {ForumChannel | TextChannel | VoiceChannel | undefined}
             */
            this.channel = this.#client.channels.cache.get(this.channelId)
        }
        /**
         * The owner id of the ThreadChannel (The owner id means the creator of the ThreadChannel)
         * @type {number}
         */
        this.ownerId = data.owner_id
        if(this.guild?.members?.cache?.get(this.ownerId)) {
            /**
             * The owner of the ThreadChannel (The owner means the creator of the ThreadChannel)
             * @type {Member | undefined}
             */
            this.ownerId = this.guild.members.cache.get(this.ownerId)
        }
        /**
         * The ThreadMemberManager of the ThreadChannel.
         * @type {ThreadMemberManager}
         */
        this.members = new ThreadMemberManager(this.#client, this)
        /**
         * The ChannelMessageManager of the ThreadChannel.
         * @type {ChannelMessageManager}
         */
        this.messages = new ChannelMessageManager(this, this.#client)
    }

    /**
     * Edits the ThreadChannel
     * @param {object} obj - The new ThreadChannel Object 
     * @returns {ThreadChannel}
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
     * @returns {Message | object}
     */

    async createMessage(obj) {
        const message = new MessagePayload(obj, obj.files)

        var result = await this.#client.rest.request("POST", Endpoints.ChannelMessages(this.id), true, { data: message.payload }, null, message.files)
        
        if (!result.error) {
            result.data = {...result.data, guild: this.guild, member: this.guild.members.cache.get(result.data.author.id) }

            var x = new Message(result.data, this.#client)
        } else {
            var x = result
        }

        return x
    }
}

module.exports = { ThreadChannel }