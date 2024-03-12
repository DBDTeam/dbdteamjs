const Endpoints = require("../../REST/Endpoints.js")
const { getId } = require("../../Utils/utils.js")

class MessageReactions { 
    #client;
    constructor(client, msgObj, reacts) {
        this.#client = client
        this.messageId = msgObj.id
        this.channelId = msgObj.channelId
        this.guildId = msgObj.guildId
        this.reactions = reacts
    }

    get count() {
        return this.reactions.length
    }

    async remove(obj) {
        var emojis = obj.emojis || obj.emoji
        var user = obj.user || obj.userId || "@me"
        
        var results = []

        if(typeof emojis === "object" && Array.isArray(emojis)){
            for(var i of emojis){
                var emoji = encodeURIComponent(getId(i))
        
                var result = await this.#client.rest.request("DELETE", Endpoints.ChannelMessageReactionUser(this.channelId, this.id, emoji, user), true)

                results.push(result)
            }

            return result
        } else {
            var emoji = encodeURIComponent(getId(i))
        
            var result = await this.#client.rest.request("DELETE", Endpoints.ChannelMessageReactionUser(this.channelId, this.messageId, emoji, user), true)

            return result
        }
    }
    
    async add(...emojis) {
        var results = []
        for(var i of emojis){
            var emoji = encodeURIComponent(getId(i))

            var result = await this.#client.rest.request("PUT", Endpoints.ChannelMessageReactionUser(this.channelId, this.messageId, emoji, "@me"), true)
            
            results.push(result)
        }

        return results
    }
    
    async removeAll() {
        var result = await this.#client.rest.request("DELETE", Endpoints.ChannelMessageReactions(this.channelId, this.messageId), true)
            
        return result
    }
}

module.exports = { MessageReactions }