import { GatewayGuildCreateDispatch } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildCreate extends Event<GatewayGuildCreateDispatch> {
  handle(data: any, shard: Shard) {
    const guild = this.getGuild(data);

    if(!guild) return;

    for (const channel of data.channels) {
      this.getChannel(channel)
    }
    
    for (const thread of data.threads) {
      this.getChannel(thread)
    }
    
    for(var role of data.roles){
      this.getRole(role, guild.id)
    }
    
    for(var member of data.members){
      this.getMember({ ...member, id: member.user.id }, guild.id)
    }
    
    if (guild.members) {
      data.presences.forEach((presence: any) => {
        const finded = guild.members?.cache.find(x => x.id === presence.user.id);
        if (finded) {
          finded.presence = presence;
          guild.members?.cache.set(finded.id, finded);
        }
      });
    }
    
    this.client.guilds.cache.set(guild.id, guild);
    
    const stamp = Date.parse(data.joined_at);

    if (stamp > Date.now() - 200) {
      this.client.emit(EventNames.GuildCreate, guild, shard);
    }
  }
}
