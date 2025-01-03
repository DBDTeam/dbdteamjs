"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientApplication_1 = require("../../ClientApplication");
const ClientUser_1 = require("../../ClientUser");
const Event_1 = require("../Event");
const common_1 = require("../../../common");
const utils_1 = require("../../../utils/utils");
class Ready extends Event_1.Event {
    async handle(data, shard) {
        this.client.user = new ClientUser_1.ClientUser(data.user, this.client);
        this.client.application = new ClientApplication_1.ClientApplication(this.client);
        this.client.ready = utils_1.Utilities.getAllStamps(new Date());
        this.client.emit(common_1.EventNames.Debug, `Client logged successfully`, shard);
        this.client.emit(common_1.EventNames.Ready, this.client.user, shard);
    }
}
exports.default = Ready;
