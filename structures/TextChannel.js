const { readOnly, getAllStamps, setObj } = require("../Utils/utils");
const { Channel } = require("./DefaultChannel")
const Endpoints = require("../REST/Endpoints")
const { Message } = require("./Message");
const { MessagePayload } = require("./Payloads/MessagePayload");

class TextChannel extends Channel {
    #client;
    constructor(data, client) {
        super(data, client);
        this.#client = client
        this.position = data.position;
        this.permissionOverwrites = data.permission_overwrites;
        this.topic = data.topic;
        this.nsfw = data.nsfw;
        this.lastMessageId = data.last_message_id;
        this.parentId = data.parent_id
        this.lastPinStamp = getAllStamps(data.last_pin_timestamp)
        this.rateLimitPerUser = data.rate_limit_per_user
        readOnly(this, "coldown", this.rateLimitPerUser)
        readOnly(this, "sendMessage", (arg) => this.createMessage(arg))
        readOnly(this, 'send', (arg) => this.createMessage(arg))
    }

    async createMessage(obj) {
        const message = new MessagePayload(obj, obj?.files)

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

module.exports = { TextChannel }