"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_1 = require("../../../package");
const utils_1 = require("../../../utils/utils");
const ClientApplication_1 = require("../../ClientApplication");
const ClientUser_1 = require("../../ClientUser");
const Event_1 = require("../Event");
class MessageCreate extends Event_1.Event {
    async handle(data, shard) {
        this.client.user = new ClientUser_1.ClientUser(data.user, this.client);
        this.client.application = new ClientApplication_1.ClientApplication(this.client);
        const guilds = await this.client.rest.request("GET", "/users/@me/guilds?with_counts=true", true);
        if (!guilds?.error) {
            for (let guild of guilds?.data) {
                this.client.guilds.cache.set(guild.id, new package_1.Guild(guild, this.client));
            }
        }
        // @ts-ignore
        this.client.ready = (0, utils_1.getAllStamps)(new Date());
        this.client.emit("debug", `Client logged successfully`, shard);
        this.client.emit("ready", this.client.user, shard);
    }
}
exports.default = MessageCreate;
