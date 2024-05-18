"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const structures_1 = require("../../../structures");
const common_1 = require("../../../common");
class GuildRoleUpdate extends Event_1.Event {
    handle(data, shard) {
        const guild = this.client.guilds.cache.get(data.guild_id);
        if (!guild)
            return;
        const oldRole = guild.roles?.cache.get(data.role.id);
        const newRole = new structures_1.GuildRole(data.role, guild, this.client);
        guild.roles?.cache.set(data.role.id, newRole);
        this.client.emit(common_1.EventNames.GuildRoleUpdate, newRole, oldRole, shard);
    }
}
exports.default = GuildRoleUpdate;
