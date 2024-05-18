import { GatewayMessageDeleteDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
import { TextBasedChannel } from "../../../structures/TextBasedChannel";
import { EventNames } from "../../../common";

export default class MessageDelete extends Event<GatewayMessageDeleteDispatchData> {
  async handle(data: GatewayMessageDeleteDispatchData, shard: Shard) {
    const channel = this.client.channels.cache.get(
      data.channel_id
    ) as TextBasedChannel;

    var oldMessage = channel.messages.cache.get(data.id);

    if (!oldMessage) return;

    channel.messages.cache.delete(data.id);

    this.client.emit(EventNames.MessageDelete, oldMessage, shard);
  }
}
