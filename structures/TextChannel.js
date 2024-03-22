const { readOnly, getAllStamps, setObj } = require("../Utils/utils");
const { Channel } = require("./DefaultChannel")
const Endpoints = require("../REST/Endpoints")
const { Message } = require("./Message");
const { MessagePayload } = require("./Payloads/MessagePayload");
const { ChannelMessageManager } = require("./Managers/ChannelMessageManager");

class TextChannel extends Channel {
    #client;
    /**
     * Represents a Text Channel
     * @extends DefaultChannel
     * @param {object} data 
     * @param {Client} client 
     */
    constructor(data, client) {
        super(data, client);
        this.#client = client
        /**
         * The Text Channel position
         * @type {number}
         */
        this.position = data.position;
        /**
         * The Text Channel permissions overwrites
         * @type {object}
         */
        this.permissionOverwrites = data.permission_overwrites;
        /**
         * The Text Channel topic
         * @type {string | undefined}
         */
        this.topic = data.topic;
        /**
         * If the Text Channel has enabled the NSFW option
         * @type {boolean}
         */
        this.nsfw = data.nsfw;
        /**
         * The last Text Channel message
         * @type {string | undefined}
         */
        this.lastMessageId = data.last_message_id;
        /**
         * The Text Channel parent id (category id)
         * @type {string}
         */
        this.parentId = data.parent_id
        /**
         * The Text Channel last pin time information
         * @type {object}
         */
        this.lastPinStamp = getAllStamps(data.last_pin_timestamp)
        /**
         * The Text Channel cooldown per user in seconds
         * @type {number}
         */
        this.rateLimitPerUser = data.rate_limit_per_user
        /**
         * The Text Channel message manager
         * @type {ChannelMessageManager}
         */
        this.messages = new ChannelMessageManager(this, this.#client)
        /**
         * The Text Channel cooldown per user in seconds
         * @readonly
         * @type {number}
         */
        readOnly(this, "coldown", this.rateLimitPerUser)
        /**
         * Creates a message in the Text Channel
         * @readonly
         */
        readOnly(this, "sendMessage", (arg) => this.createMessage(arg))
        /**
         * Creates a message in the Text Channel
         * @readonly
         */
        readOnly(this, 'send', (arg) => this.createMessage(arg))
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

module.exports = { TextChannel }