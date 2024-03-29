const { readOnly } = require("../utils/utils");
const {
  ApplicationCommandManager,
} = require("../structures/Managers/ApplicationCommandsManager");

/**
 * Represents the Client Application
 */
class ClientApplication {
  constructor(client) {
    /**
     * The client
     * @readonly
     */
    this.client = client;
    readOnly(this, "client", client);
    /**
     * Represents all of the application commands of the client
     * @type {ApplicationCommandManager}
     */
    this.commands = new ApplicationCommandManager(client);
  }
}

module.exports = { ClientApplication };
