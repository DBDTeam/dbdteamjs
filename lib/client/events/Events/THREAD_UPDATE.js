"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class ThreadUpdate extends Event_1.Event {
    handle(data, shard) {
        const oldThread = this.client.channels.cache.get(data.id);
        const newThread = this.getChannel(data);
        if ("guild" in newThread) {
            newThread.guild?.channels.cache.set(newThread.id, newThread);
        }
        this.client.channels.cache.set(newThread.id, newThread);
        this.client.emit(common_1.EventNames.ThreadUpdate, oldThread, newThread, shard);
    }
}
exports.default = ThreadUpdate;
