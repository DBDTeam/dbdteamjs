"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const structures_1 = require("../../../structures");
const ThreadMember_1 = require("../../../structures/ThreadMember");
const Collection_1 = require("../../../utils/Collection");
const common_1 = require("../../../common");
class ThreadListSync extends Event_1.Event {
    handle(data, shard) {
        let guild = this.client.guilds.cache.get(data.guild_id);
        var channels = new Collection_1.Collection();
        var members = new Collection_1.Collection();
        if (!guild)
            return;
        for (let thread of data.threads) {
            let threadChannel = new structures_1.ThreadChannel(thread, this.client);
            this.client.channels.cache.set(threadChannel.id, threadChannel);
            guild.channels.cache.set(threadChannel.id, threadChannel);
            channels.set(threadChannel.id, threadChannel);
        }
        for (let member of data.members) {
            let threadMember = new ThreadMember_1.ThreadMember(member, guild, this.client);
            if (!threadMember.thread)
                continue;
            threadMember.thread.members.cache.set(threadMember.id, threadMember);
            members.set(threadMember.id, threadMember);
        }
        this.client.emit(common_1.EventNames.ThreadListSync, guild, channels, members, shard);
    }
}
exports.default = ThreadListSync;
