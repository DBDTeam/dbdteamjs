"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentInteractionCollector = void 0;
const InteractionCollector_1 = require("./InteractionCollector");
class ComponentInteractionCollector extends InteractionCollector_1.InteractionCollector {
    constructor(client, filter, options) {
        super(client, async (interaction) => {
            return interaction.isComponent() && await filter(interaction);
        }, options);
    }
}
exports.ComponentInteractionCollector = ComponentInteractionCollector;
