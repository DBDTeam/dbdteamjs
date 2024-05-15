/**const { Message } = require("../../../structures/Message.js");

module.exports = async(client, d, id) => {
    const channel = client.channels.cache.get(d.channel_id)
    
    const msg = channel.messages.cache.get(d.id)

    channel.messages.cache.delete(d.id)

    client.emit("messageDelete", msg, id)
}**/

import { GatewayMessageDeleteDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
import { TextBasedChannel } from "../../../structures/TextBasedChannel";

export default class MessageDelete extends Event<GatewayMessageDeleteDispatchData> {
    async handle(data: GatewayMessageDeleteDispatchData, shard: Shard) {
        const channel = this.client.channels.cache.get(data.channel_id) as TextBasedChannel

        var oldMessage = channel.messages.cache.get(data.id)

        if(!oldMessage) return;

        channel.messages.cache.delete(data.id);

        this.client.emit("messageDelete", oldMessage, shard)
    }
}