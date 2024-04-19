import { type Client } from "../../../client/Client";
import { EventNames } from "../../../common";
import { User } from "../../../structures/User";

export default async (client: Client, d: any, id: any) => {
  var guild = client.guilds.cache.get(d.guild_id);
  var user = new User(d.user, client);

  client.emit(EventNames.GuildBanAdd, user, guild, id);
};
