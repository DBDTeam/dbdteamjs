"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashInteractionCollector = void 0;
const InteractionCollector_1 = require("./InteractionCollector");
class SlashInteractionCollector extends InteractionCollector_1.InteractionCollector {
    constructor(client, filter, options) {
        super(client, async (interaction) => {
            return interaction.isSlash() && await filter(interaction);
        }, options);
    }
}
exports.SlashInteractionCollector = SlashInteractionCollector;
