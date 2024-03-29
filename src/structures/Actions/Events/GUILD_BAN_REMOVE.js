const { User } = require("../../User")

module.exports = async(client, d, id) => {
    var guild = client.guilds.cache.get(d.guild_id)

    var user = User(d.user, client)

    client.emit("guildBanRemove", user, guild, id)
}