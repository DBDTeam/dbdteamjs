const { User } = require("../../User")

module.exports = async(client, d, id) => {
    client.users.cache.set(d.user.id, new User(d.user, client))
    const guild = client.guilds.cache.get(d.guild_id)
    var oldMember = guild.members.cache.get(d.user.id)

    var newMember = oldMember ? oldMember : await guild.members.fetch(d.user.id)

    newMember.presence = {
        status: d.status,
        activities: d.activities,
        platforms: d.client_status
    }

    guild.members.cache.set(d.user.id, newMember)

    client.emit("presenceUpdate", oldMember, newMember, guild)
}