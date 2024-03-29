const { Collection } = require("../../../utils/Collection");
const { Member } = require("../../Member");

module.exports = (client, d, id) => {
  const guild = client.guilds.cache.get(d.guild_id);

  const members = d.members;
  const f = new Collection();
  const chunk = { count: d.chunk_count, index: d.chunk_index };

  for (var i of members) {
    const memb = new Member({ ...i, id: i.user.id });
    guild.members.cache.set(i.user.id, memb);
    f.set(i.user.id, memb);
  }

  client.emit("guildMemberChunk", guild, f.toJSON(), chunk, id);
};
