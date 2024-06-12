import { type Client } from "../../client/Client";
import { Nullable } from "../../common";
import {
  ErrorResponseFromApi,
  ResponseFromApi,
} from "../../interfaces/rest/requestHandler";
import * as Endpoints from "../../rest/Endpoints";
import { getId } from "../../utils/utils";
import { type Message } from "../Message";

interface RemoveEmojiPayload {
  emojis: Array<string>;
  user?: string | null | undefined | "@me";
}

/**
 * Represents a manager for handling message reactions.
 */
class MessageReactions {
  readonly client: Client;
  readonly messageId: string;
  readonly channelId: string;
  readonly guildId?: string;
  public reactions: Array<any>;

  /**
   * Constructs a new instance of the MessageReactions class.
   * @param {Client} client - The client instance to interact with the Discord API.
   * @param {Message} msgObj - The message object associated with these reactions.
   * @param {Array<any>} reacts - The reactions associated with the message.
   */
  constructor(client: Client, msgObj: Message, reacts: Array<any>) {
    this.client = client;
    this.messageId = msgObj.id;
    this.channelId = msgObj.channelId;
    this.guildId = msgObj.guildId;
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
   * @returns {Promise<Nullable<ResponseFromApi[] | ErrorResponseFromApi[]>>} - The result of the removal operation.
   */
  async remove(removeData: RemoveEmojiPayload): Promise<Nullable<ResponseFromApi[] | ErrorResponseFromApi[]>> {
    var emojis = removeData.emojis;
    var user = removeData.user || "@me";

    var results: Array<ResponseFromApi | ErrorResponseFromApi> = [];

    if (typeof emojis === "object" && Array.isArray(emojis)) {
      for (var i of emojis) {
        var emoji = encodeURIComponent(getId(i));

        var result = await this.client.rest.request(
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

        if (result?.error) {
          results.push(result as ErrorResponseFromApi);
        } else {
          results.push(result as ResponseFromApi);
        }
      }

      if (!results?.[0]) return null;

      return results;
    }
  }

  /**
   * Adds reactions to the message.
   * @param {...string} emojis - The emojis to add as reactions.
   * @returns {Promise<Array<ResponseFromApi | ErrorResponseFromApi | null>>} - The result of the add operation.
   */
  async add(
    ...emojis: string[]
  ): Promise<Array<ResponseFromApi | ErrorResponseFromApi | null>> {
    var results = [];
    for (var i of emojis) {
      var emoji = encodeURIComponent(getId(i));

      var result = await this.client.rest.request(
        "PUT",
        Endpoints.ChannelMessageReactionUser(
          this.channelId,
          this.messageId,
          emoji,
          "@me"
        ),
        true
      );

      results.push(result);
    }

    return results;
  }

  /**
   * Removes all reactions from the message.
   * @returns {Promise<ResponseFromApi | ErrorResponseFromApi | null>} - The result of the removal operation.
   */
  async removeAll(): Promise<ResponseFromApi | ErrorResponseFromApi | null> {
    var result = await this.client.rest.request(
      "DELETE",
      Endpoints.ChannelMessageReactions(this.channelId, this.messageId),
      true
    );

    return result;
  }
}

export { MessageReactions };