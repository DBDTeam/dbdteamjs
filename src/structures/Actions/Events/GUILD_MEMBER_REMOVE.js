module.exports = async(client, d, id) => {
    var guild = client.guilds.cache.get(d.guild_id)

    const member = guild.members.cache.get(d.user.id)

    guild.approximateMemberCount--
    client.guilds.cache.set(guild.id, guild)

    client.emit("guildMemberLeave", member, guild, id)

    guild.members.cache.delete(d.user.id)
}