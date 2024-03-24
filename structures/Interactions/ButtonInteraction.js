const { ComponentInteraction } = require("./ComponentInteraction");

class ButtoInteraction extends ComponentInteraction {
    /**
     * Represents a ButtonInteraction.
     * @extends ComponentInteraction
     * @param {object} data - The ButtonInteraction PayloadData.
     * @param {Client} client - The Client.
     */
    constructor(data, client) {
        super(data,client)
    }
}

module.exports = { ButtoInteraction }