"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../common");
const User_1 = require("../../../structures/User");
const Event_1 = require("../Event");
class GuildBanAdd extends Event_1.Event {
    handle(data, shard) {
        var guild = this.client.guilds.cache.get(data.guild_id);
        var user = new User_1.User(data.user, this.client);
        this.client.emit(common_1.EventNames.GuildBanAdd, user, guild, shard);
    }
}
exports.default = GuildBanAdd;
