import { GatewayGuildStickersUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildStickersUpdate extends Event<GatewayGuildStickersUpdateDispatchData> {
  handle(data: GatewayGuildStickersUpdateDispatchData, shard: Shard) {
    const guild = this.client.guilds.cache.get(data.guild_id);

    if (!guild) return;

    const stickers = data.stickers;

    for (var sticker of stickers) {
      guild.stickers.set(sticker.id, sticker);
    }

    this.client.emit(EventNames.GuildStickersUpdate, guild, shard);
  }
}
