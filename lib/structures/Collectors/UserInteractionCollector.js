"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInteractionCollector = void 0;
const InteractionCollector_1 = require("./InteractionCollector");
class UserInteractionCollector extends InteractionCollector_1.InteractionCollector {
    constructor(client, filter, options) {
        super(client, async (interaction) => {
            return interaction.isUser() && await filter(interaction);
        }, options);
    }
}
exports.UserInteractionCollector = UserInteractionCollector;
