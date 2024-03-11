const { Collection } = require("../Utils/Collection");
const { Channel } = require("./DefaultChannel");

class CategoryChannel extends Channel {
    constructor(data, client){
        super(data, client)
        this._patch()
    }
    async _patch() {
        
    }
    get channels() {
        const categoryChannels = new Collection();
        for (const channel of this.guild.channels.cache.values()) {
            if (channel.parentId === this.id) {
                categoryChannels.set(channel.id, channel);
            }
        }
        return categoryChannels;
    }
}

module.exports = { CategoryChannel }