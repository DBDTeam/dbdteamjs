const { Message } = require("../../../structures/Message.js");

module.exports = async(client, d, id) => {
    if(d.embeds){
        var msg = client.channels.cache.get(d.channel_id).messages.cache.get(d.id)
        
        if(!msg) {
            msg = await client.channels.cache.get(d.channel_id).messages.fetch(d.id)
        }

        msg.articles = d.embeds.filter(x => x.type === "article")
    } else {
        var msg = await new Message(d, client)
    }

    msg.channel.messages.cache.set(d.id, msg)

    client.emit("messageUpdate", msg, id)
}