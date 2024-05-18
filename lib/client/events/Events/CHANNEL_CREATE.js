"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class ChannnelCreate extends Event_1.Event {
    handle(data, shard) {
        const guild = this.client.guilds.cache.get(data.guild_id)?.guild;
        const channel = this.client.channels.cache
            .set(data.id, (0, utils_1.typeChannel)(data, this.client))
            .get(data.id);
        guild.channels.set(data.id, (0, utils_1.typeChannel)(data, this.client));
        this.client.emit(common_1.EventNames.ChannelCreate, channel, data.id, shard);
    }
}
exports.default = ChannnelCreate;
