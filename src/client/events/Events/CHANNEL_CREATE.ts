import { GatewayChannelCreateDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { typeChannel } from "../../../utils/utils";
import { Event } from "../Event";
import { EventNames } from "../../../common";
import { Channel } from "../../../structures";

export default class ChannnelCreate extends Event<GatewayChannelCreateDispatchData> {
  handle(data: any, shard: Shard) {
    
    const guild = this.client.guilds.cache.get(data.guild_id)?.guild;
    const channel = this.client.channels.cache.set(
      data.id,
      typeChannel(data, this.client)
    ).get(data.id);
    guild.channels.set(data.id, typeChannel(data, this.client));

    this.client.emit(EventNames.ChannelCreate, channel as Channel, data.id, shard);
  }
}
