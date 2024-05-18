import { GatewayGuildBanAddDispatch } from "discord-api-types/v10";
import { type Client } from "../../../client/Client";
import { EventNames } from "../../../common";
import { User } from "../../../structures/User";
import { Event } from "../Event";
import { Shard } from "../../../structures";

export default class GuildBanAdd extends Event<GatewayGuildBanAddDispatch> {
  handle(data: any, shard: Shard) {
    var guild = this.client.guilds.cache.get(data.guild_id);
    var user = new User(data.user, this.client);

    this.client.emit(EventNames.GuildBanAdd, user, guild, shard);
  }
}
