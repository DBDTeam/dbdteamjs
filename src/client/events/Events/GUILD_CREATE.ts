import { GatewayGuildCreateDispatch } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard, ThreadChannel } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildCreate extends Event<GatewayGuildCreateDispatch> {
  handle(data: any, shard: Shard) {
    const guild = this.getGuild(data);

    for (var channel of data.channels) {
      const newChannel = this.getChannel(channel);

      guild.channels.cache.set(newChannel.id, channel);
      this.client.channels.cache.set(newChannel.id, channel);
    }

    for (var thread of data.threads) {
      const newThread = this.getChannel(thread) as ThreadChannel;

      guild.channels.cache.set(newThread.id, thread);
      this.client.channels.cache.set(newThread.id, thread);
    }

    for (var role of data.roles) {
      this.getRole(role, guild.id);
    }

    for (var member of data.members) {
      this.getMember({ ...member, id: member.user.id }, guild.id);
    }

    for (var presence of data.presences) {
      if (!guild.members) return;
      var finded = guild.members.cache.find((x) => x.id === presence.user.id);

      if (!finded) continue;

      finded.presence = presence;
      guild.members.cache.set(finded.id, finded);
    }

    this.client.guilds.cache.set(guild.id, guild);

    const stamp = Date.parse(data.joined_at);

    if (stamp > Date.now() - 200) {
      this.client.emit(EventNames.GuildCreate, guild, shard);
    }
  }
}
