const { readOnly, typeChannel } = require("../../Utils/utils")
const { Collection } = require("../../Utils/Collection")
const Endpoints = require("../../REST/Endpoints")

class GuildChannelManager {
    constructor(guildId, client){
        readOnly(this, "client", client)
        readOnly(this, "guildId", guildId)
        this.cache = new Collection()
        this._fetchAllChannels()
    }

    async _fetchAllChannels() {
        try{
            var allChannels = await this.client.rest.request("GET", Endpoints.GuildChannels(this.guildId), true)
            var _return = new Collection()
            allChannels = allChannels.data

            for(var i of allChannels){
                var guild = this.client.channels.cache.get(i.id)?.guild || this.cache.get(i.id)?.guild
                i.guild = guild
                this.client.channels.cache.set(i.id, typeChannel(i, this.client))
                this.cache.set(i.id, typeChannel(i, this.client))
                _return.set(i.id, typeChannel(i, this.client))
            }

            return _return
        } catch(err) {console.log(err)}
    }
    
    async fetch(id) {
        if(!id || id?.length >= 17 || id?.length <= 18){
            var res = await this._fetchAllChannels()

            return res
        } else {
            var channel = await this.client.rest.request("GET", Endpoints.CHANNEL(id), true)

            channel = channel.data
            this.cache.set(channel.id, channel)
            this.client.channels.cache.set(channel.id, channel)
            return channel
        }
    }

    async create(channelObj = {}) {
        const reason = channelObj?.reason
        const response = this.client.rest.request("POST", Endpoints.GuildChannels(this.guildId), true, channelObj, reason)

        if(response.error){
            return response.error
        } else {
            return await typeChannel(response.data, this.client)
        }
    }

    async delete(channelId, reason) {
        const response = this.client.rest.request("DELETE", Endpoints.Channel(channelId), true, channelObj, reason)

        if(response.error){
            return response.error
        } else {
            return await typeChannel(response.data, this.client)
        }
    }
}

class ChannelManager {
    constructor(client){
        readOnly(this, "client", client)
        this.cache = new Collection();
    }
    
    async fetch(id) {
        var channel = await this.client.rest.request("GET", Endpoints.CHANNEL(id), true)

        channel = channel.data

        return channel
    }
}

module.exports = { GuildChannelManager, ChannelManager }