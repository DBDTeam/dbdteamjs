import { Client } from "../../client/Client";
import { Guild } from "../Guild";
import { Member } from "../Member";
import { TextBasedChannel } from "../TextBasedChannel";
import { User } from "../User";
import { InteractionResponse } from "./InteractionResponse";
import { InteractionBodyRequest, MessageBodyRequest, MessageUpdateBodyRequest } from "../../common";
import { ModalPayloadData } from "../Payloads/ModalPayload";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";
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
     * @type {number | undefined}
     */
    type?: number;
    /**
     * The Guild ID.
     * @type {string}
     */
    guildId: string;
    /**
     * The Guild.
     * @type {Guild}
     */
    guild: Guild | undefined;
    /**
     * The Channel where the Interaction was triggered.
     * @type {Channel | VoiceChannel | TextChannel | ThreadChannel | TextBasedChannel}
     */
    channel: TextBasedChannel;
    /**
     * The Interaction User.
     * @type {User}
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
    showModal: (obj: any) => Promise<any>;
    reply: (obj: any) => Promise<InteractionResponse | object>;
    id: any;
    /**
     * The Interaction Member.
     * @type {Nullable<Member>}
     */
    member: Member | null;
    /**
     * Creates an instance of InteractionBase.
     * @param {object} data - The Interaction payload.
     * @param {Client} client - The Client.
     */
    constructor(data: any, client: Client);
    get _member(): Member | null;
    /**
     * Returns whether the Interaction is a ComponentInteraction.
     * @type {boolean}
     */
    get isComponent(): boolean;
    /**
     * Returns whether the Interaction is a SlashInteraction.
     * @type {boolean}
     */
    get isSlash(): boolean;
    /**
     * Returns whether the Interaction is a UserInteraction.
     * @type {boolean}
     */
    get isUser(): boolean;
    /**
     * Returns whether the Interaction is a MessageInteraction.
     * @type {boolean}
     */
    get isMessage(): boolean;
    /**
     * Returns the Interaction Author.
     * @type {User}
     */
    get author(): User | undefined;
    private __makeReply;
    /**
     * Makes a reply using the gateway.
     * @async
     * @param {InteractionPayload} obj - The InteractionPayloadData
     * @returns {Promise<InteractionResponse | ErrorResponseFromApi>}
     */
    makeReply(obj: InteractionBodyRequest): Promise<InteractionResponse | ErrorResponseFromApi>;
    /**
     * Defers the reply.
     * @param {boolean} ephemeral - If the defer will be sent ephemerally.
     * @returns {Promise<InteractionResponse | object>}
     * @async
     */
    deferReply(ephemeral: boolean): Promise<any>;
    /**
     * Edits the original response. (if any)
     * @async
     * @param {MessageUpdateBodyRequest} obj - The Body of the new Message.
     * @returns {Promise<InteractionResponse | ErrorResponseFromApi>}
     */
    editReply(body: MessageUpdateBodyRequest): Promise<InteractionResponse | ErrorResponseFromApi>;
    /**
     * Follows up the Interaction response.
     * @param {InteractionBodyRequest} obj - The Body of the new Message.
     * @returns {Promise<InteractionResponse>}
     * @async
     */
    followUp(body: MessageBodyRequest): Promise<any>;
    /**
     * Sends a modal as the interaction response.
     * @param {InteractionPayloadData} obj - The ModalPayloadData
     * @returns {Promise<InteractionResponse | object>}
     * @async
     */
    modal(body: ModalPayloadData): Promise<InteractionResponse | object>;
}
export { InteractionBase };
