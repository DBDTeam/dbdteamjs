import { Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
import { ComponentInteraction } from "./ComponentInteraction";
/**
 * Represents an InteractionModal.
 * @extends ComponentInteraction
 */
export declare class InteractionModal extends ComponentInteraction {
    inputs: Collection<string, any>;
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
