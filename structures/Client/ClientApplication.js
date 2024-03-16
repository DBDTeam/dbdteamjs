const { readOnly } = require("../../Utils/utils");
const { ApplicationCommandManager } = require("../Managers/ApplicationCommandsManager");
const { Client } = require("./Client");

class ClientApplication {
    /**
    * Represents the Client Application
    * @param {Client}
    */
    constructor(client) {
        /**
         * The client
         * @readonly
         * @type {Client}
         */
        readOnly(this, "client", client)
        /**
         * Represents all of the application commands of the client
         * @type {ApplicationCommandManager}
         */
        this.commands = new ApplicationCommandManager(client)
    }
}

module.exports = { ClientApplication }