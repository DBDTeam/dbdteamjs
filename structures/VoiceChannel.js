const { Channel } = require("./DefaultChannel")
const Endpoints = require("../REST/Endpoints");
const { readOnly } = require("../Utils/utils");
const { ChannelMessageManager } = require("./Managers/ChannelMessageManager");
const { MessagePayload } = require("./Payloads/MessagePayload");
class VoiceChannel extends Channel {
    #client;
    /**
     * Represents a Voice Channel
     * @param {object} data - Voice Channel Payload
     * @param {Client} client 
     */
    constructor(data, client) {
        super(data, client);
        this.#client = client
        /**
         * The actual bitrate of the Voice Channel
         * @type {string}
         */
        this.bitrate = data.bitrate
        /**
         * The maximum amount of users that are able to be in the Voice Channel
         * @type {number | undefined}
         */
        this.userLimit = data.user_limit
        /**
         * The cooldown of the Text Channel of the Voice Channel in seconds
         * @type {number}
         */
        this.rateLimitPerUser = data.rate_limit_per_user
        /**
         * The region of the Voice Channel
         * @type {string}
         */
        this.region = data.rtc_region
        /**
         * The video quality of the Voice Channel
         * @type {string}
         */
        this.videoQuality = data.video_quality_mode
        /**
         * The session Id to join the Voice Channel
         * @type {string}
         */
        this.sessionId = data.session_id
        /**
         * Voice channel message manager
         * @type {ChannelMessageManager}
         */
        this.messages = new ChannelMessageManager(this, this.#client)
        /**
         * Sends a message (alias of the method createMessage)
         * @readonly
         */
        readOnly(this, "sendMessage", (arg) => this.createMessage(arg))
        /**
         * Sends a message (alias of the method createMessage)
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

module.exports = { VoiceChannel }