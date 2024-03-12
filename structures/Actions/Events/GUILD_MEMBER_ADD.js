const { Member } = require("../../Member")

module.exports = async(client, d, id) => {
    var guild = client.guilds.cache.get(d.guild_id)

    const member = new Member({ ...d, id: d.user.id}, guild, client)

    guild.members.cache.set(member.id, member)

    client.emit("guildMemberAdd", member, guild, id)
}