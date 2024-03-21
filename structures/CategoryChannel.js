const { Collection } = require("../Utils/Collection");
const { Channel } = require("./DefaultChannel");

class CategoryChannel extends Channel {
    /**
     * Represents a CategoryChannel
     * @param {object} data 
     * @param {Client} client 
     */
    constructor(data, client){
        super(data, client)
    }
    /**
     * Returns the channels that are in the cache.
     * @type {Collection<string, TextChannel | VoiceChannel | DefaultChannel | ThreadChannel>}
     */
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