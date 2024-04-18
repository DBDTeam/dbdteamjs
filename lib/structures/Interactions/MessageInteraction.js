"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageInteraction = void 0;
const Message_1 = require("../Message");
const BaseInteraction_1 = require("./BaseInteraction");
class MessageInteraction extends BaseInteraction_1.InteractionBase {
    #data;
    message;
    constructor(data, client) {
        super(data, client);
        this.#data = data;
        this.patch();
    }
    patch() {
        this.message = new Message_1.Message({
            ...Object.values(this.#data.data.resolved.messages)[0],
            guild: this.guild,
        }, this.client);
    }
}
exports.MessageInteraction = MessageInteraction;
