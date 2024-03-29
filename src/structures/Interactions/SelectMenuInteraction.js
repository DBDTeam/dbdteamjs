const { ComponentInteraction } = require("./ComponentInteraction");

class SelectMenuInteraction extends ComponentInteraction {
    #data
    constructor(data, client) {
        super(data, client)
        this.#data = data
    }
    async __patch() {
        this.values = [...this.#data.data.values];
        const resolvedData = this.#data.data.resolved;
        if (resolvedData) {
            this.resolved = [];
            const resolveTypes = {
                channels: this.guild.channels,
                roles: this.guild.roles,
                users: this.guild.members
            };
            for (const [type, cache] of Object.entries(resolveTypes)) {
                const resolvedItems = resolvedData[type];
                if (resolvedItems) {
                    for (const item of Object.values(resolvedItems)) {
                        if (this.values.includes(item.id)) {
                            let x = cache.cache.get(item.id);
                            if (!x) {
                                x = await cache.fetch(item.id);
                            }
                            this.resolved.push(x);
                        }
                    }
                }
            }
        }
    }
}

module.exports = { SelectMenuInteraction }