import { type Client } from "../../client/Client";
import { Nullable } from "../../common";
import { EmojisEmptyAnswer, RemoveEmojiPayload } from "../../interfaces/message/Reactions";
import {
  ErrorResponseFromApi,
  ResponseFromApi,
} from "../../interfaces/rest/requestHandler";
import * as Endpoints from "../../rest/Endpoints";
import { getId } from "../../utils/utils";
import { type Message } from "../Message";

/**
 * Represents a manager for handling message reactions.
 */
class MessageReactions {
  /**
   * The client
   * @type {Client}
   */
  #client: Client;
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
 
  public reactions: Array<string>;

  /**
   * Constructs a new instance of the MessageReactions class.
   * @param {Client} client - The client instance to interact with the Discord API.
   * @param {Message} msgObj - The message object associated with these reactions.
   * @param {Array<string>} reacts - The reactions associated with the message.
   */
  constructor(client: Client, msgObj: Message, reacts: Array<any>) {
    this.#client = client;
    this.messageId = msgObj.id;
    this.channelId = msgObj.channelId;
    this.guildId = msgObj.guild.id;
    this.reactions = reacts;
  }

  /**
   * Gets the total count of reactions.
   * @returns {number} - The number of reactions.
   */
  get count(): number {
    return this.reactions.length;
  }

  /**
   * Removes specific reactions from the message.
   * @param {RemoveEmojiPayload} removeData - The data containing emojis and optional user to remove.
   * @returns {Promise<Nullable<EmojisEmptyAnswer[]>>} - The result of the removal operation.
   */
  async remove(removeData: RemoveEmojiPayload): Promise<Nullable<EmojisEmptyAnswer[]>> {
    var emojis = removeData.emojis;
    var user = removeData.user || "@me";

    var results: EmojisEmptyAnswer[] = [];

    if (typeof emojis === "object" && Array.isArray(emojis)) {
      for (var i of emojis) {
        var emoji = encodeURIComponent(getId(i));

        var result = await this.#client.rest.request(
          "DELETE",
          Endpoints.ChannelMessageReactionUser(
            this.channelId,
            this.messageId,
            emoji,
            user
          ),
          true
        );

        if (!result) continue;

        results.push({ success: result.error, emoji })
      }

      if (!results?.[0]) return null;

      for (var index in results) {
        const result = results[index];
        
        if ("success" in result && !result.success) {
          this.reactions.splice(Number(index), 1);
        }
      }

      return results;
    }
  }

  /**
   * Adds reactions to the message.
   * @param {...string} emojis - The emojis to add as reactions.
   * @returns {Promise<Nullable<EmojisEmptyAnswer[]>>} - The result of the add emoji operation.
   */
  async add(
    ...emojis: string[]
  ): Promise<Nullable<EmojisEmptyAnswer[]>>  {
    var results: EmojisEmptyAnswer[] = [];
    for (var i of emojis) {
      var emoji = encodeURIComponent(getId(i));

      var result = await this.#client.rest.request(
        "PUT",
        Endpoints.ChannelMessageReactionUser(
          this.channelId,
          this.messageId,
          emoji,
          "@me"
        ),
        true
      );

      if(!result) continue;

      results.push({ success: result.error, emoji });
    }
    for (var index in results) {
      const result = results[index];
      
      if ("success" in result && !result.success) {
        this.reactions.push(decodeURIComponent(result.emoji));
      }
    }

    return results;
  }

  /**
   * Removes all reactions from the message.
   * @returns {Promise<ResponseFromApi | ErrorResponseFromApi | null>} - The result of the removal operation.
   */
  async removeAll(): Promise<ResponseFromApi | ErrorResponseFromApi | null> {
    var result = await this.#client.rest.request(
      "DELETE",
      Endpoints.ChannelMessageReactions(this.channelId, this.messageId),
      true
    );

    this.reactions = []

    return result;
  }
}

export { MessageReactions };