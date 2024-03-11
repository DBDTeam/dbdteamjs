const { readOnly, getAllStamps } = require("../Utils/utils");
const { Member } = require("./Member");

class ThreadMember {
    #client;
    constructor(data, guild, client) {
        this.#client = client;
        this.member = new Member(data, guild, this.#client)
        this.threadId = data.id
        if(this.#client.channels.cache.get(data.id)){
            this.thread = this.#client.channels.cache.get(data.id)
        }
        this.id = data.user_id
        this.guild = data.guild || guild
        this.flags = data.flags || 0
        this.joined = getAllStamps(data.joined_timestamp)
        readOnly(this, "remove", () => this.kick())
    }

    async kick() {
        const response = await this.#client.rest.request("DELETE", `/channels/${this.threadId}/thread-members/${this.id}`, true)

        return response?.error ? response : true
    }
}

module.exports = { ThreadMember }