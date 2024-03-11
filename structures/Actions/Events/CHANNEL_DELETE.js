const { typeChannel } = require("../../../Utils/utils")

module.exports = (client, d, id) => {
    var _old = typeChannel(d, client)

    var guild = client.channels.cache.get(d.id)?.guild

    guild.channels.cache.delete(_old.id)

    client.channels.cache.delete(d.id)

    client.emit("channelDelete", _old)
}