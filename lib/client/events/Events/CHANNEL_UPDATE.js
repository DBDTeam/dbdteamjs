"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class ChannelUpdate extends Event_1.Event {
    handle(data, shard) {
        const oldChannel = this.client.channels.cache.get(data.id);
        let newChannel;
        var guild;
        if ("guild_id" in data && data.guild_id) {
            guild =
                this.client.channels.cache.get(data.id)?.guild ||
                    this.client.guilds.cache.get(data.guild_id);
            newChannel = this.client.channels.cache.set(data.id, (0, utils_1.typeChannel)(data, this.client));
            this.client.guilds.cache.forEach((x) => {
                if (x.id === data.guild_id) {
                    guild = x.guild;
                    x.channels.cache.set(data.id, (0, utils_1.typeChannel)(data, this.client));
                }
            });
        }
        this.client.emit(common_1.EventNames.ChannelUpdate, oldChannel, newChannel, shard);
    }
}
exports.default = ChannelUpdate;
