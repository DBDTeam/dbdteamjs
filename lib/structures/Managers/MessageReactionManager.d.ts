import { type Client } from "../../client/Client";
import { Nullable } from "../../common";
import { EmojisEmptyAnswer, RemoveEmojiPayload } from "../../interfaces/message/Reactions";
import { ErrorResponseFromApi, ResponseFromApi } from "../../interfaces/rest/requestHandler";
import { type Message } from "../Message";
/**
 * Represents a manager for handling message reactions.
 */
declare class MessageReactions {
    #private;
    /**
     * The current message id
     * @type {string}
     */
    readonly messageId: string;
    /**
     * The current channel id where the message was sent
     * @type {string}
     */
    readonly channelId: string;
    /**
     * The guild id
     * @type { string }
     */
    readonly guildId?: string;
    /**
     * The reactions that the message has.
     * * @type {Array<string>}
    */
    reactions: Array<string>;
    /**
     * Constructs a new instance of the MessageReactions class.
     * @param {Client} client - The client instance to interact with the Discord API.
     * @param {Message} msgObj - The message object associated with these reactions.
     * @param {Array<string>} reacts - The reactions associated with the message.
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
     * @returns {Promise<Nullable<EmojisEmptyAnswer[]>>} - The result of the removal operation.
     */
    remove(removeData: RemoveEmojiPayload): Promise<Nullable<EmojisEmptyAnswer[]>>;
    /**
     * Adds reactions to the message.
     * @param {...string} emojis - The emojis to add as reactions.
     * @returns {Promise<Nullable<EmojisEmptyAnswer[]>>} - The result of the add emoji operation.
     */
    add(...emojis: string[]): Promise<Nullable<EmojisEmptyAnswer[]>>;
    /**
     * Removes all reactions from the message.
     * @returns {Promise<ResponseFromApi | ErrorResponseFromApi | null>} - The result of the removal operation.
     */
    removeAll(): Promise<ResponseFromApi | ErrorResponseFromApi | null>;
}
export { MessageReactions };
