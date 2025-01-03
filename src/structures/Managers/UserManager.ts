import { APIUser } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { User } from "../User";
import { Nullable } from "../../common";
import { RESTResponse } from "../../rest/requestHandler";

/**
 * Manages user-related operations such as fetching user data.
 */
class UserManager {
  #client: Client;
  public cache: Collection<string, User>;

  /**
   * Constructs a new UserManager.
   * @param client - The client instance.
   */
  constructor(client: Client) {
    this.#client = client;
    this.cache = new Collection();
  }

  /**
   * Fetches a user by their ID.
   * @param userId - The ID of the user to fetch.
   * @returns The fetched User instance or an error response.
   */
  async fetch(userId: string): Promise<Nullable<User | RESTResponse>> {
    const result = await this.#client.rest.request(
      "GET",
      Endpoints.User(userId),
      true
    );

    if (result?.error || !result || !result?.data) {
      return result as RESTResponse;
    } else {
      var x = new User(result.data as APIUser, this.#client);
      return x;
    }
  }
}

export { UserManager };
