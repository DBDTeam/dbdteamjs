const { getAllStamps } = require("../../../Utils/utils.js");
const { ClientUser } = require("../../../structures/Client/ClientUser.js");
const { ClientApplication } = require("../../Client/ClientApplication.js");
const { Guild } = require("../../Guild.js")

module.exports = async (client, d, shard) => {
    client.user = new ClientUser(d.user, client)
    client.application = new ClientApplication(client)
    const guilds = await client.rest.request("GET", "/users/@me/guilds", true)
    if(!guilds.error) {
        for(var guild of guilds.data){
            client.guilds.cache.set(guild.id, new Guild(guild, client))
        }
    }
    client.ready = getAllStamps(new Date())
    client.emit("debug", `Client logged successfully`, shard)
    client.emit("ready", client.user, shard);
    
};