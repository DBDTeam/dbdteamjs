import { type Client } from "../../../client/Client";
import { User } from "../../../structures/User";

export default async (client: Client, d: any, id: any) => {
  var guild = client.guilds.cache.get(d.guild_id);
  var user = new User(d.user, client);
  // @ts-ignore
  client.emit("guildBanCreate", user, guild, id);
};
