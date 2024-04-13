import { type Client } from "../../client/Client";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { type Guild } from "../Guild";
import { type ThreadChannel } from "../ThreadChannel";
import { ThreadMember } from "../ThreadMember";
import { FetchWithLimitAndAfter } from "./GuildMemberManager";
export interface FetchWithLimitAfterAndBefore extends FetchWithLimitAndAfter {
  before: string;
}

class ThreadMemberManager {
  private client: Client;
  id: string;
  guild?: Guild;
  memberCount: number;
  cache: Collection<string, ThreadMember>;
  constructor(client: Client, thread: ThreadChannel) {
    this.id = thread.id;
    this.guild = thread.guild;
    this.client = client;
    this.memberCount = 0;
    this.cache = new Collection();
  }

  private async _fetchAllMembersInThread(obj: FetchWithLimitAfterAndBefore) {
    var endpoint =
      Endpoints.ChannelThreadMembers(this.id) + `?with_member=true`;

    if (
      obj?.limit &&
      Number.isInteger(obj?.limit) &&
      (obj?.limit >= 1 || obj?.limit <= 100)
    ) {
      endpoint += "&limit=" + obj?.limit;
    }
    if (obj?.after && typeof obj?.after == "string") {
      endpoint += "&after=" + obj?.after;
    }
    if (obj?.before && typeof obj?.before == "string") {
      endpoint += "&before=" + obj?.before;
    }
    const response = await this.client.rest.request("GET", endpoint, true);

    if (response?.error || !response || !response.data) {
      return null;
    } else {
      for (var m of response.data as Array<any>) {
        var x = new ThreadMember(m, this.guild, this.client);
        this.cache.set(x.id, x);
      }

      return this.cache;
    }
  }
  async fetch(memberId: string | FetchWithLimitAfterAndBefore) {
    if (typeof memberId === "string") {
      const result = await this.client.rest.request(
        "GET",
        Endpoints.ChannelThreadMember(this.id, memberId)
      );

      if (result?.error || !result) {
        return result;
      } else {
        var x = new ThreadMember(
          result.data as Record<string, any>,
          this.guild,
          this.client
        );
        this.cache.set(x.id, x);

        return x;
      }
    } else if (
      typeof memberId === "object" ||
      memberId === null ||
      memberId === undefined
    ) {
      return await this._fetchAllMembersInThread(memberId || {});
    }
  }

  async remove(memberId: string) {
    const response = await this.client.rest.request(
      "DELETE",
      Endpoints.ChannelThreadMember(this.id, memberId),
      true
    );

    return response;
  }
}

export { ThreadMemberManager };
