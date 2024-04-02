import { Client } from "../client/Client";

import { CDN } from "./CDN";
import { RequestHandler } from "./requestHandler";
import * as Endpoints from "./Endpoints"

class REST extends RequestHandler {
  /**
   * The CDN handler for this client's requests
   */
  cdn: CDN;

  /**
   * The Endpoints used for client's requests.
   */
  endpoints: any;

  /**
   *  Create a new instance of the rest client.
   *
   * @param client - The client
   */
  constructor(client: Client) {
    super(client);
    this.cdn = new CDN();
    this.endpoints = Endpoints;
  }
}

export { REST };
