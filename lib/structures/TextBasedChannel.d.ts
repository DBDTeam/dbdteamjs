import { Channel } from "./BaseChannel";
import { Client } from "../client";
import { ChannelMessageManager } from "./Managers/ChannelMessageManager";
import { Message } from "./Message";
import { TextChannel } from "./TextChannel";
import { VoiceChannel } from "./VoiceChannel";
import { ThreadChannel } from "./ThreadChannel";
export declare class TextBasedChannel extends Channel {
    #private;
    messages: ChannelMessageManager<TextChannel | VoiceChannel | ThreadChannel | TextBasedChannel>;
    last_message_id: string;
    rate_limit_per_user: number;
    readonly cooldown: number;
    readonly sendMessage: Function;
    readonly send: Function;
    readonly last_pin: any;
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
     * @returns {Promise<Message | object>}
     */
    createMessage(obj: any): Promise<import("../interfaces/rest/requestHandler").ResponseFromApi | Message | null>;
}
