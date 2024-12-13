import { MessagePayloadFileData } from "../../interfaces/message/MessagePayload";
import { MessageUpdateBodyRequest } from "../../common";
declare class EditMessagePayload {
    private MENTIONS;
    /**
     * At least one of the options (content or embeds) must be placed and not undefined.
     * @typedef {Object} MessageEditPayloadData
     * @property {string} [content] - The message content.
     * @property {Array<Object>} [embeds] - The message embeds.
     * @property {MentionsData} [mentions] - The message mentions object.
     * @property {Array<Object>} [components] - The message components.
     * @property {number} [flags] - The flags of the message.
     * @property {Array<Object>} [files] - The files of the message.
     * @property {Array<Object>} [attachments] - The attachments of the message.
     */
    private Data;
    readonly d: Record<any, any>;
    readonly file: Record<string, any>[];
    private f;
    constructor(data: MessageUpdateBodyRequest | string, files?: MessagePayloadFileData[]);
    get payload(): Record<string, any>;
    get files(): Record<string, any>[];
}
export { EditMessagePayload };
