const { InteractionBase } = require("./BaseInteraction");

class UserInteraction extends InteractionBase {
    #data;
    constructor(data, client) {
        super(data, client)
        this.target = null;
        this.#data = data;
    }
    async __patch() {
        const key = Object.keys(this.#data?.data?.resolved)?.[0]
        const member = this.guild.members.cache.get(this.#data.data?.target_id || key) || await this.guild.members.fetch(this.#data.resolved.target_id)

        this.target = {
            user: member.user,
            member
        }
    }
}

module.exports = { UserInteraction }