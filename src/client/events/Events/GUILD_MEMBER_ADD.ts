import { GatewayGuildMemberAddDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildMemberAdd extends Event<GatewayGuildMemberAddDispatchData> {
  handle(data: GatewayGuildMemberAddDispatchData, shard: Shard) {
    const guild = this.client.guilds.cache.get(data.guild_id);
    if (!guild) return;
    const member = this.getMember(data, guild?.id);

    if (
      guild.approximate_members === null ||
      guild.approximate_members === undefined
    ) {
      guild.approximate_members = 0;
    }

    guild.approximate_members++;
    this.client.guilds.cache.set(data.guild_id, guild);
    this.client.emit(EventNames.GuildMemberAdd, member, shard);
  }
}
