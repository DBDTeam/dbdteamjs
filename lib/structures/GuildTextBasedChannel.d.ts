import { Client } from "../client";
import { ChannelMessageManager } from "./Managers/ChannelMessageManager";
import { Message } from "./Message";
import { MessageBodyRequest, Nullable, SnowflakeInformation } from "../common";
import { MessageCollector } from "./Collectors/MessageCollector";
import { APITextBasedChannel } from "discord-api-types/v10";
import { GuildChannel } from "./GuildChannel";
export declare class GuildTextBasedChannel extends GuildChannel {
    /**
     * The Text Channel message manager
     */
    messages: ChannelMessageManager<GuildChannel>;
    /**
     * The last Text Channel message
     */
    last_message_id: Nullable<string>;
    /**
     * The rate limit per user of the channel.
     * @type {Nullable<number>}
     */
    rate_limit_per_user: Nullable<number>;
    /**
     * Creates a message in the Text Channel
     * @readonly
     * @function
     */
    readonly sendMessage: (body: MessageBodyRequest | string) => Promise<Message | null>;
    /**
     * Creates a message in the Text Channel
     * @readonly
     * @function
     */
    readonly send: (body: MessageBodyRequest | string) => Promise<Message | null>;
    /**
     * The Text Channel last pin time information
     */
    readonly last_pin: SnowflakeInformation;
    constructor(data: APITextBasedChannel<any>, client: Client);
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
    createMessage(body: MessageBodyRequest | string): Promise<Message | null>;
    createMessageCollector(filter: (message: Message) => any, options: Record<any, any>): MessageCollector;
}
