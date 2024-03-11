module.exports = async(client, d, id) => {
    var guild = client.guilds.cache.get(d.guild_id)

    const member = guild.members.cache.get(d.user.id)

    client.emit("guildMemberLeave", member, guild)

    guild.members.cache.delete(d.user.id)
}