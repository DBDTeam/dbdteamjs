import { type Client } from "../client/Client";
import { Channel } from "./BaseChannel";
import { ChannelMessageManager } from "./Managers/ChannelMessageManager";
import { Message } from "./Message";
/** @extends {Channel} */
declare class TextChannel extends Channel {
    #private;
    last_message_id: string;
    readonly last_pin: any;
    rate_limit_per_user: number;
    messages: ChannelMessageManager<TextChannel>;
    readonly cooldown: number;
    readonly sendMessage: Function;
    readonly send: Function;
    /**
     * Represents a Text Channel
     * @param {*} data
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
     * @returns {Promise<Message | object>}
     */
    createMessage(obj: any): Promise<import("../interfaces/rest/requestHandler").ResponseFromApi | Message | null>;
}
export { TextChannel };
