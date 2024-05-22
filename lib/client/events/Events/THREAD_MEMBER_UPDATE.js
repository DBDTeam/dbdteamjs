"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const ThreadMember_1 = require("../../../structures/ThreadMember");
const common_1 = require("../../../common");
class ThreadMemberUpdate extends Event_1.Event {
    handle(data, shard) {
        let threadChannel = this.client.channels.cache.get(data.id);
        if (!threadChannel || !data.member)
            return;
        let threadMember = new ThreadMember_1.ThreadMember(data, threadChannel.guild, this.client);
        threadChannel.members.cache.set(threadMember.id, threadMember);
        this.client.emit(common_1.EventNames.ThreadMemberUpdate, threadChannel, threadMember, shard);
    }
}
exports.default = ThreadMemberUpdate;
