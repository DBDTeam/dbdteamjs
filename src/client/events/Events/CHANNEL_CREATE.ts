import { GatewayChannelCreateDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { typeChannel } from "../../../utils/utils";
import { Event } from "../Event";
import { EventNames } from "../../../common";

export default class ChannnelCreate extends Event<GatewayChannelCreateDispatchData> {
  handle(data: GatewayChannelCreateDispatchData, shard: Shard) {
    // @ts-ignore
    const guild = this.client.guilds.cache.get(data.guild_id).guild;
    const channel = this.client.channels.cache.set(
      data.id,
      typeChannel(data, this.client)
    );
    guild.channels.set(data.id, typeChannel(data, this.client));
    // @ts-ignore
    this.client.emit(EventNames.ChannelCreate, channel, data.id, shard);
  }
}
