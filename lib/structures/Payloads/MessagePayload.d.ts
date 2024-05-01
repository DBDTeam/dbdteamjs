import { MessageBodyRequest } from "../../common";
import { MessagePayloadData, MessagePayloadFileData } from "../../interfaces/message/MessagePayload";
/**
 * @typedef {("users" | "roles" | "everyone")} MentionType
 */
/**
 * @typedef {Object} MentionsData
 * @property {Array<MentionType>} parse - The Mention parse.
 * @property {Array<string>} users - The user ids.
 * @property {Array<string>} roles - The role ids.
 * @property {string | null} messageReferenceId - The Message id used to reply.
 */
/**
 * @typedef {Array<object>} Files
 * @property {string} name - The name of the file.
 * @property {string} description - The description that appears when you click the image.
 * @property {string | buffer} url - The URL or buffer of the image.
 */
/**
 * @typedef {Object} MessagePayloadData
 * @property {string} [content] - The content of the message.
 * @property {boolean} [tts] - If the message will be sended using TTs.
 * @property {Array<Object>} [embeds] - The embeds of the message.
 * @property {MentionsData} [mentions] - The mentiondata of the message.
 * @property {Array<Object>} [components] - The components of the message.
 * @property {Array<string>} [stickers] - The sticker ids of the message (or you can use sticker_ids).
 * @property {number} [flags] - The flags of the message.
 * @property {Files} [files] - The files of the message.
 * @property {number | undefined} [nonce] - The nonce of the message. (if any)
 * @property {Array<Object> | undefined} [attachments] - The attachments of the message. (if any)
 */
declare class MessagePayload {
    private MENTIONS;
    private Data;
    readonly d: Record<any, any>;
    readonly file: Record<any, any>;
    private f;
    /**
     * Creates a message payload to send messages.
     * @param {MessagePayloadData} data
     * @param {Files} files
     */
    constructor(data: MessageBodyRequest | string, files?: MessagePayloadFileData[]);
    get payload(): MessagePayloadData;
    get files(): MessagePayloadFileData[];
}
export { MessagePayload };
