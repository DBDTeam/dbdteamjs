const { Base } = require("./Base.js")
const { User } = require("./User.js")
const {Collection} = require("../Utils/Collection.js")
const Endpoints = require("../REST/Endpoints.js")
const { MessageReactions } = require("./Managers/ReactionMessage.js")
const { Member } = require("./Member.js")
const { readOnly, typeChannel, getAllStamps } = require("../Utils/utils.js")
const { MessagePayload } = require("./Payloads/MessagePayload.js")
const { EditMessagePayload } = require("./Payloads/EditMessagePayload.js")

class Message extends Base {
    #justUser;
    #client
    #data;
    /**
   * Represents a Discord Message
   * @param {MessagePayload} data - The message payload
   * @param {Client} client - The Client
   */
    constructor(data, client){
        super(data.id)
        this.#client = client
        this.#data = data
        this.#justUser = data.author || data.user
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
        this.guildId = data.guild_id || data.guild?.id || this.#client.channels.cache.get(this.channelId).guild?.id;
        /**
         * The author of the message.
         * @type {User}
        */
        this.author = this.user;
        /**
         * The content of the message.
         * @type {User}
        */
        this.content = data.content;
        /**
         * The mentions of the message.
         * @type {object|undefined}
        */
        this.mentions = { users: new Collection(), roles: new Collection(), channels: new Collection() }
        /**
         * Represents the current channel
         * @type {TextChannel|VoiceChannel|ThreadChannel|Channel}
        */
        this.channel = this.#client.channels.cache.get(this.channelId)
        /**
         * Represents the current guild
         * @type {Guild}
         */
        this.guild = this.#client.guilds.cache.get(this.guildId) || this.#client.channels.cache.get(this.channelId)?.guild
        /**
         * Represents the member
         * @type {Member}
         */
        this.member = this.guild.members.cache.get(this.user.id)
        /**
         * Represents the reactions of the message
         * @type {MessageReactions}
         */
        this.reactions = new MessageReactions(this.#client, this, data.reactions || [])
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
        this.sended = getAllStamps(this.getCreatedAt)
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
        this.stickers = new Collection();
        /**
         * The nonce of the message
         * @type {number}
         * @readonly
         */
        readOnly(this, 'nonce', data.nonce)
        /**
         * If the message is pinned
         * @type {boolean}
         */
        this.pinned = data.pinned;
        this._patch(data);
    }

    _patch(data) {
        if(!this.member) {
            this.member = new Member({...data.member, id: this.user.id}, this.guild, this.#client)
        }
        if('webhook_id' in data){
            /**
             * The webhook id of the message (if any)
             * @type {string|undefined}
             */
            this.webhookId = data.webhook_id;
        }

        if('thread' in data){
            /**
             * The thread where the message was sent. (if any)
             * @type {object|undefined}
             */
            this.thread = data.thread;
        }

        for(var i of data?.mentions){
            this.mentions.users.set(i.id, new User(i));
        }
        for(var i of data?.mention_roles){
            this.mentions.roles.set(i.id, i);
        }
        if('mentions_channels' in data) {
            for(var i of data?.mention_channels){
                this.mentions.channels.set(i.id, i);
            }
        }
        if('stickers' in data) {
            for(var i of data?.stickers){
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
     * @returns {Message}
     */
    async reply(obj) {
        const message = new MessagePayload(obj, obj?.files)

        var result = await this.#client.rest.request("POST", Endpoints.ChannelMessages(this.channelId), true, { data: message.payload }, null, message.files)
        
        if (!result.error) {
            result.data = {...result.data, guild: this.guild, member: this.guild.members.cache.get(result.data.author.id) }

            var x = new Message(result.data, this.#client)
        } else {
            var x = result
        }

        return x
    }
    /**
     * 
     * @param {object} obj - Edits the message (Only if the message author is the client)
     * @example
     * <Message>.edit({
     *  content: "This is the content of the new message"
     * })
     * @returns {Message}
     */
    async edit(obj) {
        const message = new EditMessagePayload(obj, obj.files)

        var result = await this.#client.rest.request("PATCH", Endpoints.ChannelMessage(this.channelId, this.id), true, { data: message.payload }, null, message.files)
        
        if (!result.error) {
            result.data = {...result.data, guild: this.guild, member: this.guild.members.cache.get(result.data.author.id) }

            var x = new Message(result.data, this.#client)
        } else {
            var x = result
        }

        return x
    }
    /**
     * 
     * @param {} - Remove the embeds of the message
     * @returns {Message}
     */
    async removeEmbeds() {
        var result = await this.#client.rest.request("PATCH", Endpoints.ChannelMessage(this.channelId, this.id), true, { data: { flags: 4} })
            
        if (!result.error) {
            result.data = {...result.data, guild: this.guild, member: this.guild.members.cache.get(result.data.author.id) }

            var x = new Message(result.data, this.#client)
        } else {
            var x = result
        }

        return x
    }
    /**
     * 
     * @param {}  - Deletes the message
     * @returns {Message}
     */
    async delete() {
        var result = await this.#client.rest.request("DELETE", Endpoints.ChannelMessage(this.channelId, this.id), true)
            
        return result
    }
    /**
     * @type {User}
     * @returns - The author of the message
     */
    get user() {
        if(this.webhookId){
            return this.#data.user
        } else {
            var x = new User(this.#justUser, this.#client)
            this.#client.users.cache.set(x.id, x)
            return x
        }
    }
    async _getChannel(channelId) {
        var channel = await this.#client.rest.request("GET", Endpoints.Channel(channelId), true)

        if(!channel?.error){
            channel.guild = this.guild

            channel = typeChannel(channel.data, this.#client)

            this.#client.channels.cache.set(channel.id, channel)
            this.guild.channels.cache.set(channel.id, channel)

            return channel
        } else {
            return null
        }
    }
}

module.exports = { Message }