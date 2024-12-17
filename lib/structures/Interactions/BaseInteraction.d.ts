import { InteractionType } from "discord-api-types/v10";
import { Client } from "../../client/Client";
import { Guild } from "../Guild";
import { Member } from "../Member";
import { TextBasedChannel } from "../TextBasedChannel";
import { User } from "../User";
import { InteractionResponse } from "./InteractionResponse";
import { InteractionBodyRequest, MessageBodyRequest, MessageUpdateBodyRequest } from "../../common";
import { ModalPayloadData } from "../Payloads/ModalPayload";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";
import { SlashInteraction } from "./SlashInteraction";
import { ComponentInteraction } from "./ComponentInteraction";
import { UserInteraction } from "./UserInteraction";
/**
 * Represents the base class for interactions.
 */
declare class InteractionBase {
    #private;
    readonly client: Client;
    /**
     * The Interaction ID.
     * @type {string}
     * @readonly
     */
    readonly interactionId: string;
    /**
     * The token of the Interaction.
     * @type {string}
     * @readonly
     */
    readonly token: string;
    /**
     * The type of Interaction.
     * @type {InteractionType | undefined}
     */
    type?: InteractionType;
    /**
     * The Guild ID.
     * @type {string}
     */
    guildId: string;
    /**
     * The Guild.
     * @type {Guild}
     */
    guild: Guild;
    /**
     * The Channel where the Interaction was triggered.
     * @type {TextBasedChannel}
     */
    channel: TextBasedChannel;
    /**
     * The Interaction User.
     * @type {User | undefined}
     */
    user: User | undefined;
    /**
     * Bitwise set of permissions the app has in the source location of the interaction.
     * @type {string}
     */
    permissions: string;
    /**
     * The Guild Locale.
     * @type {string}
     */
    guildLocale: string;
    /**
     * The raw data.
     * @type {object}
     */
    rawData: Record<any, unknown>;
    /**
     * Sends a modal as the interaction response.
     * @async
     * @param {ModalPayloadData} body - The ModalPayloadData
     * @returns {Promise<InteractionResponse | ErrorResponseFromApi>}
     */
    showModal: (body: ModalPayloadData) => Promise<InteractionResponse | ErrorResponseFromApi>;
    /**
     * Makes a reply using the gateway.
     * @async
     * @param {InteractionBodyRequest} obj - The InteractionPayloadData
     * @returns {Promise<InteractionResponse | ErrorResponseFromApi>}
     */
    reply: (obj: InteractionBodyRequest | string) => Promise<InteractionResponse | ErrorResponseFromApi>;
    /**
     * The ID of the interaction.
     * @type {any}
     */
    id: any;
    /**
     * The Interaction Member.
     * @type {Member | null}
     */
    member: Member | null;
    /**
     * Creates an instance of InteractionBase.
     * @param {object} data - The Interaction payload.
     * @param {Client} client - The Client.
     */
    constructor(data: any, client: Client);
    /**
     * Returns whether the Interaction is a ComponentInteraction.
     * @returns {boolean}
     */
    isComponent(): this is ComponentInteraction;
    /**
     * Returns whether the Interaction is a SlashInteraction.
     * @returns {boolean}
     */
    isSlash(): this is SlashInteraction;
    /**
     * Returns whether the Interaction is a UserInteraction.
     * @returns {boolean}
     */
    isUser(): this is UserInteraction;
    /**
     * Returns whether the Interaction is a MessageInteraction.
     * @returns {boolean}
     */
    get isMessage(): boolean;
    /**
     * Returns the Interaction Author.
     * @type {User | undefined}
     */
    get author(): User | undefined;
    /**
     * Makes a reply using the gateway.
     * @private
     * @async
     * @param {InteractionPayload} obj - The InteractionPayloadData
     * @returns {Promise<InteractionResponse | ErrorResponseFromApi>}
     */
    private __makeReply;
    /**
     * Makes a reply using the gateway.
     * @async
     * @param {InteractionBodyRequest} obj - The InteractionPayloadData
     * @returns {Promise<InteractionResponse | ErrorResponseFromApi>}
     */
    makeReply(obj: InteractionBodyRequest | string): Promise<InteractionResponse | ErrorResponseFromApi>;
    /**
     * Defers the reply.
     * @async
     * @param {boolean} ephemeral - If the defer will be sent ephemerally.
     * @returns {Promise<InteractionResponse | object>}
     */
    deferReply(ephemeral?: boolean): Promise<any>;
    /**
     * Edits the original response. (if any)
     * @async
     * @param {MessageUpdateBodyRequest | string} body - The Body of the new Message.
     * @returns {Promise<InteractionResponse | ErrorResponseFromApi>}
     */
    editReply(body: MessageUpdateBodyRequest | string): Promise<InteractionResponse | ErrorResponseFromApi>;
    /**
     * Follows up the Interaction response.
     * @async
     * @param {MessageBodyRequest} body - The Body of the new Message.
     * @returns {Promise<InteractionResponse>}
     */
    followUp(body: MessageBodyRequest | string): Promise<any>;
    /**
     * Sends a modal as the interaction response.
     * @async
     * @param {ModalPayloadData} body - The ModalPayloadData
     * @returns {Promise<InteractionResponse | object>}
     */
    modal(body: ModalPayloadData): Promise<InteractionResponse | ErrorResponseFromApi>;
}
export { InteractionBase };
