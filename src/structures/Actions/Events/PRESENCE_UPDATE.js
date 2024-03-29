const { Member } = require("../../Member")
const { User } = require("../../User")

module.exports = async(client, d, id) => {
    client.users.cache.set(d.user.id, new User(d.user, client))
    const user = client.users.cache.get(d.user.id)
    const guild = client.guilds.cache.get(d.guild_id)
    var oldPresence = guild.members.cache.get(d.user.id)

    const newPresence = {
        status: d.status,
        activities: d.activities,
        platforms: d.client_status
    }

    if(oldPresence instanceof Member){
        oldPresence.presence = newPresence
        guild.members.cache.set(d.user.id, oldPresence)
    }

    client.emit("presenceUpdate", user, {old: oldPresence?.presence, new: newPresence}, guild)
}