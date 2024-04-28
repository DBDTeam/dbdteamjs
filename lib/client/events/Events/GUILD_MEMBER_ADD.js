"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class GuildMemberAdd extends Event_1.Event {
    handle(data, shard) {
        const guild = this.client.guilds.cache.get(data.guild_id);
        const member = this.getMember(data, guild?.id);
        //@ts-ignore
        guild?.approximate_members++;
        this.client.guilds.cache.set(data.guild_id, guild);
        this.client.emit(common_1.EventNames.GuildMemberAdd, member, shard);
    }
}
exports.default = GuildMemberAdd;
