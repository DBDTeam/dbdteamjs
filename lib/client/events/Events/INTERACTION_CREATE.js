"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const Event_1 = require("../Event");
class InteractionCreate extends Event_1.Event {
    async handle(data, shard) {
        const Interaction = await (0, utils_1.interactionType)(data, this.client);
        if (Interaction) {
            if ("patch" in Interaction) {
                //@ts-ignore
                await Interaction.patch();
            }
            this.client.emit("interactionCreate", Interaction, shard);
        }
    }
}
exports.default = InteractionCreate;
