import { Client } from "../client";
import { ChannelMessageManager } from "./Managers/ChannelMessageManager";
import * as Endpoints from "../rest/Endpoints";
import { Message } from "./Message";
import { MessagePayload } from "./Payloads/MessagePayload";
import { TextChannel } from "./TextChannel";
import { VoiceChannel } from "./VoiceChannel";
import { ThreadChannel } from "./ThreadChannel";
import { MessageBodyRequest, SnowflakeInformation } from "../common";
import { Channel } from "./BaseChannel";
import { ClientError, ClientTypeError } from "../client/errors/ClientError";
import { ErrorNames } from "../client/errors/ErrorList";
import { Utilities } from "../utils/utils";
import { MessageCollector } from "./Collectors/MessageCollector";
import { APIMessage } from "discord-api-types/v10";

export class TextBasedChannel extends Channel {
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
  readonly sendMessage = async(body: MessageBodyRequest | string) => await this.createMessage(body);
  /**
   * Creates a message in the Text Channel
   * @readonly
   * @function
   */
  readonly send = async(body: MessageBodyRequest | string) =>
    await this.createMessage(body);
  /**
   * The Text Channel last pin time information
   */
  readonly last_pin!: SnowflakeInformation;
  constructor(data: any, client: Client) {
    super(data, client);
    this.last_message_id = data.last_message_id;
    this.last_pin = Utilities.getAllStamps(
      data.last_pin_timestamp
    ) as SnowflakeInformation;
    /**
     * The Text Channel cooldown per user in seconds
     */
    this.rate_limit_per_user = data.rate_limit_per_user;
    this.messages = new ChannelMessageManager(this, this.client);
    /**
     * The Text Channel cooldown per user in seconds
     * @readonly
     * @type {number}
     */
    this.cooldown = this.rate_limit_per_user;
    this.sendMessage = async(body: MessageBodyRequest | string) => await this.createMessage(body);
    this.send = async(body: MessageBodyRequest | string) => await this.createMessage(body);
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

  async createMessage(body: MessageBodyRequest | string) {
    if (typeof body === "string" || body instanceof String) {
      body = { content: body as string };
    }

    if (!body || typeof body !== "object")
      throw new ClientTypeError(ErrorNames.InvalidType, "object", "body");

    if (
      !body?.content &&
      !body.files &&
      !body.embeds &&
      !body.poll &&
      !body.sticker_ids
    )
      throw new ClientError(ErrorNames.MissingRequiredProperties, "Message", [
        "content",
        "files",
        "embeds",
        "poll",
        "sticker_ids",
      ]);

    const message = new MessagePayload(body, body?.files);

    var result = await this.client.rest.request<APIMessage>(
      "POST",
      Endpoints.ChannelMessages(this.id),
      true,
      message.payload,
      null,
      message.files
    );

    if (!result || !result.hasData()) return result;

    return new Message(result.data, this.client);
  }

  createMessageCollector(filter: (message: Message) => any, options: Record<any, any>) {
    const collector = new MessageCollector(this.client, filter, options);
    return collector;
  }
}
