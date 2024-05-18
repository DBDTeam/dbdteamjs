"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class MessageDelete extends Event_1.Event {
    async handle(data, shard) {
        const channel = this.client.channels.cache.get(data.channel_id);
        var oldMessage = channel.messages.cache.get(data.id);
        if (!oldMessage)
            return;
        channel.messages.cache.delete(data.id);
        this.client.emit(common_1.EventNames.MessageDelete, oldMessage, shard);
    }
}
exports.default = MessageDelete;
