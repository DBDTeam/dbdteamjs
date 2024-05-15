import { GatewayMessageUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Message, Shard } from "../../../structures";
import { TextBasedChannel } from "../../../structures/TextBasedChannel";

export default class MessageUpdate extends Event<GatewayMessageUpdateDispatchData> {
    async handle(data: GatewayMessageUpdateDispatchData, shard: Shard) {
        const newMessage = await this.getMessage(data)

        const channel = this.client.channels.cache.get(data.channel_id) as TextBasedChannel

        if(!channel || channel?.isTextBased()) return;

        const oldMessage = channel.messages.cache.get(data.id) as Message

        if(!oldMessage) return;

        this.client.emit("messageUpdate", oldMessage, newMessage, shard)
    }
}