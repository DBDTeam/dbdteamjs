import { type Client } from "../client/Client";
import { TextBasedChannel } from "./TextBasedChannel";
// this is literally TextChannel but, renamed to DMChannel
/** @extends {TextBasedChannel} */
class DMChannel extends TextBasedChannel {
  /**
   * Represents a Text Channel
   * @param {*} data
   * @param {Client} client
   */
  constructor(data: any, client: Client) {
    super(data, client);
  }
}

export { DMChannel };
