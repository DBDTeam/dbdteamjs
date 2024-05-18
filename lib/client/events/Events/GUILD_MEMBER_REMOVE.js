"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class GuildMemberRemove extends Event_1.Event {
    handle(data, shard) {
        const guild = this.client.guilds.cache.get(data.guild_id);
        if (!guild)
            return;
        const oldMember = guild?.members?.cache.get(data.user.id);
        if (!oldMember)
            return;
        guild?.members?.cache.delete(data.user.id);
        if (guild.approximate_members === null ||
            guild.approximate_members === undefined) {
            guild.approximate_members = 0;
        }
        guild.approximate_members--;
        this.client.emit(common_1.EventNames.GuildMemberLeave, oldMember, shard);
    }
}
exports.default = GuildMemberRemove;
