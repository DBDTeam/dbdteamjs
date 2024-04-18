import { type Client } from "../client/Client";
import { Channel } from "./BaseChannel";
import { TextBasedChannel } from "./TextBasedChannel";

/** @extends {Channel} */
class TextChannel extends TextBasedChannel {
  #client;
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
  }
}

export { TextChannel };
