import { Channel } from "./BaseChannel"; 
import * as Endpoints from "../rest/Endpoints";
import { ChannelMessageManager } from "./Managers/ChannelMessageManager";
import { MessagePayload } from "./Payloads/MessagePayload";
import { Message } from "./Message";
import { type Client } from "../client/Client"
import { VideoQualityMode } from "discord-api-types/v10";
import { MessagePayloadData } from "../interfaces/message/MessagePayload";

/** @extends {Channel} */
class VoiceChannel extends Channel {
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
  constructor(data: any, client: Client) {
    super(data, client);

    this.client = client;

    /**
     * The actual bitrate of the Voice Channel
     * @type {string}
     */
    this.bitrate = data.bitrate;
    /**
     * The maximum amount of users that are able to be in the Voice Channel
     * @type {number | undefined}
     */
    this.user_limit = data.user_limit;
    /**
     * The cooldown of the Text Channel of the Voice Channel in seconds
     * @type {number}
     */
    this.rate_limit_per_user = data.rate_limit_per_user;
    /**
     * The region of the Voice Channel
     * @type {string}
     */
    this.region = data.rtc_region;
    /**
     * The video quality of the Voice Channel
     * @type {string}
     */
    this.video_quality = data.video_quality_mode;
    /**
     * The session Id to join the Voice Channel
     * @type {string}
     */
    this.session_id = data.session_id;
    /**
     * Voice channel message manager
     * @type {ChannelMessageManager}
     */
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
   * @returns {Promise<Message | Object>}
   */
  async createMessage(obj: MessagePayloadData) {
    const message = new MessagePayload(obj, obj.files);

    var result = await this.client.rest.request(
      "POST",
      Endpoints.ChannelMessages(this.id),
      true,
      { data: message.payload },
      null,
      message.files
    );

    if(!result) return null;

    if (!result.error) {
      result.data = {
        ...result.data,
        guild: this.guild,
        member: this.guild.members?.cache.get(result.data?.author.id),
      };

      return new Message(result.data, this.client);
    } else {
      return result;
    }
  }
}

export { VoiceChannel };
