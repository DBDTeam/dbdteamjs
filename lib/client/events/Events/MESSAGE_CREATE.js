"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
class MessageCreate extends Event_1.Event {
    async handle(data, shard) {
        const client = this.client;
        const message = await this.getMessage(data);
        client.emit("messageCreate", message, shard);
        return { message };
    }
}
exports.default = MessageCreate;
