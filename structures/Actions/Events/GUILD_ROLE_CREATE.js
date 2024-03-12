module.exports = async(client, d, id) => {
    const guild = client.guilds.cache.get(d.id)

    role = d.role

    guild.roles.cache.set(role.id, role)
   
    client.emit("guildRoleCreate", guild, role, id)
}