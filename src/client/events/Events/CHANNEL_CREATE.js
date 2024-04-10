const { typeChannel } = require("../../../utils/utils");

module.exports = (client, d, id) => {
  d.guild = client.guilds.cache.get(d.guild_id).guild;

  const channel = client.channels.cache.set(d.id, typeChannel(d, client));

  d.guild.channels.set(d.id, typeChannel(d, client));

  client.emit("channelDelete", channel, id);
};
