"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const Event_1 = require("../Event");
class ChannelDelete extends Event_1.Event {
    async handle(data, shard) {
        let guild;
        let _old = (0, utils_1.typeChannel)(data, this.client);
        this.client.channels.cache.get(data.id)?.guild;
        if ("guild_id" in data && data.guild_id)
            guild = this.client.guilds.cache.get(data.guild_id);
        //nope, i mean, only is needed when the code has more than on line of code, i mean:
        /**e
         if(a == b) c()
    
        if(a == b) {
          a == c
        }
         */
        if (guild)
            guild.channels.cache.delete(_old.id);
        this.client.channels.cache.delete(data.id);
        // @ts-ignore
        this.client.emit("channelDelete", _old, data.id, shard);
    } // El inglés: NIGERIA
}
exports.default = ChannelDelete;
