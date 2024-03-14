const { ComponentInteraction } = require("./ComponentInteraction");

class ButtoInteraction extends ComponentInteraction {
    constructor(data, client) {
        super(data,client)
    }
}

module.exports = { ButtoInteraction }