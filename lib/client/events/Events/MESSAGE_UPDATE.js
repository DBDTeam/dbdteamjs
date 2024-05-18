"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class MessageUpdate extends Event_1.Event {
    async handle(data, shard) {
        const newMessage = await this.getMessage(data);
        const channel = this.client.channels.cache.get(data.channel_id);
        if (!channel || channel?.isTextBased())
            return;
        const oldMessage = channel.messages.cache.get(data.id);
        if (!oldMessage)
            return;
        this.client.emit(common_1.EventNames.MessageUpdate, oldMessage, newMessage, shard);
    }
}
exports.default = MessageUpdate;
