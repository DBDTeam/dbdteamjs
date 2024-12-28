import { APIApplicationCommand } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { CommandsBody, Nullable } from "../../common";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";
import { ClientTypeError } from "../../client/errors/ClientError";
import { ErrorNames } from "../../client/errors/ErrorList";

class ApplicationCommandManager {
  #client: Client;
  /**
   * The current target to add commands. ("global" for add in all guilds.)
   */
  public target: string;
  /**
   * The cache of the commands that are already created. (only if they are created in the same sesion as the client is.)
   */
  public cache: Collection<string, APIApplicationCommand>;
  constructor(client: Client, guildId: string | null | undefined = "global") {
    this.#client = client;
    this.target = guildId || "global";
    this.cache = new Collection();
  }

  /**
   * Creates a command in the current target.
   * @param {ApplicationCommand} body - The body of the new application command.
   * @returns {}
   */

  async add(
    body: APIApplicationCommand
  ): Promise<Nullable<ErrorResponseFromApi | APIApplicationCommand>> {
    if (!body || typeof body !== "object")
      throw new ClientTypeError(
        ErrorNames.InvalidType,
        "APIApplicationCommand",
        "body"
      );
    if (!this.#client.user) return;
    if (this.target !== "global") {
      var response = await this.#client.rest.request(
        "POST",
        Endpoints.ApplicationGuildCommands(this.#client.user.id, this.target),
        true,
        { data: body }
      );
    } else {
      var response = await this.#client.rest.request(
        "POST",
        Endpoints.ApplicationCommands(this.#client.user.id),
        true,
        { data: body }
      );
    }

    if (!response) return null;

    if (response.error) {
      return response as ErrorResponseFromApi;
    } else {
      this.cache.set(response.data?.id, response.data as APIApplicationCommand);
      return this.cache.get(response.data?.id) as APIApplicationCommand;
    }
  }

  /**
   * Fetches a application command with their id.
   * @param {string} id - The ID of the application command to fetch.
   * @returns {Promise<Nullable<ErrorResponseFromApi | APIApplicationCommand>>}
   */

  async fetch(
    id: string
  ): Promise<Nullable<ErrorResponseFromApi | APIApplicationCommand>> {
    if (!id && typeof id !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "id");
    if (!this.#client.user) return;
    if (this.target !== "global") {
      var response = await this.#client.rest.request(
        "GET",
        Endpoints.ApplicationGuildCommand(
          this.#client.user.id,
          this.target,
          id
        ),
        true
      );
    } else {
      var response = await this.#client.rest.request(
        "GET",
        Endpoints.ApplicationCommand(this.#client.user.id, id),
        true
      );
    }

    if (!response) return null;

    if (response.error) {
      return response as ErrorResponseFromApi;
    } else {
      this.cache.set(response.data?.id, response.data as APIApplicationCommand);
      return this.cache.get(response.data?.id) as APIApplicationCommand;
    }
  }
  async set(
    commands: CommandsBody[] | CommandsBody
  ): Promise<
    Nullable<ErrorResponseFromApi | Collection<string, APIApplicationCommand>>
  > {
    if (!commands || typeof commands !== "object")
      throw new ClientTypeError(
        ErrorNames.InvalidType,
        "APIApplicationCommand or APIApplicationCommand[]",
        "body"
      );

    if (!this.#client.user) return;

    if (this.target !== "global") {
      var response = await this.#client.rest.request(
        "PUT",
        Endpoints.ApplicationGuildCommands(this.#client.user.id, this.target),
        true,
        { data: commands }
      );
    } else {
      var response = await this.#client.rest.request(
        "PUT",
        Endpoints.ApplicationCommands(this.#client.user.id),
        true,
        { data: commands }
      );
    }

    if (!response) return null;

    if (response.error) {
      return response as ErrorResponseFromApi;
    } else {
      for (const i of response.data as APIApplicationCommand[]) {
        if (!i || typeof i !== "object") continue;
        this.cache.set(i.id, i);
      }
    }
    return this.cache;
  }

  /**
   * Removes a application command with their ID.
   * @param {string} id - The application command id to remove.
   * @returns {Promise<Nullable<ErrorResponseFromApi | boolean>>}
   */

  async remove(id: string): Promise<Nullable<ErrorResponseFromApi | boolean>> {
    if (!id && typeof id !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "id");
    if (!this.#client.user) return;
    if (this.target !== "global") {
      var response = await this.#client.rest.request(
        "DELETE",
        Endpoints.ApplicationGuildCommand(
          this.#client.user.id,
          this.target,
          id
        ),
        true
      );
    } else {
      var response = await this.#client.rest.request(
        "DELETE",
        Endpoints.ApplicationCommand(this.#client.user.id, id),
        true
      );
    }

    if (!response) return null;

    if (!response?.error) {
      return response as ErrorResponseFromApi;
    }

    return response?.error ? false : true;
  }
}

export { ApplicationCommandManager };
