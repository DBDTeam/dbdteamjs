import { type Client } from "../../client/Client";
import { MessageBodyRequest } from "../../common";
import { InteractionResponseData } from "../../common/types/interactions";
import { Message } from "../Message";
export declare class InteractionResponse extends Message {
    readonly client: Client;
    /**
     * The token of the interaction response
     * @type {string}
     * @readonly
     */
    readonly token: any;
    /**
     * The id of the interaction response
     * @type {string}
     * @readonly
     */
    readonly interaction_id: any;
    /**
     * The interaction data
     * @type {object}
     */
    interaction_data: InteractionResponseData;
    constructor(data: any, client: Client);
    /**
     * Edits the Interaction Response.
     * @param {string | MessageBodyRequest} obj - The EditMessagePayloadData
     * @returns {Promise<InteractionResponse | null>}
     */
    editInteractionResponse(body: MessageBodyRequest | string): Promise<InteractionResponse | import("../..").ResponseFromApi | null | undefined>;
}
