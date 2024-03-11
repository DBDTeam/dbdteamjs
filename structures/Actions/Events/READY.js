const { ClientUser } = require("../../../structures/Client/ClientUser.js");
const { ClientApplication } = require("../../Client/ClientApplication.js");

module.exports = async (client, d, shard) => {
    client.user = new ClientUser(d.user, client)
    client.application = new ClientApplication(client)
    await waitForAllGuilds(client);
    client.readyTimestamp = Date.now()
    client.emit("debug", `Client logged successfully`, shard)
    client.emit("ready", client.user);
    
};

async function waitForAllGuilds(c) {
    let lastCheckedGuildCount = 0;
    let consecutiveChecks = 0;

    while (true) {
        if (c.guilds.cache.size === lastCheckedGuildCount) {
            consecutiveChecks++;
        } else {
            lastCheckedGuildCount = c.guilds.cache.size;
            consecutiveChecks = 0;
        }

        if (consecutiveChecks >= 3 && lastCheckedGuildCount === c.guilds.cache.size) {
            return;
        } else {
            await sleep(350);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}