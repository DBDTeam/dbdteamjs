import { type Client } from "../../client/Client";
import { Nullable } from "../../common";
import { ReactionEmptyAnswer, RemoveReactionPayload } from "../../common/interfaces/message/Reactions";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils";
import { Utilities } from "../../utils/utils";
import { type Message } from "../Message";
import { RESTResponse } from "../../rest/requestHandler";

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
  constructor(client: Client, protected message: Message, reacts: Array<any>) {
    this.#client = client;
    this.messageId = message.id;
    this.channelId = message.channelId;
    this.reacts = reacts;
  }

  get() {
    return this.reacts
  }

  async fetch() {
    var response = await this.message.channel.messages.fetch(this.messageId)

    if(!response) return response;
    if((response as RESTResponse).error) return response;
    this.reacts = (response as Message).reactions.reacts
    
    return this.reacts
  }

  /**
   * Gets the total count of reactions.
   * @returns {number} - The number of reactions.
   */
  get count(): number {
    return this.reacts.length;
  }

  /**
   * Removes specific reactions from the message.
   * @param {RemoveEmojiPayload} removeData - The data containing emojis and optional user to remove.
   * @returns {Promise<Nullable<EmojisEmptyAnswer[]>>} - The result of the removal operation.
   */
  async remove(removeData: RemoveReactionPayload): Promise<Nullable<Collection<string, ReactionEmptyAnswer>>> {
    var emojis = Array.isArray(removeData.reactions) ? removeData.reactions : [removeData.reactions];
    var user = removeData.user || "@me";

    var results = new Collection<string, ReactionEmptyAnswer>();
      for (var i of emojis) {
        var emoji = encodeURIComponent(Utilities.getId(i));

        var result = await this.#client.rest.request<any>(
          "DELETE",
          Endpoints.ChannelMessageReactionUser(
            this.channelId,
            this.messageId,
            emoji,
            user
          ),
          true
        );

        if(!result) return result;

        results.set(i, { success: result.error ? false : true, reaction: i })
      }

      if (results.size < 0) return null;

    return results;
  }

  /**
   * Adds reactions to the message.
   * @param {...string} emojis - The emojis to add as reactions.
   * @returns {Promise<Nullable<Collection<string, EmojisEmptyAnswer>>>} - The result of the add emoji operation.
   */
  async add(
    ...emojis: string[]
  ): Promise<Nullable<Collection<string, ReactionEmptyAnswer>>>  {
    var results: Collection<string, ReactionEmptyAnswer> = new Collection();
    for (var emoji of emojis) {
      var emojiEncoded = encodeURIComponent(Utilities.getId(emoji));

      var result = await this.#client.rest.request(
        "PUT",
        Endpoints.ChannelMessageReactionUser(
          this.channelId,
          this.messageId,
          emojiEncoded,
          "@me"
        ),
        true
      );

      if(!result) return result;

      results.set(emoji, { success: result.error ? false : true, reaction: emoji });
    }

    return results;
  }

  /**
   * Removes all reactions from the message.
   * @returns {Promise<RESTResponse | null>} - The result of the removal operation.
   */
  async removeAll(): Promise<boolean> {
    var result = await this.#client.rest.request(
      "DELETE",
      Endpoints.ChannelMessageReactions(this.channelId, this.messageId),
      true
    );

    if(result?.isError()) return false
    this.reacts = [];
    return true;
  }
}

export { MessageReactions };