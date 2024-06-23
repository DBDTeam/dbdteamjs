import { VideoQualityMode } from "discord-api-types/v10";
import { type Client } from "../client/Client";
import { Message } from "./Message";
import { TextBasedChannel } from "./TextBasedChannel";
import { MessageBodyRequest } from "../common";
/** @extends {Channel} */
declare class VoiceChannel extends TextBasedChannel {
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
    /**
     * Creates a message in the Text Channel
     * @readonly
     * @function
     */
    readonly sendMessage: (body: MessageBodyRequest) => Promise<import("../interfaces/rest/requestHandler").ResponseFromApi | Message | null>;
    /**
     * Creates a message in the Text Channel
     * @readonly
     * @function
     */
    readonly send: (body: MessageBodyRequest) => Promise<import("../interfaces/rest/requestHandler").ResponseFromApi | Message | null>;
    readonly client: Client;
    /**
     * Represents a Voice Channel
     * @param {object} data - Voice Channel Payload
     * @param {Client} client
     */
    constructor(data: any, client: Client);
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
     * @returns {Promise<Message | Object>}
     */
    createMessage(obj: any): Promise<import("../interfaces/rest/requestHandler").ResponseFromApi | Message | null>;
}
export { VoiceChannel };
