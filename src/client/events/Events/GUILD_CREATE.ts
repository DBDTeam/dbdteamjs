import { GatewayGuildCreateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Guild, Shard } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildCreate extends Event<GatewayGuildCreateDispatchData> {
  async handle(data: GatewayGuildCreateDispatchData, shard: Shard) {
    const guild = await this.getGuild(data);

    if (!guild) return;

    for (var role of data.roles) {
      await this.getRole(role, guild.id);
    }

    for (const channel of data.channels) {
      this.getChannel(channel);
    }

    for (const thread of data.threads) {
      this.getChannel(thread);
    }

    for (var member of data.members) {
      this.getMember({ ...member, id: member.user?.id }, guild.id);
    }

    if (guild.members) {
      data.presences.forEach((presence: any) => {
        const finded = guild.members?.cache.find(
          (x) => x.id === presence.user.id
        );
        if (finded) {
          finded.presence = presence;
          guild.members?.cache.set(finded.id, finded);
        }
      });
    }

    this.client.guilds.cache.set(guild.id, guild);

    const stamp = Date.parse(data.joined_at);

    if (stamp == Date.now()) {
      this.client.emit(EventNames.GuildCreate, guild, shard);
    }
  }
}
