"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageInteractionCollector = void 0;
const InteractionCollector_1 = require("./InteractionCollector");
class MessageInteractionCollector extends InteractionCollector_1.InteractionCollector {
    constructor(client, filter, options) {
        super(client, async (interaction) => {
            return interaction.isUser() && await filter(interaction);
        }, options);
    }
}
exports.MessageInteractionCollector = MessageInteractionCollector;
