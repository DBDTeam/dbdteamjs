const { ChannelTypes } = require("../../../Types/ChannelTypes")

module.exports = async(client, d, shard) => {
    var guild = client.guilds.cache.get(d.guild_id)

    guild.token = d.token
    guild.endpoint = d.endpoint

    client.guilds.cache.set(d.guild_id, guild)
}