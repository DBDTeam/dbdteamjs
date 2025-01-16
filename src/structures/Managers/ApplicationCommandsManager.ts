import { APIApplicationCommand } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { CommandsBody, Nullable } from "../../common";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { ClientTypeError } from "../../client/errors/ClientError";
import { ErrorNames } from "../../client/errors/ErrorList";
import { RESTResponse } from "../../rest/requestHandler";

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
    body: CommandsBody | CommandsBody[]
  ): Promise<
    Nullable<RESTResponse | Collection<string, APIApplicationCommand>>
  > {
    if (!body || typeof body !== "object")
      throw new ClientTypeError(
        ErrorNames.InvalidType,
        "APIApplicationCommand",
        "body"
      );
    if (!this.#client.user) return;

    body = Array.isArray(body) ? body : [body];
    const combined = body.concat(this.cache.toJSON() as CommandsBody[]);

    return await this.set(combined);
  }

  /**
   * Fetches a application command with their id.
   * @param {string} id - The ID of the application command to fetch.
   * @returns {Promise<Nullable<RESTResponse | APIApplicationCommand>>}
   */

  async fetch(
    id: string
  ): Promise<Nullable<RESTResponse | APIApplicationCommand>> {
    if (!id && typeof id !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "id");
    if (!this.#client.user) return;
    var response = await this.#client.rest.request<APIApplicationCommand>(
      "GET",
      this.target === "global"
        ? Endpoints.ApplicationCommand(this.#client.user.id, id)
        : Endpoints.ApplicationGuildCommand(
            this.#client.user.id,
            this.target,
            id
          ),
      true
    );

    if (!response) return null;

    if (response.error) return response as RESTResponse;

    this.cache.set(response.id, response as APIApplicationCommand);
    return this.cache.get(response.id) as APIApplicationCommand;
  }
  async set(
    commands: CommandsBody[] | CommandsBody
  ): Promise<
    Nullable<RESTResponse | Collection<string, APIApplicationCommand>>
  > {
    if (!commands || typeof commands !== "object")
      throw new ClientTypeError(
        ErrorNames.InvalidType,
        "APIApplicationCommand or APIApplicationCommand[]",
        "body"
      );

    if (!this.#client.user) return;

    commands = Array.isArray(commands) ? commands : [commands];
    commands = [...new Set(commands)];

    const response = await this.#client.rest.request<APIApplicationCommand[]>(
      "PUT",
      this.target === "global"
        ? Endpoints.ApplicationCommands(this.#client.user.id)
        : Endpoints.ApplicationGuildCommands(this.#client.user.id, this.target),
      true,
      commands
    );

    if (!response) return null;

    if (response.error) return response as RESTResponse;

    for (const command of response as APIApplicationCommand[]) {
      if (!command || typeof command !== "object") continue;
      this.cache.set(command.id, command);
    }

    return this.cache;
  }

  /**
   * Removes a application command with their ID.
   * @param {string} id - The application command id to remove.
   * @returns {Promise<Nullable<RESTResponse | boolean>>}
   */

  async remove(id: string): Promise<Nullable<RESTResponse | boolean>> {
    if (!id && typeof id !== "string")
      throw new ClientTypeError(ErrorNames.InvalidType, "string", "id");
    if (!this.#client.user) return;

    const response = await this.#client.rest.request<APIApplicationCommand>(
      "DELETE",
      this.target === "global"
        ? Endpoints.ApplicationCommand(this.#client.user.id, id)
        : Endpoints.ApplicationGuildCommand(
            this.#client.user.id,
            this.target,
            id
          ),
      true
    );

    if (!response) return null;

    if (!response?.error) return response as RESTResponse;

    return response?.error ? false : true;
  }
}

export { ApplicationCommandManager };
