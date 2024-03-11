const { readOnly } = require("../../Utils/utils");
const { ApplicationCommandManager } = require("../Managers/ApplicationCommandsManager");

class ClientApplication {
    constructor(client) {
        readOnly(this, "client", client)
        this.commands = new ApplicationCommandManager(client)
    }
}

module.exports = { ClientApplication }