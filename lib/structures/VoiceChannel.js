"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceChannel = void 0;
const GuildTextBasedChannel_1 = require("./GuildTextBasedChannel");
/** @extends {Channel} */
class VoiceChannel extends GuildTextBasedChannel_1.GuildTextBasedChannel {
    /**
     * The actual bitrate of the Voice Channel
     */
    bitrate;
    /**
     * The maximum amount of users that are able to be in the Voice Channel
     */
    user_limit;
    /**
     * The cooldown of the Text Channel of the Voice Channel in seconds
     */
    rate_limit_per_user;
    /**
     * The region of the Voice Channel
     */
    region;
    /**
     * The video quality of the Voice Channel
     */
    video_quality;
    /**
     * The session Id to join the Voice Channel
     * @type {string}
     */
    session_id;
    client;
    /**
     * Represents a Voice Channel
     * @param {object} data - Voice Channel Payload
     * @param {Client} client
     */
    constructor(data, client) {
        super(data, client);
        this.client = client;
        this.bitrate = data.bitrate;
        this.user_limit = data.user_limit;
        this.rate_limit_per_user = data.rate_limit_per_user;
        this.region = data.rtc_region;
        this.video_quality = data.video_quality_mode;
        this.session_id = data.session_id;
    }
}
exports.VoiceChannel = VoiceChannel;
