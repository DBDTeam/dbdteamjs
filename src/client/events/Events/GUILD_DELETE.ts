import { GatewayGuildDeleteDispatch } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildDelete extends Event<GatewayGuildDeleteDispatch> {
  handle(data: any, shard: Shard) {
    if (data.unavaible) {
      this.client.emit(
        EventNames.GuildUnavailable,
        this.client.guilds.cache.get(data.id) || data,
        shard
      );
    }

    const oldGuild = this.client.guilds.cache.get(data.id);

    if (!oldGuild) return;

    this.client.guilds.cache.delete(oldGuild.id);

    this.client.emit(EventNames.GuildDelete, oldGuild, shard);
  }
}
