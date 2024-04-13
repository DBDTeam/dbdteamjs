import { type Client } from "../client/Client";
import * as Endpoints from "../rest/Endpoints";
import { getAllStamps } from "../utils/utils";
import { Channel } from "./BaseChannel";
import { ChannelMessageManager } from "./Managers/ChannelMessageManager";
import { Message } from "./Message";
import { MessagePayload } from "./Payloads/MessagePayload";

/** @extends {Channel} */
class TextChannel extends Channel {
  #client;

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
  constructor(data: any, client: Client) {
    super(data, client);
    this.#client = this.client;
    /**
     * The Text Channel position
     * @type {number}
     */
    this.position = data.position;
    /**
     * The Text Channel permissions overwrites
     * @type {object}
     */
    this.permission_overwrites = data.permission_overwrites;
    /**
     * The Text Channel topic
     * @type {string | undefined}
     */
    this.topic = data.topic;
    /**
     * If the Text Channel has enabled the NSFW option
     * @type {boolean}
     */
    this.nsfw = data.nsfw;
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
    this.sendMessage = (...args: any) => this.createMessage(args);
    /**
     * Creates a message in the Text Channel
     * @readonly
     */
    this.send = (...args: any) => this.createMessage(args);
  }

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

  async createMessage(obj: any) {
    const message = new MessagePayload(obj, obj.files);

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

export { TextChannel };
