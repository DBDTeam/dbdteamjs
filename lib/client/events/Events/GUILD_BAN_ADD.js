"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../../common");
const User_1 = require("../../../structures/User");
exports.default = async (client, d, id) => {
    var guild = client.guilds.cache.get(d.guild_id);
    var user = new User_1.User(d.user, client);
    client.emit(common_1.EventNames.GuildBanAdd, user, guild, id);
};
