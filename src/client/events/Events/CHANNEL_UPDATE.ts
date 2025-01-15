import { GatewayChannelUpdateDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { Event } from "../Event";
import { EventNames } from "../../../common";
import { Utilities } from "../../../utils/utils";
import { GuildChannel } from "../../../structures/GuildChannel";

export default class ChannelUpdate extends Event<GatewayChannelUpdateDispatchData> {
  handle(data: GatewayChannelUpdateDispatchData, shard: Shard) {
    const oldChannel = this.client.channels.cache.get(data.id);
    let newChannel;
    var guild;

    if ("guild_id" in data && data.guild_id) {
      guild =
        (this.client.channels.cache.get(data.id) as GuildChannel)?.guild ||
        this.client.guilds.cache.get(data.guild_id);

      newChannel = this.client.channels.cache.set(
        data.id,
        Utilities.typeChannel(data, this.client)
      );
      this.client.guilds.cache.forEach((x) => {
        if (x.id === data.guild_id) {
          x.channels.cache.set(data.id, Utilities.typeChannel(data, this.client) as GuildChannel);
        }
      });
    }
    this.client.emit(EventNames.ChannelUpdate, oldChannel, newChannel, shard);
  }
}
