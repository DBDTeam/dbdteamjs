"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class GuildRoleCreate extends Event_1.Event {
    handle(data, shard) {
        const guild = this.client.guilds.cache.get(data.guild_id);
        const role = this.getRole(data, guild?.id);
        if (!role)
            return;
        this.client.emit(common_1.EventNames.GuildRoleCreate, role, shard);
    }
}
exports.default = GuildRoleCreate;
