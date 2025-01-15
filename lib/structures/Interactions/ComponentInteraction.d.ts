import { APIInteractionResponseCallbackData, APIMessageComponentInteraction, ComponentType } from "discord-api-types/v10";
import { Client } from "../../client/Client";
import { ComponentInteractionMessageUpdate } from "../../common";
import { Message } from "../Message";
import { User } from "../User";
import { InteractionBase } from "./BaseInteraction";
import { InteractionResponse } from "./InteractionResponse";
import { ButtonInteraction } from "./ButtonInteraction";
import { SelectMenuInteraction } from "./SelectMenuInteraction";
/**
 * Represents a ComponentInteraction.
 * @extends InteractionBase
 */
declare class ComponentInteraction extends InteractionBase {
    private data;
    client: Client;
    /**
     * The custom id of the interaction
     * @type {string}
     */
    customId: string;
    /**
     * The component type of the interaction
     * @type {ComponentType}
     */
    componentType: ComponentType;
    /**
     * Updates the reply
     * @param { APIInteractionResponseCallbackData } obj - The object to update the reply.
     * @returns { Promise<InteractionResponse | boolean> }
     */
    readonly update: (obj: APIInteractionResponseCallbackData | string) => Promise<InteractionResponse | boolean>;
    /**
     * The message of the component interaction.
     * @type { Message }
     */
    message: Message;
    /**
     * The user of the component interaction.
     */
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
    isButton(): this is ButtonInteraction;
    /**
     * Checks if the ComponentInteraction is a SelectMenu.
     * @type {boolean}
     */
    isSelectMenu(): this is SelectMenuInteraction;
    /**
     * Updates the original reply.
     * @param {InteractionPayloadData} obj - The InteractionPayloadData
     * @returns {Promise<InteractionResponse>}
     */
    updateReply(obj: ComponentInteractionMessageUpdate | string): Promise<InteractionResponse | boolean>;
    /**
     * Patch method for initializing data properties.
     * @private
     */
    private _patch;
}
export { ComponentInteraction };
