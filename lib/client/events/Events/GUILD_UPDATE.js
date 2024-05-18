"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class GuildCreate extends Event_1.Event {
    handle(data, shard) {
        const oldGuild = this.client.guilds.cache.get(data.id);
        const newGuild = this.getGuild(data);
        if (!newGuild)
            return;
        for (const channel of data.channels) {
            this.getChannel(channel);
        }
        for (const thread of data.threads) {
            this.getChannel(thread);
        }
        for (var role of data.roles) {
            this.getRole(role, newGuild.id);
        }
        for (var member of data.members) {
            this.getMember({ ...member, id: member.user.id }, newGuild.id);
        }
        if (newGuild.members) {
            data.presences.forEach((presence) => {
                const finded = newGuild.members?.cache.find((x) => x.id === presence.user.id);
                if (finded) {
                    finded.presence = presence;
                    newGuild.members?.cache.set(finded.id, finded);
                }
            });
        }
        this.client.guilds.cache.set(newGuild.id, newGuild);
        this.client.emit(common_1.EventNames.GuildUpdate, oldGuild, newGuild, shard);
    }
}
exports.default = GuildCreate;
