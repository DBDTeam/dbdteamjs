import { type Client } from "../../client/Client";
import { Message } from "../Message";
import { EditMessagePayload } from "../Payloads/EditMessagePayload";
export declare class InteractionResponse extends Message {
    readonly client: Client;
    /**
     * The Interaction Token.
     * @type {string}
     * @readonly
     */
    readonly token: string;
    /**
     * The Interaction Id.
     * @type {string}
     * @readonly
     */
    readonly interaction_id: string;
    /**
     * The Interaction Data
     * @type {object}
     */
    interaction_data: Record<string, any>;
    constructor(data: any, client: Client);
    /**
     * Edits the Actual Interaction Response.
     * @param {EditMessagePayload} obj - The EditMessagePayloadData
     * @returns {InteractionResponse}
     */
    editInteractionResponse(obj: string | EditMessagePayload): Promise<import("../../interfaces/rest/requestHandler").ResponseFromApi | InteractionResponse | null>;
}
