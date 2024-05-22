"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class ChannelDelete extends Event_1.Event {
    async handle(data, shard) {
        let guild;
        let _old = this.client.channels.cache.get(data.id);
        if (!_old)
            return;
        if ("guild_id" in data && data.guild_id)
            guild = this.client.guilds.cache.get(data.guild_id);
        if (guild)
            guild.channels.cache.delete(_old.id);
        this.client.channels.cache.delete(data.id);
        this.client.emit(common_1.EventNames.ChannelDelete, _old, data.id, shard);
    }
}
exports.default = ChannelDelete;
