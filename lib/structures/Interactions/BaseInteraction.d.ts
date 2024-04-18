import { Client } from "../../client/Client";
import { Guild } from "../Guild";
import { Member } from "../Member";
import { User } from "../User";
import { InteractionResponse } from "./InteractionResponse";
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
     * @type {Channel | VoiceChannel | TextChannel | ThreadChannel}
     */
    channel: unknown;
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
    /**
     * Makes a reply using the gateway.
     * @async
     * @param {?} obj - The InteractionPayloadData
     * @returns {Promise<InteractionResponse | object>}
     */
    makeReply(obj: any): Promise<any | object>;
    /**
     * Defers the reply.
     * @param {boolean} ephemeral - If the defer will be sent ephemerally.
     * @returns {Promise<Object>}
     * @async
     */
    deferReply(_ephemeral: boolean): Promise<any>;
    /**
     * Edits the original response. (if any)
     * @async
     * @param {EditMessagePayload} obj - The EditMessagePayloadData
     * @returns {Promise<InteractionResponse | object>}
     */
    editReply(_obj: any): Promise<any | object>;
    /**
     * Follows up the Interaction response.
     * @param {InteractionPayloadData} obj - The MessagePayloadData
     * @returns {Promise<InteractionResponse>}
     * @async
     */
    followUp(_obj: any): Promise<any>;
    /**
     * Sends a modal as the interaction response.
     * @param {InteractionPayloadData} obj - The ModalPayloadData
     * @returns {Promise<any>}
     * @async
     */
    modal(_obj: any): Promise<any>;
}
export { InteractionBase };
