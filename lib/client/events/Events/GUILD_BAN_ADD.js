"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../structures/User");
exports.default = async (client, d, id) => {
    var guild = client.guilds.cache.get(d.guild_id);
    var user = new User_1.User(d.user, client);
    // @ts-ignore
    client.emit("guildBanCreate", user, guild, id);
};
