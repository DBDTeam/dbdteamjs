const { Message } = require("../../../structures/Message.js");

module.exports = async(client, d, id) => {
    var msg = await new Message(d, client)
    
    msg.channel.messages.cache.set(d.id, msg)

    client.emit("messageUpdate", msg, id)
}