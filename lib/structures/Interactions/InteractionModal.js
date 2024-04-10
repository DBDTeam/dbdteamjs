"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionModal = void 0;
const Collection_1 = require("../../utils/Collection");
const ComponentInteraction_1 = require("./ComponentInteraction");
/**
 * Represents an InteractionModal.
 * @extends ComponentInteraction
 */
class InteractionModal extends ComponentInteraction_1.ComponentInteraction {
    /**
     * Creates an instance of InteractionModal.
     * @param {object} data - The InteractionModalPayload.
     * @param {Client} client - The Client.
     */
    constructor(data, client) {
        super(data, client);
        /**
         * The inputs of the InteractionModal.
         * @type {Collection}
         */
        this.inputs = new Collection_1.Collection();
        this.___patch(data);
    }
    /**
     * Patch method for initializing inputs.
     * @param {object} data - The InteractionModalPayload.
     * @private
     */
    ___patch(data) {
        for (let i of data.data.components) {
            for (let x of i.components) {
                if (x.type === 4) {
                    this.inputs.set(x.custom_id, x.value);
                }
            }
        }
    }
}
exports.InteractionModal = InteractionModal;
