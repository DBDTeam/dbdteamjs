"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class GuildCreate extends Event_1.Event {
    handle(data, shard) {
        const guild = this.getGuild(data);
        for (var channel of data.channels) {
            const newChannel = this.getChannel(channel);
            guild.channels.cache.set(newChannel.id, channel);
            this.client.channels.cache.set(newChannel.id, channel);
        }
        for (var thread of data.threads) {
            const newThread = this.getChannel(thread);
            guild.channels.cache.set(newThread.id, thread);
            this.client.channels.cache.set(newThread.id, thread);
        }
        for (var role of data.roles) {
            this.getRole(role, guild.id);
        }
        for (var member of data.members) {
            this.getMember({ ...member, id: member.user.id }, guild.id);
        }
        for (var presence of data.presences) {
            if (!guild.members)
                return;
            var finded = guild.members.cache.find((x) => x.id === presence.user.id);
            if (!finded)
                continue;
            finded.presence = presence;
            guild.members.cache.set(finded.id, finded);
        }
        this.client.guilds.cache.set(guild.id, guild);
        const stamp = Date.parse(data.joined_at);
        if (stamp > Date.now() - 200) {
            this.client.emit(common_1.EventNames.GuildCreate, guild, shard);
        }
    }
}
exports.default = GuildCreate;
