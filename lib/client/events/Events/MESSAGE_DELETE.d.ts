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
export default class MessageDelete extends Event<GatewayMessageDeleteDispatchData> {
    handle(data: GatewayMessageDeleteDispatchData, shard: Shard): Promise<void>;
}
