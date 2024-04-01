import { Collection } from "../../utils/Collection";
import * as Endpoints from "../../rest/Endpoints";
import { type Client } from "../../client/Client"

class GuildManager {
  readonly client: Client;
  public cache: Collection;
  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection();
  }
  async fetch(id: string) {
    const response = await this.client.rest.request(
      "GET",
      Endpoints.Guild(id),
      true
    );

    if(!response) return null;

    var guild = response.data;

    return guild;
  }
}

export { GuildManager };
