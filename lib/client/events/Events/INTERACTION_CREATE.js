"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../Event");
const common_1 = require("../../../common");
const utils_1 = require("../../../utils/utils");
class InteractionCreate extends Event_1.Event {
    async handle(data, shard) {
        const Interaction = await utils_1.Utilities.interactionType(data, this.client);
        if (Interaction) {
            if ("_____patch" in Interaction) {
                //@ts-ignore
                await Interaction._____patch();
            }
            this.client.emit(common_1.EventNames.InteractionCreate, Interaction, shard);
        }
    }
}
exports.default = InteractionCreate;
