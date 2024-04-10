const { ThreadChannel } = require("../../ThreadChannel")

module.exports = async(client, d, shardId) => {
    var _new = {...d}
    _new.guild = client.guilds.cache.get(_new.guild_id || d.guild_id)
    
    _new = new ThreadChannel(_new, client)
    
    const _old = _new.guild.channels.cache.get(_new.id || d.id)

    _new.guild.channels.cache.set(_new.id, _new)
    client.channels.cache.set(_new.id, _new)

    console.log(d)
    client.emit("threadUpdate", _new, _old, shardId)
}