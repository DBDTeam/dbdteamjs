import { Channel } from "./BaseChannel";
import { Client } from "../client";
import { ChannelMessageManager } from "./Managers/ChannelMessageManager";
import { SnowflakeInformation, getAllStamps } from "../utils/utils";
import * as Endpoints from "../rest/Endpoints";
import { Message } from "./Message";
import { MessageData, MessagePayload } from "./Payloads/MessagePayload";
import { TextChannel } from "./TextChannel";
import { VoiceChannel } from "./VoiceChannel";
import { ThreadChannel } from "./ThreadChannel";
import { MessageBodyRequest } from "../common";

export class TextBasedChannel extends Channel {
  #client: Client;
  /**
   * The Text Channel message manager
   */
  messages: ChannelMessageManager<
    TextChannel | VoiceChannel | ThreadChannel | TextBasedChannel
  >;
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
  readonly sendMessage = (body: MessageBodyRequest) => this.createMessage(body);
  /**
   * Creates a message in the Text Channel
   * @readonly
   * @function
   */
  readonly send = (body: MessageBodyRequest) => this.createMessage(body);
  /**
     * The Text Channel last pin time information
     */
  readonly last_pin!: SnowflakeInformation;
  constructor(data: any, client: Client) {
    super(data, client);
    this.#client = client;
    this.last_message_id = data.last_message_id;
    /**
     * The Text Channel parent id (category id)
     * @type {string}
     */
    this.parent_id = data.parent_id;
    this.last_pin = getAllStamps(data.last_pin_timestamp) as SnowflakeInformation;
    /**
     * The Text Channel cooldown per user in seconds
     */
    this.rate_limit_per_user = data.rate_limit_per_user;
    this.messages = new ChannelMessageManager(this, this.#client);
    /**
     * The Text Channel cooldown per user in seconds
     * @readonly
     * @type {number}
     */
    this.cooldown = this.rate_limit_per_user;
    this.sendMessage = (body: MessageBodyRequest) => this.createMessage(body);
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
