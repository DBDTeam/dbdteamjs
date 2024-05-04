import { Channel } from "./BaseChannel";
import { Client } from "../client";
import { ChannelMessageManager } from "./Managers/ChannelMessageManager";
import { getAllStamps } from "../utils/utils";
import * as Endpoints from "../rest/Endpoints";
import { Message } from "./Message";
import { MessageData, MessagePayload } from "./Payloads/MessagePayload";
import { TextChannel } from "./TextChannel";
import { VoiceChannel } from "./VoiceChannel";
import { ThreadChannel } from "./ThreadChannel";
import { MessageBodyRequest } from "../common";

export class TextBasedChannel extends Channel {
  #client: Client;
  messages: ChannelMessageManager<TextChannel | VoiceChannel | ThreadChannel | TextBasedChannel>;
  last_message_id: string;
  rate_limit_per_user: number;
  readonly cooldown: number;
  readonly sendMessage: Function;
  readonly send: Function;
  readonly last_pin: any;
  constructor(data: any, client: Client) {
    super(data, client);
    this.#client = client;
    /**
     * The last Text Channel message
     * @type {string | undefined}
     */
    this.last_message_id = data.last_message_id;
    /**
     * The Text Channel parent id (category id)
     * @type {string}
     */
    this.parent_id = data.parent_id;
    /**
     * The Text Channel last pin time information
     * @type {object}
     */
    this.last_pin = getAllStamps(data.last_pin_timestamp);
    /**
     * The Text Channel cooldown per user in seconds
     * @type {number}
     */
    this.rate_limit_per_user = data.rate_limit_per_user;
    /**
     * The Text Channel message manager
     * @type {ChannelMessageManager}
     */
    this.messages = new ChannelMessageManager(this, this.#client);
    /**
     * The Text Channel cooldown per user in seconds
     * @readonly
     * @type {number}
     */
    this.cooldown = this.rate_limit_per_user;
    /**
     * Creates a message in the Text Channel
     * @readonly
     */
    this.sendMessage = (body: MessageBodyRequest) => this.createMessage(body);
    /**
     * Creates a message in the Text Channel
     * @readonly
     */
    this.send = (body: MessageBodyRequest) => this.createMessage(body);
  }

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

  async createMessage(body: MessageBodyRequest) {
    const message = new MessagePayload(body, body?.files);

    var result = await this.#client.rest.request(
      "POST",
      Endpoints.ChannelMessages(this.id),
      true,
      { data: message.payload },
      null,
      message.files
    );

    if (!result) return null;

    if (!result.error) {
      const data: any = {
        ...result.data,
        guild: this.guild,
        member: this.guild?.members?.cache.get(result.data?.author.id),
      };

      return new Message(data, this.#client);
    } else {
      return result;
    }
  }
}
