import { GatewayGuildBanAddDispatchData } from "discord-api-types/v10";
import { type Client } from "../../../client/Client";
import { EventNames } from "../../../common";
import { User } from "../../../structures/User";
import { Event } from "../Event";
import { Shard } from "../../../structures";

export default class GuildBanAdd extends Event<GatewayGuildBanAddDispatchData> {
  handle(data: GatewayGuildBanAddDispatchData, shard: Shard) {
    var guild = this.client.guilds.cache.get(data.guild_id);
    var user = new User(data.user, this.client);
    
    if(this.client.cacheOpts?.guild_bans) {
      guild?.bans.cache.set(user.id, user)
    }

    this.client.emit(EventNames.GuildBanAdd, user, guild, shard);
  }
}
