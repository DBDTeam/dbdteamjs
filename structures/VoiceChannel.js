const { Channel } = require("./DefaultChannel")
const Endpoints = require("../REST/Endpoints");
const { readOnly } = require("../Utils/utils");
const { ChannelMessageManager } = require("./Managers/ChannelMessageManager");
class VoiceChannel extends Channel {
    #client;
    constructor(data, client) {
        super(data, client);
        this.#client = client
        this.bitrate = data.bitrate
        this.userLimit = data.user_limit
        this.rateLimitPerUser = data.rate_limit_per_user
        this.region = data.rtc_region
        this.videoQuality = data.video_quality_mode
        this.sessionId = data.session_id
        this.messages = new ChannelMessageManager(this, this.#client)
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

module.exports = { VoiceChannel }