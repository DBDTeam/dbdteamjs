"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonInteraction = void 0;
const ComponentInteraction_1 = require("./ComponentInteraction");
class ButtonInteraction extends ComponentInteraction_1.ComponentInteraction {
    /**
     * Represents a ButtonInteraction.
     * @extends ComponentInteraction
     * @param {object} data - The ButtonInteraction PayloadData.
     * @param {Client} client - The Client.
     */
    constructor(data, client) {
        super(data, client);
    }
}
exports.ButtonInteraction = ButtonInteraction;
