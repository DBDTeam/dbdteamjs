"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../structures/User");
const Event_1 = require("../Event");
class GuildBanRemove extends Event_1.Event {
    handle(data, shard) {
        let guild;
        if ("guild_id" in data && data.guild_id)
            guild = this.client.guilds.cache.get(data.guild_id);
        const user = new User_1.User(data.user, this.client);
        this.client.emit("guildBanRemove", user, guild, shard);
    }
}
exports.default = GuildBanRemove;
/*
 * verga, tienes razón, disculpanos x,d
 * Ok, se complicó
 * La del Geremías es mejor
 * Pensé que la de Jeremías, pero bue
 * XD
 * Listo, archivado
 */
// No me la compliques wawi soy nuevo :(
// sigue esta estructura
// export default class GuildBanRemove extends Event<GatewayGuildBanRemoveDispatch> {
//   handle(data: GatewayGuildBanRemoveDispatch) {
//     data;
//   }
// }
