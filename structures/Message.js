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
    /**
   * Represents a Discord Message
   * @param {MessagePayload} data - The message payload
   * @param {Client} client - The Client
   */
    constructor(data, client){
        super(data.id)
        const { Client } = require("./Client/Client.js")
        const { ThreadChannel } = require("./ThreadChannel.js")
        const { TextChannel } = require("./TextChannel.js")
        const { VoiceChannel } = require("./VoiceChannel.js")
        const { Channel } = require("./DefaultChannel.js")
        this.#client = client
        this.#justUser = data.author
        /**
         * @type {string}
         * @en Represents the ID of the Message
         * @es Representa el ID del Mensaje.
        */
        this.id = data.id;
        /**
         * @en The type of the message.
         * @es El tipo de mensaje.
         * @type {string}
        */
        this.type = data.type;
        /**
         * @en The channel id of where the message was sent
         * @es El ID del canal en donde el mensaje fue enviado.
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
         * Represents the channel
         * @type {TextChannel|VoiceChannel|ThreadChannel|Channel}
        */
        this.channel = this.#client.channels.cache.get(this.channelId)
        this.guild = this.#client.guilds.cache.get(this.guildId) || data.guild || this.#client.channels.cache.get(this.channelId).guild
        this.member = !data.member ? this.guild.members.cache.get(this.user.id) : new Member({...data.member, id: this.user.id}, this.guild, this.#client)
        this.reactions = new MessageReactions(this.#client, this, data.reactions || [])
        this.tts = data.tts;
        this.flags = data.flags;
        this.sended = getAllStamps(this.getCreatedAt)
        this.embeds = data.embeds;
        this.attachments = data.attachments;
        this.stickers = new Collection();
        readOnly(this, 'nonce', data.nonce)
        this.pinned = data.pinned;
        this._patch(data);
    }

    _patch(data) {
        if('webhook_id' in data){
            this.webhookId = data.webhook_id;
        }

        if('thread' in data){
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
    
    async delete() {
        var result = await this.#client.rest.request("DELETE", Endpoints.ChannelMessage(this.channelId, this.id), true)
            
        return result
    }
    
    get user() {
        if(this.webhookId){
            return data.user
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