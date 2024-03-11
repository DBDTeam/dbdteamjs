const { ThreadChannel } = require("../../ThreadChannel")

module.exports = async(client, d, shardId) => {
    var thread = d
    thread.guild = client.guilds.cache.get(thread.guild_id)

    
    thread = new ThreadChannel(thread, client)
    
    thread.guild.channels.cache.set(thread.id, thread)
    client.channels.cache.set(thread.id, thread)

    client.emit("threadCreate", thread)
}