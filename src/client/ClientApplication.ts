/** @module Client */

import { type Client } from "./Client";

import { ApplicationCommandManager } from "../structures/Managers/ApplicationCommandsManager";

/**
 * Represents the Client Application
 */
class ClientApplication {
  readonly client;
  public commands;
  constructor(client: Client) {
    /**
     * The client
     * @readonly
     */
    this.client = client;
    /**
     * Represents all of the application commands of the client
     * @type {ApplicationCommandManager}
     */
    this.commands = new ApplicationCommandManager(client);
  }
}

export { ClientApplication };
