const { Channel } = require("./DefaultChannel")
const Endpoints = require("../REST/Endpoints");
const { readOnly } = require("../Utils/utils");
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
    }
}

module.exports = { VoiceChannel }