import { APIInteractionResponseCallbackData, APIMessageComponentInteraction, ComponentType } from "discord-api-types/v10";
import { Client } from "../../client/Client";
import { ComponentInteractionMessageUpdate, Nullable } from "../../interfaces/other";
import { Message } from "../Message";
import { User } from "../User";
import { InteractionBase } from "./BaseInteraction";
import { InteractionResponse } from "./InteractionResponse";
/**
 * Represents a ComponentInteraction.
 * @extends InteractionBase
 */
declare class ComponentInteraction extends InteractionBase {
    private data;
    client: Client;
    customId: string;
    componentType: ComponentType;
    readonly update: (obj: APIInteractionResponseCallbackData) => Promise<Nullable<InteractionResponse>>;
    message: Message;
    user: User;
    /**
     * Creates an instance of ComponentInteraction.
     * @param {object} data - The ComponentInteraction Payload.
     * @param {Client} client - The Client
     */
    constructor(data: APIMessageComponentInteraction, client: Client);
    /**
     * Checks if the ComponentInteraction is a Button.
     * @type {boolean}
     */
    get isButton(): boolean;
    /**
     * Checks if the ComponentInteraction is a SelectMenu.
     * @type {boolean}
     */
    get isSelectMenu(): boolean;
    /**
     * Checks if the ComponentInteraction is a Modal.
     * @type {boolean}
     */
    /**
     * Updates the original reply.
     * @param {InteractionPayloadData} obj - The InteractionPayloadData
     * @returns {Promise<InteractionResponse>}
     */
    updateReply(obj: ComponentInteractionMessageUpdate): Promise<Nullable<InteractionResponse>>;
    /**
     * Patch method for initializing data properties.
     * @private
     */
    private patch;
}
export { ComponentInteraction };
