import { APIInteractionResponseCallbackData } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { InteractionResponseData, MessageBodyRequest } from "../../common";
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
    editInteractionResponse(body: MessageBodyRequest | string): Promise<InteractionResponse | import("../../rest/requestHandler").RESTResponse<APIInteractionResponseCallbackData> | null>;
}
