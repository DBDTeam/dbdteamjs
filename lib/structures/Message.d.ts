import { APIChannelMention, GatewayMessageCreateDispatchData } from "discord-api-types/v10";
import { Client } from "../client/Client";
import { MessageBodyRequest, Nullable } from "../common";
import { Collection } from "../utils/Collection";
import { Base } from "./Base";
import { Channel } from "./BaseChannel";
import { Guild } from "./Guild";
import { MessageReactions } from "./Managers/ReactionMessage";
import { Member } from "./Member";
import { EditMessagePayload } from "./Payloads/EditMessagePayload";
import { User } from "./User";
import { TextBasedChannel } from "./TextBasedChannel";
/**
 * Represents a Discord message.
 */
declare class Message extends Base {
    data: GatewayMessageCreateDispatchData;
    /**
     * The client associated with the message.
     * @type {Client}
     */
    readonly client: Client;
    /**
     * The ID of the message.
     * @type {string}
     */
    id: string;
    /**
     * The ID of the guild where the message was sent.
     * @type {string | undefined}
     */
    guildId: string;
    /**
     * The author of the message.
     * @type {User}
     */
    author: User;
    /**
     * The user associated with the message.
     * @type {User}
     */
    user: User;
    /**
     * The member object associated with the message.
     * @type {Member | undefined}
     */
    member: Member;
    /**
     * Mentions in the message.
     * @type {{
     *   roles: Collection<string, string>;
     *   channels: Collection<string, APIChannelMention>;
     *   users: Collection<string, Member | User>;
     * }}
     */
    mentions: {
        roles: Collection<string, string>;
        channels: Collection<string, APIChannelMention>;
        users: Collection<string, Member | User>;
    };
    /**
     * A nonce that can be used for optimistic message sending.
     * @type {unknown}
     */
    nonce: unknown;
    /**
     * The type of the message.
     * @type {number}
     */
    type: number;
    /**
     * The ID of the channel where the message was sent.
     * @type {string}
     */
    channelId: string;
    /**
     * The content of the message.
     * @type {string}
     */
    content: string;
    /**
     * The channel where the message was sent.
     * @type {(Channel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel | undefined)}
     */
    channel: TextBasedChannel;
    /**
     * The guild where the message was sent.
     * @type {(Guild | undefined)}
     */
    guild: Guild;
    /**
     * Reactions associated with the message.
     * @type {MessageReactions}
     */
    reactions: MessageReactions;
    /**
     * Whether the message was text-to-speech.
     * @type {boolean}
     */
    tts: boolean;
    /**
     * Flags of the message.
     * @type {number}
     */
    flags: number;
    /**
     * Information about when the message was sent.
     * @type {{ stamp: number; unix: number; date: Date }}
     */
    sended: Nullable<{
        stamp: any;
        unix: number;
        date: Date;
    }>;
    /**
     * Embeds in the message.
     * @type {unknown[]}
     */
    embeds: unknown[];
    /**
     * Attachments in the message.
     * @type {unknown[]}
     */
    attachments: unknown[];
    /**
     * Stickers attached to the message.
     * @type {Collection<string, unknown>}
     */
    stickers: Collection<string, unknown>;
    /**
     * Whether the message is pinned.
     * @type {boolean}
     */
    pinned: boolean;
    /**
     * The ID of the webhook that sent the message.
     * @type {string | undefined}
     */
    webhookId?: string;
    /**
     * Information about the associated thread.
     * @type {any}
     */
    thread: any;
    /**
     * Creates an instance of Message.
     * @param {APIMessage} data - The data of the message.
     * @param {Client} client - The client.
     */
    constructor(data: GatewayMessageCreateDispatchData, client: Client);
    /**
     * Patches the message data.
     * @param {APIMessage} data - The data of the message.
     */
    ___patch(): Promise<void>;
    /**
     * Replies to the message.
     * @param {MessagePayloadData | string} obj - The message payload or content.
     * @returns {Promise<Message | null>} A promise that resolves to the sent message, or null if failed.
     */
    reply(body: MessageBodyRequest): Promise<Message | null>;
    /**
     * Edits the message.
     * @param {EditMessagePayload | string} obj - The edit message payload or content.
     * @returns {Promise<Message | undefined>} A promise that resolves to the edited message, or undefined if failed.
     */
    edit(obj: EditMessagePayload | string): Promise<Message | undefined>;
    /**
     * Removes all embeds from the message.
     * @returns {Promise<Message | undefined>} A promise that resolves to the updated message, or undefined if failed.
     */
    removeEmbeds(): Promise<Message | undefined>;
    /**
     * Deletes the message.
     * @returns {Promise<boolean>} A promise that resolves once the message is deleted.
     */
    delete(): Promise<boolean>;
    /**
     * Gets the user associated with the message.
     * @returns {User} The user associated with the message.
     */
    get _user(): User;
    /**
     * Gets the channel by its ID.
     * @param {string} channelId - The ID of the channel.
     * @returns {Promise<Channel | null>} A promise that resolves to the channel, or null if not found.
     */
    _getChannel(channelId: string): Promise<Channel | null>;
}
export { Message };
