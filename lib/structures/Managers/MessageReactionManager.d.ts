import { type Client } from "../../client/Client";
import { Nullable } from "../../common";
import { ReactionEmptyAnswer, RemoveReactionPayload } from "../../common/interfaces/message/Reactions";
import { Collection } from "../../utils";
import { type Message } from "../Message";
import { RESTResponse } from "../../rest/requestHandler";
/**
 * Represents a manager for handling message reactions.
 */
declare class MessageReactions {
    #private;
    protected message: Message;
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
     * The reactions that the message has.
     * * @type {Array<string>}
    */
    protected reacts: Array<string>;
    /**
     * Constructs a new instance of the MessageReactions class.
     * @param {Client} client - The client instance to interact with the Discord API.
     * @param {Message} message - The message object associated with these reactions.
     * @param {Array<string>} reacts - The reactions associated with the message.
     */
    constructor(client: Client, message: Message, reacts: Array<any>);
    get(): string[];
    fetch(): Promise<string[] | RESTResponse<any> | Message | Message[] | null | undefined>;
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
    remove(removeData: RemoveReactionPayload): Promise<Nullable<Collection<string, ReactionEmptyAnswer>>>;
    /**
     * Adds reactions to the message.
     * @param {...string} emojis - The emojis to add as reactions.
     * @returns {Promise<Nullable<Collection<string, EmojisEmptyAnswer>>>} - The result of the add emoji operation.
     */
    add(...emojis: string[]): Promise<Nullable<Collection<string, ReactionEmptyAnswer>>>;
    /**
     * Removes all reactions from the message.
     * @returns {Promise<RESTResponse | null>} - The result of the removal operation.
     */
    removeAll(): Promise<boolean>;
}
export { MessageReactions };
