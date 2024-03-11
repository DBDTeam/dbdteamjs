const { Collection } = require("../../Utils/Collection");
const { setObj } = require("../../Utils/utils");
const Endpoints = require("../../REST/Endpoints");
const { Message } = require("../Message");

class ChannelMessageManager {
    #client;
    constructor(channel, client) {
        this.guild = channel.guild
        this.channel = channel
        this.#client = client
        this.cache = new Collection()
    }

    async fetch(msgId = {}) {
        if(typeof msgId === "object" && msgId instanceof Object) {
            const config = {
                limit: 50,
                after: null,
                before: null,
                around: null
            }

            const data = setObj(config, msgId, {})

            var endpoint = Endpoints.ChannelMessages(channel.id)

            if(data.limit >= 1 && data.limit <= 100){
                endpoint += "?limit="+data.limit
            }
            if(data.after){
                endpoint += "?after="+data.after
            }
            if(data.before){
                endpoint += "?before="+data.before
            }
            if(data.around){
                endpoint += "?around="+data.around
            }

            const messages = await this.#client.rest.request("GET", endpoint, true)

            if(messages.error){
                return null
            } else {
                var response = []
                for(var i of messages.data){
                    const msg = new Message(i, this.#client)

                    if(this.channel.messages.cache.get(i.id)){
                        this.channel.messages.cache.set(i.id, msg)
                    }

                    response.push(msg)
                }

                return response
            }
        } else if (typeof msgId === "string") {
            const response = await this.#client.rest.request("GET", Endpoints.ChannelMessage(channel.id, msgId), true)

            if(response.error) {
                return null
            } else {
                const msg = new Message(response.data, this.#client)
                if(this.channel.messages.cache.get(response.data.id)){
                    this.channel.messages.cache.set(response.data.id, msg)
                }
                return msg
            }
        }
    }
}

module.exports = { ChannelMessageManager }