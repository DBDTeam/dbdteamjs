"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class GuildCreate extends Event_1.Event {
    async handle(data, shard) {
        const guild = await this.getGuild(data);
        if (!guild)
            return;
        for (var member of data.members) {
            this.getMember({ ...member, id: member.user?.id }, guild.id);
        }
        data.presences;
        if (guild.members?.cache) {
            const membersCache = guild.members.cache;
            data.presences.forEach((presence) => {
                const finded = membersCache.get(presence.user.id);
                if (finded) {
                    if (finded.presence !== presence) {
                        finded.presence = presence;
                        membersCache.set(finded.id, finded);
                    }
                }
            });
        }
        this.client.guilds.cache.set(guild.id, guild);
        if (Date.parse(data.joined_at) == Date.now()) {
            this.client.emit(common_1.EventNames.GuildCreate, guild, shard);
        }
    }
}
exports.default = GuildCreate;
