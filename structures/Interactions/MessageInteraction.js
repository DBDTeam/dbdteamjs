const { Message } = require("../Message");
const { InteractionBase } = require("./BaseInteraction");

class MessageInteraction extends InteractionBase {
    #data;
    constructor(data, client) {
        super(data, client)
        this.message = null
        this.#data = data;
        this.________patch()
    }
    ________patch() {
        this.message = new Message({...Object.values(this.#data.data.resolved.messages)[0], guild: this.guild}, this.client)
    }
}

module.exports = { MessageInteraction }