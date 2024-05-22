import { GatewayThreadDeleteDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard, ThreadChannel } from "../../../structures";
import { EventNames } from "../../../common";

export default class ThreadDelete extends Event<GatewayThreadDeleteDispatchData> {
  handle(data: GatewayThreadDeleteDispatchData, shard: Shard) {
    let oldThreadChannel = this.client.channels.cache.get(
      data.id
    ) as ThreadChannel;
    if (!oldThreadChannel) return;
    let guild = this.client.guilds.cache.get(
      oldThreadChannel.guild?.id || data.guild_id
    );

    if (guild) {
      guild.channels.cache.delete(data.id);
    }

    this.client.channels.cache.delete(data.id);

    this.client.emit(EventNames.ThreadDelete, oldThreadChannel, shard);
  }
}
