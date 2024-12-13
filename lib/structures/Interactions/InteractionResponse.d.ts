import { type Client } from "../../client/Client";
import { MessageBodyRequest } from "../../common";
import { Message } from "../Message";
export declare class InteractionResponse extends Message {
    readonly client: Client;
    /** @type {string} @readonly */
    readonly token: any;
    /** @type {string} @readonly */
    readonly interaction_id: any;
    /** @type {object} */
    interaction_data: {
        name: any;
        id: any;
        type: any;
        user: import("..").User | undefined;
        userId: any;
    };
    constructor(data: any, client: Client);
    /**
     * Edits the Interaction Response.
     * @param {string | MessageBodyRequest} obj - The EditMessagePayloadData
     * @returns {Promise<InteractionResponse | null>}
     */
    editInteractionResponse(obj: MessageBodyRequest | string): Promise<import("../../interfaces/rest/requestHandler").ResponseFromApi | InteractionResponse | null | undefined>;
}
