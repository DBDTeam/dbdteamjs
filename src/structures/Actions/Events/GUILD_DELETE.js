module.exports = async(client, d, id) => {
    if(d.unavaible){
        client.emit("guildUnavailable", client.guilds.cache.get(d.id))
        client.guilds.cache.set(d.id, d)
    } else {
        client.emit("guildLeave", client.guilds.cache.get(d.id), id)
        client.guilds.cache.delete(d.id)
    }
}