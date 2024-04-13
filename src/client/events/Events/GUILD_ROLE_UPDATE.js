const { GuildRole } = require("../../Role")

module.exports = async(client, d, id) => {
    const guild = client.guilds.cache.get(d.guild_id)
    const oldRole = guild.roles.cache.get(d.role.id)

    const newRole = d.role

    guild.roles.cache.set(newRole.id, new GuildRole(newRole, guild.id, client))
    client.guilds.cache.set(guild.id, guild)
   
    client.emit("guildRoleUpdate", guild, newRole, oldRole, id)
}