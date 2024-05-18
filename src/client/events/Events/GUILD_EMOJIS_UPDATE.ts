import { GatewayGuildEmojisUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildEmojis extends Event<GatewayGuildEmojisUpdateDispatchData> {
  handle(data: GatewayGuildEmojisUpdateDispatchData, shard: Shard) {
    const guild = this.client.guilds.cache.get(data.guild_id);

    if (!guild) return;

    for (var emoji of data.emojis) {
      guild.emojis.set(emoji.id, emoji);
    }

    this.client.guilds.cache.set(guild.id, guild);

    this.client.emit(EventNames.GuildEmojiUpdate, guild, shard);
  }
}
