import { Client } from "../client";
import { ChannelMessageManager } from "./Managers/ChannelMessageManager";
import { Message } from "./Message";
import { TextChannel } from "./TextChannel";
import { VoiceChannel } from "./VoiceChannel";
import { ThreadChannel } from "./ThreadChannel";
import { MessageBodyRequest, SnowflakeInformation } from "../common";
import { Channel } from "./BaseChannel";
import { MessageCollector } from "./Collectors/MessageCollector";
import { APIMessage } from "discord-api-types/v10";
export declare class TextBasedChannel extends Channel {
    /**
     * The Text Channel message manager
     */
    messages: ChannelMessageManager<TextChannel | VoiceChannel | ThreadChannel | TextBasedChannel>;
    /**
     * The last Text Channel message
     */
    last_message_id: string;
    /**
     * The Text Channel cooldown per user in seconds
     * @type {number}
     */
    rate_limit_per_user: number;
    /**
     * The Text Channel cooldown per user in seconds
     */
    readonly cooldown: number;
    /**
     * Creates a message in the Text Channel
     * @readonly
     * @function
     */
    readonly sendMessage: (body: MessageBodyRequest | string) => Promise<Message | ((Record<string, any> | APIMessage) & {
        error?: boolean;
    }) | null>;
    /**
     * Creates a message in the Text Channel
     * @readonly
     * @function
     */
    readonly send: (body: MessageBodyRequest | string) => Promise<Message | ((Record<string, any> | APIMessage) & {
        error?: boolean;
    }) | null>;
    /**
     * The Text Channel last pin time information
     */
    readonly last_pin: SnowflakeInformation;
    constructor(data: any, client: Client);
    /**
     * Creates a message in the Text Channel
     * @param {MessagePayload} body - The message send payload
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
    createMessage(body: MessageBodyRequest | string): Promise<Message | ((Record<string, any> | APIMessage) & {
        error?: boolean;
    }) | null>;
    createMessageCollector(filter: (message: Message) => any, options: Record<any, any>): MessageCollector;
}
