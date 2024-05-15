"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const structures_1 = require("../../../structures");
class PresenceUpdate extends Event_1.Event {
    handle(data, shard) {
        const guild = this.client.guilds.cache.get(data.guild_id);
        if (!guild)
            return;
        const member = guild.members?.cache.get(data.user.id);
        if (!member || !(member instanceof structures_1.Member))
            return;
        const oldPresence = member.presence;
        const newPresence = {
            status: data.status,
            activities: data.activities,
            platforms: data.client_status
        };
        member.presence = newPresence;
        guild.members?.cache.set(data.user.id, member);
        this.client.emit("presenceUpdate", member, oldPresence, newPresence, shard);
    }
}
exports.default = PresenceUpdate;
