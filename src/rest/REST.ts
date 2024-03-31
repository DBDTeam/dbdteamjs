import { Client } from "../client/Client";

import { CDN } from "./CDN";
import { RequestHandler } from "./requestHandler";

class REST extends RequestHandler {
  /**
   * The CDN handler for this client's requests
   */
  cdn: CDN;

  /**
   *  Create a new instance of the rest client.
   *
   * @param client - The client
   */
  constructor(client: Client) {
    super(client);
    this.cdn = new CDN();
  }
}

export { REST };
