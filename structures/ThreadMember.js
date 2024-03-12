const { readOnly, getAllStamps } = require("../Utils/utils");
const { Member } = require("./Member");
const Endpoints = require("../REST/Endpoints")

class ThreadMember {
    #client;
    constructor(data, guild, client) {
        this.#client = client;
        this.id = data.user_id
        this.guild = data.guild || guild
        this.flags = data.flags || 0
        this.member = data.member ? new Member({...data.member, id: this.id}, guild, this.#client) : this.guild.members.cache.get(this.id)
        this.threadId = data.id
        if(this.#client.channels.cache.get(data.id)){
            this.thread = this.#client.channels.cache.get(data.id)
        }
        this.joined = getAllStamps(data.joined_timestamp)
        readOnly(this, "remove", () => this.kick())
    }

    async kick() {
        const response = await this.#client.rest.request("DELETE", Endpoints.ChannelThreadMember(this.id), true)

        return response?.error ? response : true
    }
}

module.exports = { ThreadMember }