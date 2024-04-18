import { GatewayChannelDeleteDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { typeChannel } from "../../../utils/utils";
import { Event } from "../Event";
import { EventNames } from "../../../common";

export default class ChannelDelete extends Event<GatewayChannelDeleteDispatchData> {
  async handle(data: GatewayChannelDeleteDispatchData, shard: Shard) {
    let guild;
    let _old = typeChannel(data, this.client);
    this.client.channels.cache.get(data.id)?.guild;
    if ("guild_id" in data && data.guild_id)
      guild = this.client.guilds.cache.get(data.guild_id);
    if (guild) guild.channels.cache.delete(_old.id);
    this.client.channels.cache.delete(data.id);

    this.client.emit(EventNames.ChannelDelete, _old, data.id, shard);
  }
}
