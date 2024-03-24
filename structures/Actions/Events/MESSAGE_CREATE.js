const { Message } = require("../../../structures/Message.js");
const { Member } = require("../../Member.js");

module.exports = async(client, d, id) => {
    var msg = await new Message(d, client)
    msg?.channel?.messages?.cache?.set(d.id, msg)
    if(d.member && !msg?.guild?.members.cache.get(d.author.id)){
        msg?.guild?.members?.cache.set(d.author.id, new Member({...d.member, id: d.author.id}, msg.guild, client))
    }
    client.emit("messageCreate", msg, id)
}