"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
class MessageCreate extends Event_1.Event {
    handle(data) {
        const client = this.client;
        const message = this.getMessage(data);
        client.emit(Event_1.EventNames.MessageCreate, message);
        return { message };
    }
}
exports.default = MessageCreate;
