module.exports = async(client, d) => {
    const guild = client.guilds.cache.get(d.guild_id)
    const oldRole = guild.roles.cache.get(d.role.id)

    const newRole = d.role

    guild.roles.cache.set(newRole.id, newRole)
   
    client.emit("guildRoleUpdate", guild, newRole, oldRole)
}