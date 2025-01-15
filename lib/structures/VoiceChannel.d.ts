import { VideoQualityMode } from "discord-api-types/v10";
import { type Client } from "../client/Client";
import { GuildTextBasedChannel } from "./GuildTextBasedChannel";
/** @extends {Channel} */
declare class VoiceChannel extends GuildTextBasedChannel {
    /**
     * The actual bitrate of the Voice Channel
     */
    bitrate: number;
    /**
     * The maximum amount of users that are able to be in the Voice Channel
     */
    user_limit: number;
    /**
     * The cooldown of the Text Channel of the Voice Channel in seconds
     */
    rate_limit_per_user: number;
    /**
     * The region of the Voice Channel
     */
    region: string;
    /**
     * The video quality of the Voice Channel
     */
    video_quality: VideoQualityMode;
    /**
     * The session Id to join the Voice Channel
     * @type {string}
     */
    session_id: string;
    readonly client: Client;
    /**
     * Represents a Voice Channel
     * @param {object} data - Voice Channel Payload
     * @param {Client} client
     */
    constructor(data: any, client: Client);
}
export { VoiceChannel };
