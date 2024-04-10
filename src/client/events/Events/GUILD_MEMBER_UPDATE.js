const { Member } = require("../../Member")

module.exports = async(client, d, id) => {
    var guild = client.guilds.cache.get(d.guild_id)

    const oldMember = guild.members.cache.get(d.user.id)

    const newMember = new Member({ ...d, id: d.user.id}, guild, client)

    guild.members.cache.set(newMember.id, newMember)

    client.emit("guildMemberUpdate", oldMember, newMember, guild, id)
}