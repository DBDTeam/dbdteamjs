import { GatewayChannelCreateDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { typeChannel } from "../../../utils/utils";
import { Event } from "../Event";
import { EventNames } from "../../../common";
import { Channel, Guild } from "../../../structures";

export default class ChannnelCreate extends Event<GatewayChannelCreateDispatchData> {
  handle(data: GatewayChannelCreateDispatchData, shard: Shard) {
    //@ts-ignore It always exists
    const guild: Guild = this.client.guilds.cache.get(data.guild_id)
    const channel = this.client.channels.cache
      .set(data.id, typeChannel(data, this.client))
      .get(data.id);
    guild.channels.cache.set(data.id, typeChannel(data, this.client));

    this.client.emit(
      EventNames.ChannelCreate,
      channel as Channel,
      data.id,
      shard
    );
  }
}
