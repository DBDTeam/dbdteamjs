import { Collection } from "../../utils/Collection";
import * as Endpoints from "../../rest/Endpoints";
import { type Client } from "../../client/Client"
import { type Guild } from "../Guild";

class GuildManager {
  #client: Client;
  public cache: Collection<string, Guild>;
  constructor(client: Client) {
    this.#client = client;
    this.cache = new Collection();
  }
  /**
   * Fetches a guild using the guild id.
   * @param id - The Guild id
   * @returns {Guild | null}
   */
  async fetch(id: string) {
    const response = await this.#client.rest.request(
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
