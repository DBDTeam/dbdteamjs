import { type Client } from "../../client/Client";
import { Nullable } from "../../common";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { setObj } from "../../utils/utils";
import { Guild } from "../Guild";
import { Message } from "../Message";

export class ChannelMessageManager<T extends Record<any, any>> {
  #client: Client;
  public cache: Collection<string, Message>;

  /**
   * Constructs a new ChannelMessageManager instance.
   * @param {T} channel - The channel this manager handles messages for.
   * @param {Client} client - The client instance to interact with the Discord API.
   */
  constructor(public channel: T, client: Client) {
    this.channel = channel;
    this.#client = client;
    this.cache = new Collection();
  }

  /**
   * Gets the guild associated with the channel, if available.
   * @returns {Guild | null} - The guild associated with the channel or null if none exists.
   */
  get guild(): Guild | null {
    if ("guild" in this.channel) return this.channel.guild;
    else return null;
  }

  /**
   * Fetches messages from the channel.
   * @param {string | Record<any, any>} msgId - The ID of the message to fetch or an object with query parameters.
   * @returns {Promise<Message | Message[] | null>} - The fetched message(s) or null if not found.
   */
  async fetch(msgId: string | Record<any, any>): Promise<Nullable<Message | Message[]>> {
    if (typeof msgId === "object" && msgId instanceof Object) {
      const config = {
        limit: 50,
        after: null,
        before: null,
        around: null,
      };

      const data = setObj(config, msgId, {});

      var endpoint = Endpoints.ChannelMessages(this.channel.id);

      const conditions = {
        limit: data.limit >= 1 && data.limit <= 100,
        after: !!data.after,
        before: !!data.before,
        around: !!data.around,
      };

      if (conditions.limit) {
        endpoint += "?limit=" + data.limit;
      }
      if (data.after) {
        endpoint += (conditions.limit ? "?after=" : "&after=") + data.after;
      }
      if (data.before) {
        endpoint +=
          (conditions.limit || conditions.after ? "?before=" : "&before=") +
          data.before;
      }
      if (data.around) {
        endpoint +=
          (conditions.limit || conditions.before ? "?round=" : "&round=") +
          data.round;
      }

      const messages = await this.#client.rest.request("GET", endpoint, true);

      if (!messages) return null;

      if (messages.error) {
        return null;
      } else {
        var response = [];
        for (var i of messages.data as Array<any>) {
          const msg = new Message(i, this.#client);

          if (!this.channel.messages) return null;

          if (this.channel?.messages.cache.get(i.id)) {
            if (!msg.channel && !this.channel) {
              msg.channel = this.channel;
            }
            this.channel.messages.cache.set(i.id, msg);
          }

          response.push(msg);
        }

        return response;
      }
    } else if (typeof msgId === "string") {
      const response = await this.#client.rest.request(
        "GET",
        Endpoints.ChannelMessage(this.channel.id, msgId),
        true
      );

      if (!response) return null;

      if (response.error) {
        return null;
      } else {
        if (!response.data) return null;
        const msg = new Message( //@ts-ignore
          { ...response.data, guild: this.guild },
          this.#client
        );
        if (!msg.channel && !this.channel) {
          msg.channel = this.channel;
        }
        if (this.channel.messages.cache.get(response.data.id)) {
          this.channel.messages.cache.set(response.data.id, msg);
        }
        return msg;
      }
    }
  }
}
