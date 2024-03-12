module.exports = async(client, d, id) => {
    const guild = client.guilds.cache.get(d.id)
    
    const stickers = d.stickers

    for(var i of stickers){
        guild.stickers.set(i.id, i)
    }

    client.emit("guildStickersUpdate", guild, stickers, id)
}