"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class ThreadChannelCreate extends Event_1.Event {
    handle(d, shard) {
        const threadChannel = this.getChannel(d);
        threadChannel.guild?.channels.cache.set(threadChannel.id, threadChannel);
        this.client.channels.cache.set(threadChannel.id, threadChannel);
        this.client.emit(common_1.EventNames.ThreadCreate, threadChannel, shard);
    }
}
exports.default = ThreadChannelCreate;
