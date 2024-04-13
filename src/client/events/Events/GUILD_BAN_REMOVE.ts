import { GatewayGuildBanRemoveDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { User } from "../../../structures/User";
import { Event } from "../Event";

export default class GuildBanRemove extends Event<GatewayGuildBanRemoveDispatchData> {
  handle(data: GatewayGuildBanRemoveDispatchData, shard: Shard) {
    let guild;
    if ("guild_id" in data && data.guild_id)
      guild = this.client.guilds.cache.get(data.guild_id);
    const user = new User(data.user, this.client);

    this.client.emit("guildBanRemove", user, guild, shard);
  }
}

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
