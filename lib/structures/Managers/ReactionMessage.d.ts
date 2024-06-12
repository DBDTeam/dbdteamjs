import { type Client } from "../../client/Client";
import { Nullable } from "../../common";
import { ErrorResponseFromApi, ResponseFromApi } from "../../interfaces/rest/requestHandler";
import { type Message } from "../Message";
interface RemoveEmojiPayload {
    emojis: Array<string>;
    user?: string | null | undefined | "@me";
}
/**
 * Represents a manager for handling message reactions.
 */
declare class MessageReactions {
    readonly client: Client;
    readonly messageId: string;
    readonly channelId: string;
    readonly guildId?: string;
    reactions: Array<any>;
    /**
     * Constructs a new instance of the MessageReactions class.
     * @param {Client} client - The client instance to interact with the Discord API.
     * @param {Message} msgObj - The message object associated with these reactions.
     * @param {Array<any>} reacts - The reactions associated with the message.
     */
    constructor(client: Client, msgObj: Message, reacts: Array<any>);
    /**
     * Gets the total count of reactions.
     * @returns {number} - The number of reactions.
     */
    get count(): number;
    /**
     * Removes specific reactions from the message.
     * @param {RemoveEmojiPayload} removeData - The data containing emojis and optional user to remove.
     * @returns {Promise<Nullable<ResponseFromApi[] | ErrorResponseFromApi[]>>} - The result of the removal operation.
     */
    remove(removeData: RemoveEmojiPayload): Promise<Nullable<ResponseFromApi[] | ErrorResponseFromApi[]>>;
    /**
     * Adds reactions to the message.
     * @param {...string} emojis - The emojis to add as reactions.
     * @returns {Promise<Array<ResponseFromApi | ErrorResponseFromApi | null>>} - The result of the add operation.
     */
    add(...emojis: string[]): Promise<Array<ResponseFromApi | ErrorResponseFromApi | null>>;
    /**
     * Removes all reactions from the message.
     * @returns {Promise<ResponseFromApi | ErrorResponseFromApi | null>} - The result of the removal operation.
     */
    removeAll(): Promise<ResponseFromApi | ErrorResponseFromApi | null>;
}
export { MessageReactions };
