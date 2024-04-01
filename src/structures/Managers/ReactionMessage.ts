import * as Endpoints from "../../rest/Endpoints.js";
import { getId } from "../../utils/utils.js";
import { type Client } from "../../client/Client"
import { type Message } from "../Message";
import { ErrorResponseFromApi, ResponseFromApi } from "../../rest/requestHandler.js";

interface RemoveEmojiPayload {
  emojis: Array<string>;
  user?: string | null | undefined | "@me"
}

class MessageReactions {
  readonly client: Client;
  readonly messageId: string;
  readonly channelId: string;
  readonly guildId: string;
  public reactions: Array<any>;
  constructor(client: Client, msgObj: Message, reacts: Array<any>) {
    this.client = client;
    this.messageId = msgObj.id;
    this.channelId = msgObj.channelId;
    this.guildId = msgObj.guildId;
    this.reactions = reacts;
  }

  get count() {
    return this.reactions.length;
  }

  async remove(removeData: RemoveEmojiPayload) {
    // TODO: I need help with this, i'm not understanding this error when i use:
    //async remove(removeData: RemoveEmojiPayload): Promise<Array<ResponseFromApi | ErrorResponseFromApi | null>>
    var emojis = removeData.emojis
    var user = removeData.user || "@me";

    var results = [];

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

        results.push(result);
      }

      return results;
    }
  }

  async add(...emojis: string[]): Promise<Array<ResponseFromApi | ErrorResponseFromApi | null>> {
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
