import { type Client } from "../../client/Client";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { setObj } from "../../utils/utils";
import { Message } from "../Message";

export class ChannelMessageManager<T extends Record<any, any>> {
  private client: Client;
  public cache: Collection<string, Message>;
  constructor(public channel: T, client: Client) {
    this.channel = channel;
    this.client = client;
    this.cache = new Collection();
  }

  get guild() {
    if ("guild" in this.channel) return this.channel.guild;
    else null;
  }
  async fetch(msgId: string | Record<any, any>) {
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
        round: !!data.round,
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

      const messages = await this.client.rest.request("GET", endpoint, true);

      if (!messages) return;

      if (messages.error) {
        return null;
      } else {
        var response = [];
        for (var i of messages.data as Array<any>) {
          const msg = new Message(i, this.client);

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
      const response = await this.client.rest.request(
        "GET",
        Endpoints.ChannelMessage(this.channel.id, msgId),
        true
      );

      if (!response) return null;

      if (response.error) {
        return null;
      } else {
        if (!response.data) return null;
        const msg = new Message(
          { ...response.data, guild: this.guild },
          this.client
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
