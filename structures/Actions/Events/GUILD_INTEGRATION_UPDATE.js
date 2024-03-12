module.exports = async(client, d, id) => {
    const oldGuild = client.guilds.cache.get(d.id)

    client.emit("guildIntegrationUpdate", oldGuild, id)
}