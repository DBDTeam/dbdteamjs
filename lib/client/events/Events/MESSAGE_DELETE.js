"use strict";
/**const { Message } = require("../../../structures/Message.js");

module.exports = async(client, d, id) => {
    const channel = client.channels.cache.get(d.channel_id)
    
    const msg = channel.messages.cache.get(d.id)

    channel.messages.cache.delete(d.id)

    client.emit("messageDelete", msg, id)
}**/
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
class MessageDelete extends Event_1.Event {
    async handle(data, shard) {
        const channel = this.client.channels.cache.get(data.channel_id);
        var oldMessage = channel.messages.cache.get(data.id);
        if (!oldMessage)
            return;
        channel.messages.cache.delete(data.id);
        this.client.emit("messageDelete", oldMessage, shard);
    }
}
exports.default = MessageDelete;
