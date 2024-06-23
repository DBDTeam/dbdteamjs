import { RESTGetAPIChannelMessageResult, VideoQualityMode } from "discord-api-types/v10";
import { type Client } from "../client/Client";
import * as Endpoints from "../rest/Endpoints";
import { Message } from "./Message";
import { MessagePayload } from "./Payloads/MessagePayload";
import { TextBasedChannel } from "./TextBasedChannel";
import { MessageBodyRequest } from "../common";

/** @extends {Channel} */
class VoiceChannel extends TextBasedChannel {
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
  readonly sendMessage = (body: MessageBodyRequest) => this.createMessage(body);
  /**
   * Creates a message in the Text Channel
   * @readonly
   * @function
   */
  readonly send = (body: MessageBodyRequest) => this.createMessage(body);
  readonly client: Client;
  /**
   * Represents a Voice Channel
   * @param {object} data - Voice Channel Payload
   * @param {Client} client
   */
  constructor(data: any, client: Client) {
    super(data, client);

    this.client = client;
    this.bitrate = data.bitrate;
    this.user_limit = data.user_limit;
    this.rate_limit_per_user = data.rate_limit_per_user;
    this.region = data.rtc_region;
    this.video_quality = data.video_quality_mode;
    this.session_id = data.session_id;
    this.sendMessage = (body: MessageBodyRequest) => this.createMessage(body);
    this.send = (body: MessageBodyRequest) => this.createMessage(body);
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
   * @returns {Promise<Message | Object>}
   */
  async createMessage(obj: any) {
    const message = new MessagePayload(obj, obj.files);

    var result = await this.client.rest.request(
      "POST",
      Endpoints.ChannelMessages(this.id),
      true,
      { data: message.payload },
      null,
      message.files
    );

    if (!result) return null;

    if (!result.error) {
      result.data = {
        ...result.data,
        guild: this.guild,
        member: this.guild?.members?.cache.get(result.data?.author.id),
      };

      return new Message(result.data as RESTGetAPIChannelMessageResult, this.client);
    } else {
      return result;
    }
  }
}

export { VoiceChannel };
