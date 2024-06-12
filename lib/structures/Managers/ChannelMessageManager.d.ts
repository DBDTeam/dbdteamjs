import { type Client } from "../../client/Client";
import { Nullable } from "../../common";
import { Collection } from "../../utils/Collection";
import { Guild } from "../Guild";
import { Message } from "../Message";
export declare class ChannelMessageManager<T extends Record<any, any>> {
    #private;
    channel: T;
    cache: Collection<string, Message>;
    /**
     * Constructs a new ChannelMessageManager instance.
     * @param {T} channel - The channel this manager handles messages for.
     * @param {Client} client - The client instance to interact with the Discord API.
     */
    constructor(channel: T, client: Client);
    /**
     * Gets the guild associated with the channel, if available.
     * @returns {Guild | null} - The guild associated with the channel or null if none exists.
     */
    get guild(): Guild | null;
    /**
     * Fetches messages from the channel.
     * @param {string | Record<any, any>} msgId - The ID of the message to fetch or an object with query parameters.
     * @returns {Promise<Message | Message[] | null>} - The fetched message(s) or null if not found.
     */
    fetch(msgId: string | Record<any, any>): Promise<Nullable<Message | Message[]>>;
}
