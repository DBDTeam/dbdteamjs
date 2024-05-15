"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
class GuildUpdate extends Event_1.Event {
    handle(data, shard) {
        const oldGuild = this.client.guilds.cache.get(data.id);
        if (!oldGuild)
            return;
        const newGuild = this.getGuild(data);
        this.client.emit("guildUpdate", oldGuild, newGuild, shard);
    }
}
exports.default = GuildUpdate;
