const { GuildRole } = require("../../Role")

module.exports = async(client, d, id) => {
    const guild = client.guilds.cache.get(d.guild_id)

    role = d.role

    guild.roles.cache.set(role.id, new GuildRole(role, guild.id, client))
    client.guilds.cache.set(guild.id, guild)
    client.emit("guildRoleCreate", guild, role, id)
}