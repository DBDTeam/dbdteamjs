import { Collection } from "../../utils/Collection";
import * as Endpoints from "../../rest/Endpoints";
import { type Client } from "../../client/Client"
import { Guild } from "../Guild";
import { APIGuild } from "discord-api-types/v10";

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
    const response = await this.#client.rest.request<APIGuild>(
      "GET",
      Endpoints.Guild(id),
      true
    );

    if(!response || !response.hasData()) return null;

    var guild = new Guild(response.data, this.#client);
    this.cache.set(guild.id, guild)

    return guild;
  }
}

export { GuildManager };
