"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class GuildStickersUpdate extends Event_1.Event {
    handle(data, shard) {
        const guild = this.client.guilds.cache.get(data.guild_id);
        if (!guild)
            return;
        const stickers = data.stickers;
        for (var sticker of stickers) {
            guild.stickers.set(sticker.id, sticker);
        }
        this.client.emit(common_1.EventNames.GuildStickersUpdate, guild, shard);
    }
}
exports.default = GuildStickersUpdate;
