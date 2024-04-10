"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("../../../interfaces/client/Events");
const Event_1 = require("../Event");
class MessageCreate extends Event_1.Event {
    handle(data) {
        const client = this.client;
        const message = this.getMessage(data);
        client.emit(Events_1.EventNames.MessageCreate, message);
        return { message };
    }
}
exports.default = MessageCreate;
