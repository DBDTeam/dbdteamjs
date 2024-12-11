import { APIEmoji, GatewayGuildEmojisUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Guild, Shard } from "../../../structures";
import { EventNames } from "../../../common";

export default class GuildEmojis extends Event<GatewayGuildEmojisUpdateDispatchData> {
  handle(data: GatewayGuildEmojisUpdateDispatchData, shard: Shard) {
    const guild = this.client.guilds.cache.get(data.guild_id) as Guild;
    
    if (!guild) return;

    var emojis: APIEmoji[] = []

    if(this.client.cacheOpts?.guild_emojis) {
      for (var emoji of data.emojis) {
        guild.emojis.set(emoji.id, emoji);
        this.client.guilds.cache.set(guild.id, guild);
      }
    }

    this.client.emit(EventNames.GuildEmojiUpdate, emojis, guild, shard);
  }
}
