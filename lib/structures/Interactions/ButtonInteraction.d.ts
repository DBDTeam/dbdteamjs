import { APIMessageComponentInteraction } from "discord-api-types/v10";
import { Client } from "../../client/Client";
import { ComponentInteraction } from "./ComponentInteraction";
export declare class ButtonInteraction extends ComponentInteraction {
    /**
     * Represents a ButtonInteraction.
     * @extends ComponentInteraction
     * @param {APIMessageComponentInteraction} data - The ButtonInteraction PayloadData.
     * @param {Client} client - The Client.
     */
    constructor(data: APIMessageComponentInteraction, client: Client);
}
