const { ChannelTypes } = require("../../../Types/ChannelTypes")

module.exports = async(client, d, shard) => {
    for(var ch of client.channels.cache.toJSON()){
        if(ch.type === ChannelTypes.Voice){
            ch.sessionId = d.session_id
            client.channels.cache.set(ch.id, ch)
            client.guilds.cache.get(d.guild_id, ch)
        }
    }
}