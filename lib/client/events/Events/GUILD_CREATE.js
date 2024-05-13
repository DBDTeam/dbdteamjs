"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class GuildCreate extends Event_1.Event {
    handle(data, shard) {
        const guild = this.getGuild(data);
        if (!guild)
            return;
        for (const channel of data.channels) {
            this.getChannel(channel);
        }
        for (const thread of data.threads) {
            this.getChannel(thread);
        }
        for (var role of data.roles) {
            this.getRole(role, guild.id);
        }
        for (var member of data.members) {
            this.getMember({ ...member, id: member.user.id }, guild.id);
        }
        if (guild.members) {
            data.presences.forEach((presence) => {
                const finded = guild.members?.cache.find(x => x.id === presence.user.id);
                if (finded) {
                    finded.presence = presence;
                    guild.members?.cache.set(finded.id, finded);
                }
            });
        }
        this.client.guilds.cache.set(guild.id, guild);
        const stamp = Date.parse(data.joined_at);
        if (stamp > Date.now() - 200) {
            this.client.emit(common_1.EventNames.GuildCreate, guild, shard);
        }
    }
}
exports.default = GuildCreate;
