const { readOnly } = require("../../Utils/utils")
const { Collection } = require("../../Utils/Collection")
const Endpoints = require("../../REST/Endpoints")

class GuildManager {
    constructor(client){
        readOnly(this, "client", client)
        this.cache = new Collection()
    }
    async fetch(id) {
        var guild = await this.client.rest.request("GET", Endpoints.Guild(id), true)

        guild = guild.data

        return guild
    }
}

module.exports = { GuildManager }