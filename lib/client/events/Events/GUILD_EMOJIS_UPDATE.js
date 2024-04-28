"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class GuildEmojis extends Event_1.Event {
    handle(data, shard) {
        const guild = this.client.guilds.cache.get(data.guild_id);
        if (!guild)
            return;
        for (var emoji of data.emojis) {
            guild.emojis.set(emoji.id, emoji);
        }
        this.client.guilds.cache.set(guild.id, guild);
        this.client.emit(common_1.EventNames.GuildEmojiUpdate, guild, shard);
    }
}
exports.default = GuildEmojis;
