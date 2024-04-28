"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class GuildDelete extends Event_1.Event {
    handle(data, shard) {
        if (data.unavaible) {
            this.client.emit(common_1.EventNames.GuildUnavailable, this.client.guilds.cache.get(data.id) || data, shard);
        }
        const oldGuild = this.client.guilds.cache.get(data.id);
        if (!oldGuild)
            return;
        this.client.guilds.cache.delete(oldGuild.id);
        this.client.emit(common_1.EventNames.GuildDelete, oldGuild, shard);
    }
}
exports.default = GuildDelete;
