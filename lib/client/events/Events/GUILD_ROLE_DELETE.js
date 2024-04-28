"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class GuildRoleDelete extends Event_1.Event {
    handle(data, shard) {
        const guild = this.client.guilds.cache.get(data.guild_id);
        const oldRole = guild?.roles?.cache.get(data.role_id);
        if (!oldRole)
            return;
        guild?.roles?.cache.delete(data.role_id);
        this.client.emit(common_1.EventNames.GuildRoleDelete, oldRole, shard);
    }
}
exports.default = GuildRoleDelete;
