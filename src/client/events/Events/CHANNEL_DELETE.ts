import { GatewayChannelDeleteDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { typeChannel } from "../../../utils/utils";
import { Event } from "../Event";

export default class ChannelDelete extends Event<GatewayChannelDeleteDispatchData> {
  async handle(data: GatewayChannelDeleteDispatchData, shard: Shard) {
    let guild;
    let _old = typeChannel(data, this.client);
    this.client.channels.cache.get(data.id)?.guild;
    if ("guild_id" in data && data.guild_id)
      guild = this.client.guilds.cache.get(data.guild_id);

    //nope, i mean, only is needed when the code has more than on line of code, i mean:
    /**e
     if(a == b) c()

    if(a == b) {
      a == c
    }
     */
    if (guild) guild.channels.cache.delete(_old.id);
    this.client.channels.cache.delete(data.id);
    // @ts-ignore
    this.client.emit("channelDelete", _old, data.id, shard);
  } // El inglés: NIGERIA
}
