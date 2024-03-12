const { typeChannel } = require("../../../Utils/utils")

module.exports = (client, d, id) => {
    var _old = client.channels.cache.get(d.id)
    d.guild = client.channels.cache.get(d.id)?.guild || client.guilds.cache.get(d.guildId)
    var _new = client.channels.cache.set(d.id, typeChannel(d, client))
    client.guilds.cache.forEach((x) => {
        if(x.id === d.guild_id){
            d.guild = x.guild
            x.channels.cache.set(d.id, typeChannel(d, client))
        }
    })

    client.emit("channelUpdate", _old, _new, id)
}