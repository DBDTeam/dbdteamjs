module.exports = async(client, d) => {
    const guild = client.guilds.cache.get(d.id)
    const oldRole = guild.roles.cache.get(d.role_id)
   
    client.emit("guildRoleDelete", guild, newRole, oldRole)
}