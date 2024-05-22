"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class ThreadDelete extends Event_1.Event {
    handle(data, shard) {
        let oldThreadChannel = this.client.channels.cache.get(data.id);
        if (!oldThreadChannel)
            return;
        let guild = this.client.guilds.cache.get(oldThreadChannel.guild?.id || data.guild_id);
        if (guild) {
            guild.channels.cache.delete(data.id);
        }
        this.client.channels.cache.delete(data.id);
        this.client.emit(common_1.EventNames.ThreadDelete, oldThreadChannel, shard);
    }
}
exports.default = ThreadDelete;
