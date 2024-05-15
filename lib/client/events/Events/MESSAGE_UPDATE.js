"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
class MessageUpdate extends Event_1.Event {
    async handle(data, shard) {
        const newMessage = await this.getMessage(data);
        const channel = this.client.channels.cache.get(data.channel_id);
        if (!channel || channel?.isTextBased())
            return;
        const oldMessage = channel.messages.cache.get(data.id);
        if (!oldMessage)
            return;
        this.client.emit("messageUpdate", oldMessage, newMessage, shard);
    }
}
exports.default = MessageUpdate;
