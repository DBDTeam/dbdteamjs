"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const Event_1 = require("../Event");
class ChannelUpdate extends Event_1.Event {
    handle(data, shard) {
        const _old = this.client.channels.cache.get(data.id);
        let _new;
        let guild;
        if ("guild_id" in data && data.guild_id) {
            guild =
                this.client.channels.cache.get(data.id)?.guild ||
                    this.client.guilds.cache.get(data.guild_id);
            _new = this.client.channels.cache.set(data.id, (0, utils_1.typeChannel)(data, this.client));
            this.client.guilds.cache.forEach((x) => {
                if (x.id === data.guild_id) {
                    guild = x.guild;
                    x.channels.cache.set(data.id, (0, utils_1.typeChannel)(data, this.client));
                }
            });
        }
        this.client.emit("channelUpdate", _old, _new, shard);
    }
}
exports.default = ChannelUpdate;
