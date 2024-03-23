const { Message } = require("../../../structures/Message.js");

module.exports = async (client, d, id) => {
    var msg;

    const channel = client.channels.cache.get(d.channel_id);
    if (!channel) return;

    if (d.embeds) {
        msg = channel.messages.cache.get(d.id);
        if (!msg) msg = await channel.messages.fetch(d.id);
        msg.articles = d.embeds.filter(x => x.type === "article");
    } else {
        msg = d.author ? await new Message(d, client) : channel.messages.cache.get(d.id) || await channel.messages.fetch(d.id);
    }

    if (msg) msg.channel.messages.cache.set(d.id, msg);
    client.emit("messageUpdate", msg, id);
};