import { GatewayChannelUpdateDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { typeChannel } from "../../../utils/utils";
import { Event } from "../Event";

export default class ChannelUpdate extends Event<GatewayChannelUpdateDispatchData> {
  handle(data: GatewayChannelUpdateDispatchData, shard: Shard) {
    const _old = this.client.channels.cache.get(data.id);
    let _new;
    let guild;

    if ("guild_id" in data && data.guild_id) {
      guild =
        this.client.channels.cache.get(data.id)?.guild ||
        this.client.guilds.cache.get(data.guild_id);

      _new = this.client.channels.cache.set(
        data.id,
        typeChannel(data, this.client)
      );
      this.client.guilds.cache.forEach((x) => {
        if (x.id === data.guild_id) {
          guild = x.guild;
          x.channels.cache.set(data.id, typeChannel(data, this.client));
        }
      });
    }
    this.client.emit("channelUpdate", _old, _new, shard);
  }
}
