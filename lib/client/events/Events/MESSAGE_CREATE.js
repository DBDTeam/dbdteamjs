"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class MessageCreate extends Event_1.Event {
    async handle(data, shard) {
        if (data.webhook_id)
            return;
        const client = this.client;
        const message = await this.getMessage(data);
        client.emit(common_1.EventNames.MessageCreate, message, shard);
    }
}
exports.default = MessageCreate;
