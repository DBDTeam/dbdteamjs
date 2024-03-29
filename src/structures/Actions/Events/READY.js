const { getAllStamps } = require("../../../utils/utils.js");
const { ClientUser } = require("../../../client/ClientUser.js");
const { ClientApplication } = require("../../../client/ClientApplication.js");
const { Guild } = require("../../Guild.js");

module.exports = async (client, d, shard) => {
  client.user = new ClientUser(d.user, client);
  client.application = new ClientApplication(client);
  const guilds = await client.rest.request(
    "GET",
    "/users/@me/guilds?with_counts=true",
    true
  );
  if (!guilds.error) {
    for (var guild of guilds.data) {
      client.guilds.cache.set(guild.id, new Guild(guild, client));
    }
  }
  client.ready = getAllStamps(new Date());
  client.emit("debug", `Client logged successfully`, shard);
  client.emit("ready", client.user, shard);
};
