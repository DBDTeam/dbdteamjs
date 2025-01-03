"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
const utils_1 = require("../../../utils/utils");
class ChannnelCreate extends Event_1.Event {
    handle(data, shard) {
        // @ts-ignore It always exists
        const guild = this.client.guilds.cache.get(data.guild_id);
        const channel = this.client.channels.cache
            .set(data.id, utils_1.Utilities.typeChannel(data, this.client))
            .get(data.id);
        guild.channels.cache.set(data.id, utils_1.Utilities.typeChannel(data, this.client));
        this.client.emit(common_1.EventNames.ChannelCreate, channel, data.id, shard);
    }
}
exports.default = ChannnelCreate;
