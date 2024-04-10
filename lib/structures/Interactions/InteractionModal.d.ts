import { Client } from "../../client/Client";
import { ComponentInteraction } from "./ComponentInteraction";
/**
 * Represents an InteractionModal.
 * @extends ComponentInteraction
 */
declare class InteractionModal extends ComponentInteraction {
    /**
     * Creates an instance of InteractionModal.
     * @param {object} data - The InteractionModalPayload.
     * @param {Client} client - The Client.
     */
    constructor(data: any, client: Client);
    /**
     * Patch method for initializing inputs.
     * @param {object} data - The InteractionModalPayload.
     * @private
     */
    private ___patch;
}
export { InteractionModal };
