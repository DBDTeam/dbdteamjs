import { GatewayGuildCreateDispatchData, GatewayPresenceUpdate } from "discord-api-types/v10";
import { Event } from "../Event";
import { Guild, Shard } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildCreate extends Event<GatewayGuildCreateDispatchData> {
  async handle(data: GatewayGuildCreateDispatchData, shard: Shard) {
    const guild = await this.getGuild(data);

    if (!guild) return;

    for (var member of data.members) {
      this.getMember({ ...member, id: member.user?.id }, guild.id);
    }

    data.presences

    if (guild.members?.cache) {
      const membersCache = guild.members.cache;
      data.presences.forEach((presence: GatewayPresenceUpdate) => {
        const finded = membersCache.get(presence.user.id);
    
        if (finded) {
          if (finded.presence !== presence) {
            finded.presence = presence;
            membersCache.set(finded.id, finded);
          }
        }
      });
    }
    

    this.client.guilds.cache.set(guild.id, guild);

    if (Date.parse(data.joined_at) == Date.now()) {
      this.client.emit(EventNames.GuildCreate, guild, shard);
    }
  }
}
