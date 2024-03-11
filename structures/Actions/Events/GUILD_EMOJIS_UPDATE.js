module.exports = async(client, d) => {
    const guild = client.guilds.cache.get(d.id)
    
    const emojis = d.emojis

    for(var i of emojis){
        guild.emojis.set(i.id, i)
    }

    client.emit("guildEmojisUpdate", guild, emojis)
}