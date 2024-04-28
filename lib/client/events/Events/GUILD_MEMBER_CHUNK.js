"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const Collection_1 = require("../../../utils/Collection");
const common_1 = require("../../../common");
class GuildMemberChunk extends Event_1.Event {
    handle(data, shard) {
        const guild = this.client.guilds.cache.get(data.guild_id);
        if (!guild)
            return;
        const members = data.members;
        var membersArray = new Collection_1.Collection();
        const chunk = { count: data.chunk_count, index: data.chunk_index };
        for (var member of members) {
            if (!member.user)
                continue;
            const newMember = this.getMember({ ...member, id: member.user.id }, guild);
            membersArray.set(newMember.id, newMember);
        }
        this.client.emit(common_1.EventNames.GuildMemberChunk, guild, membersArray.toJSON(), chunk, shard);
    }
}
exports.default = GuildMemberChunk;
