const { Member } = require("../../Member")

module.exports = async(client, d, id) => {
    var guild = client.guilds.cache.get(d.guild_id)

    const member = new Member({ ...d, id: d.user.id}, guild, client)

    guild.members.cache.set(member.id, member)
    guild.approximateMemberCount++
    client.guilds.cache.set(guild.id, guild)

    client.emit("guildMemberAdd", member, guild, id)
}