"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Guild_1 = require("../../../structures/Guild");
const utils_1 = require("../../../utils/utils");
const ClientApplication_1 = require("../../ClientApplication");
const ClientUser_1 = require("../../ClientUser");
const Event_1 = require("../Event");
const common_1 = require("../../../common");
class Ready extends Event_1.Event {
    async handle(data, shard) {
        this.client.user = new ClientUser_1.ClientUser(data.user, this.client);
        this.client.application = new ClientApplication_1.ClientApplication(this.client);
        let guildsCount = [0, 0];
        while (guildsCount[0] !== data.guilds.length) {
            const guilds = await this.client.rest.request("GET", `/users/@me/guilds?with_counts=true${!!guildsCount[1] ? `&after=${guildsCount[1]}` : ""}`, true);
            if (!guilds?.error) {
                for (let guild of guilds?.data) {
                    this.client.guilds.cache.set(guild.id, new Guild_1.Guild(guild, this.client));
                    guildsCount[0]++;
                    guildsCount[1] = guild.id;
                }
            }
        }
        this.client.ready = (0, utils_1.getAllStamps)(new Date());
        this.client.emit(common_1.EventNames.Debug, `Client logged successfully`, shard);
        this.client.emit(common_1.EventNames.Ready, this.client.user, shard);
    }
}
exports.default = Ready;
