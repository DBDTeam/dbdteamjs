module.exports = async(client, d) => {
    const oldGuild = client.guilds.cache.get(d.id)

    client.emit("guildIntegrationUpdate", oldGuild)
}