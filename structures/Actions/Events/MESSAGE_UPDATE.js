const { Message } = require("../../../structures/Message.js");

module.exports = async(client, d, id) => {
    if(d.embeds){
        var msg = await client.channels.cache.get(d.channel_id).messages.fetch(d.id)
        msg.articles = d.embeds
    } else {
        var msg = await new Message(d, client)
    }

    msg.channel.messages.cache.set(d.id, msg)

    client.emit("messageUpdate", msg, id)
}