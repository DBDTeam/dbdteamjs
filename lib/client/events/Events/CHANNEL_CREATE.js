"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const Event_1 = require("../Event");
class ChannnelCreate extends Event_1.Event {
    handle(data, shard) {
        // @ts-ignore
        const guild = this.client.guilds.cache.get(data.guild_id).guild;
        const channel = this.client.channels.cache.set(data.id, (0, utils_1.typeChannel)(data, this.client));
        guild.channels.set(data.id, (0, utils_1.typeChannel)(data, this.client));
        // @ts-ignore
        this.client.emit("channelCreate", channel, data.id, shard);
    }
}
exports.default = ChannnelCreate;
