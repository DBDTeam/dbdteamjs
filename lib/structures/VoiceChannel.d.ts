import { VideoQualityMode } from "discord-api-types/v10";
import { type Client } from "../client/Client";
import { Message } from "./Message";
import { TextBasedChannel } from "./TextBasedChannel";
/** @extends {Channel} */
declare class VoiceChannel extends TextBasedChannel {
    bitrate: number;
    user_limit: number;
    rate_limit_per_user: number;
    region: string;
    video_quality: VideoQualityMode;
    session_id: string;
    sendMessage: Function;
    send: Function;
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
