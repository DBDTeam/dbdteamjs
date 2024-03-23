module.exports = async (client, d, id) => {
    const guild = client.guilds.cache.get(d.guild_id)
    const oldRole = guild.roles.cache.get(d.role_id)
    guild.roles.cache.delete(oldRole.id)
    client.guilds.cache.set(guild.id, guild)

    client.emit("guildRoleDelete", guild, oldRole, id)
}