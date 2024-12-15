"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class GuildMemberUpdate extends Event_1.Event {
    handle(data, shard) {
        const guild = this.client.guilds.cache.get(data.guild_id);
        const oldMember = guild?.members?.cache.get(data.user.id);
        const newMember = this.getMember(data, guild?.id);
        this.client.users.cache.set(newMember.id, newMember.user);
        this.client.emit(common_1.EventNames.GuildMemberUpdate, oldMember, newMember, shard);
    }
}
exports.default = GuildMemberUpdate;
