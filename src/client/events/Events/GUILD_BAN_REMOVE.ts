import { GatewayGuildBanRemoveDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { User } from "../../../structures/User";
import { Event } from "../Event";

export default class GuildBanRemove extends Event<GatewayGuildBanRemoveDispatchData> {
  handle(data: GatewayGuildBanRemoveDispatchData, shard: Shard) {
    let guild;
    if ("guild_id" in data && data.guild_id)
      guild = this.client.guilds.cache.get(data.guild_id);
    const user = new User(data.user, this.client);

    this.client.emit("guildBanRemove", user, guild, shard);
  }
}