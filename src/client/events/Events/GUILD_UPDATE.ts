import { Event } from "../Event";
import { Guild, Shard } from "../../../structures";
import { EventNames } from "../../../common";
import { GatewayGuildUpdateDispatchData } from "discord-api-types/v10";

export default class GuildCreate extends Event<GatewayGuildUpdateDispatchData> {
  handle(data: any, shard: Shard) {
    const oldGuild = this.client.guilds.cache.get(data.id);
    const newGuild = this.getGuild(data);

    if (!newGuild) return;

    for (const channel of data.channels) {
      this.getChannel(channel);
    }

    for (const thread of data.threads) {
      this.getChannel(thread);
    }

    for (var role of data.roles) {
      this.getRole(role, newGuild.id);
    }

    for (var member of data.members) {
      this.getMember({ ...member, id: member.user.id }, newGuild.id);
    }

    if (newGuild.members) {
      data.presences.forEach((presence: any) => {
        const finded = newGuild.members?.cache.find(
          (x) => x.id === presence.user.id
        );
        if (finded) {
          finded.presence = presence;
          newGuild.members?.cache.set(finded.id, finded);
        }
      });
    }

    this.client.guilds.cache.set(newGuild.id, newGuild);

    this.client.emit(
      EventNames.GuildUpdate,
      oldGuild as Guild,
      newGuild,
      shard
    );
  }
}
