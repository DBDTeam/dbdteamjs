import { AllowedMentionsTypes, APIAttachment } from "discord-api-types/v10";
import {
  MessagePayloadData,
  MessagePayloadFileData,
} from "../../interfaces/message/MessagePayload";
import { MessageBodyRequest } from "../../interfaces/other";
import { setObj } from "../../utils/utils";

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
class MessagePayload {
  private MENTIONS = [
    AllowedMentionsTypes.User,
    AllowedMentionsTypes.Role,
    AllowedMentionsTypes.Everyone,
  ];

  private Data: Record<any, any> = {
    content: "",
    tts: false,
    embeds: null,
    allowed_mentions: null,
    message_reference: null,
    components: null,
    sticker_ids: null,
    files: null,
    nonce: Date.now(),
    attachments: null,
  };

  readonly d: Record<any, any>;
  readonly file: Record<any, any>;
  private f: any;

  /**
   * Creates a message payload to send messages.
   * @param {MessagePayloadData} data
   * @param {Files} files
   */
  constructor(
    data: MessageBodyRequest | string,
    files: APIAttachment[] = ([] = [])
  ) {
    this.d =
      typeof data === "string"
        ? { content: data }
        : setObj(this.Data, data, { sticker_ids: "stickers" });
    this.file = [];
    this.f = files;

    if (this.d.reply) {
      this.d.message_reference = {};
      if (this.d.reply.mention) {
        this.d.allowed_mentions = {};
        this.d.allowed_mentions.replied_user = true;
      }

      if (this.d.reply.error === true) {
        this.d.message_reference.fail_if_not_exists = true;
      }

      this.d.message_reference.message_id = this.d.reply.id;
    }

    if (this.d.mentions) {
      this.d.allowed_mentions = {};
      if (this.d.mentions.parse) {
        this.d.allowed_mentions.parse = this.MENTIONS.filter((mention) =>
          this.d.allowed_mentions.parse.some(
            (allowedMention: AllowedMentionsTypes) =>
              mention.toLowerCase() === allowedMention?.toLowerCase()
          )
        );
      }

      this.d.allowed_mentions.users = this.d.mentions.users?.[0]
        ? this.d.mentions.users
        : null;
      this.d.allowed_mentions.roles = this.d.mentions.roles?.[0]
        ? this.d.mentions.roles
        : null;
    }

    if (typeof this.f === "object") {
      var i: number = 0;
      const filesArray = Array.isArray(this.f) ? this.f : [this.f];
      for (const currentItem of filesArray) {
        if (
          typeof currentItem === "object" &&
          "url" in currentItem &&
          "name" in currentItem
        ) {
          this.file.push({ name: currentItem.name, url: currentItem.url });
          this.d.attachments.push({
            id: i,
            filename: currentItem.name,
            description: currentItem.description,
          });
          i++;
        }
      }
    }

    delete this.d.reply;
    delete this.d.mentions;
  }

  get payload(): MessagePayloadData {
    return this.d;
  }

  get files(): MessagePayloadFileData[] {
    return this.files;
  }
}

export { MessagePayload };
