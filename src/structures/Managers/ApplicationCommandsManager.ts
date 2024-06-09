import { APIApplicationCommand } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { CommandsBody, Nullable } from "../../common";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { setObj } from "../../utils/utils";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";

const Data = {
  name: "",
  name_localizations: null,
  type: 1,
  guild_id: null,
  description: null,
  description_localizations: null,
  options: null,
  default_member_permissions: null,
  dm_permission: null,
  default_permission: null,
  nsfw: null,
};
const Mapping = {
  default_member_permissions: [
    "defaultMemberPermissions",
    "defaultMemberPerms",
  ],
  default_permission: ["defaultPermissions", "defaultPerms"],
  name_localizations: ["nameLocalizations", "nameDictionary"],
  description_localizations: [
    "descriptionLocalizations",
    "descriptionDictionary",
  ],
  dm_permission: "dmPermission",
};

export interface ApplicationCommand extends APIApplicationCommand {
  defaultMemberPermissions: null | string;
  defaultMemberPerms: null | string;
  defaultPermission: boolean;
  defaultPerm: boolean;
  descriptionLocalizations: null | Record<
    | "en-US"
    | "en-GB"
    | "bg"
    | "zh-CN"
    | "zh-TW"
    | "hr"
    | "cs"
    | "da"
    | "nl"
    | "fi"
    | "fr"
    | "de"
    | "el"
    | "hi"
    | "hu"
    | "it"
    | "ja"
    | "ko"
    | "lt"
    | "no"
    | "pl"
    | "pt-BR"
    | "ro"
    | "ru"
    | "es-ES"
    | "es-419"
    | "sv-SE"
    | "th"
    | "tr"
    | "uk"
    | "vi",
    null | string
  >;
  descriptionDictionary: null | Record<
    | "en-US"
    | "en-GB"
    | "bg"
    | "zh-CN"
    | "zh-TW"
    | "hr"
    | "cs"
    | "da"
    | "nl"
    | "fi"
    | "fr"
    | "de"
    | "el"
    | "hi"
    | "hu"
    | "it"
    | "ja"
    | "ko"
    | "lt"
    | "no"
    | "pl"
    | "pt-BR"
    | "ro"
    | "ru"
    | "es-ES"
    | "es-419"
    | "sv-SE"
    | "th"
    | "tr"
    | "uk"
    | "vi",
    null | string
  >;
  dmPermission: boolean;
}

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

  async add(body: ApplicationCommand): Promise<Nullable<ErrorResponseFromApi | APIApplicationCommand>> {
    var data = setObj(Data, body, Mapping);
    if (!this.#client.user) return;
    if (this.target !== "global") {
      var response = await this.#client.rest.request(
        "POST",
        Endpoints.ApplicationGuildCommands(this.#client.user.id, this.target),
        true,
        { data }
      );
    } else {
      var response = await this.#client.rest.request(
        "POST",
        Endpoints.ApplicationCommands(this.#client.user.id),
        true,
        { data }
      );
    }

    if (!response) return null;

    if (response.error) {
      return response as ErrorResponseFromApi;
    } else {
      this.cache.set(response.data?.id, response.data);
      return this.cache.get(response.data?.id) as APIApplicationCommand;
    }
  }

  /**
   * Fetches a application command with their id.
   * @param {string} id - The ID of the application command to fetch.
   * @returns {Promise<Nullable<ErrorResponseFromApi | APIApplicationCommand>>}
   */

  async fetch(id: string): Promise<Nullable<ErrorResponseFromApi | APIApplicationCommand>> {
    if (!this.#client.user) return;
    if (this.target !== "global") {
      var response = await this.#client.rest.request(
        "GET",
        Endpoints.ApplicationGuildCommand(this.#client.user.id, this.target, id),
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
      this.cache.set(response.data?.id, response.data);
      return this.cache.get(response.data?.id) as APIApplicationCommand;
    }
  }
  async set(commands: CommandsBody[] | CommandsBody): Promise<Nullable<ErrorResponseFromApi | Collection<string, APIApplicationCommand>>> {
    // Reference: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    if (commands instanceof Array) {
      var data = [];
      for (var i of commands) {
        data.push(setObj(Data, i, Mapping));
      }

      if (!this.#client.user) return;

      if (this.target !== "global") {
        var response = await this.#client.rest.request(
          "PUT",
          Endpoints.ApplicationGuildCommands(this.#client.user.id, this.target),
          true,
          { data }
        );
      } else {
        var response = await this.#client.rest.request(
          "PUT",
          Endpoints.ApplicationCommands(this.#client.user.id),
          true,
          { data }
        );
      }

      if (!response) return null;

      if (response.error) {
        return response as ErrorResponseFromApi;
      } else {
        for (const i of response.data as ApplicationCommand[]) {
          if (!i || typeof i !== "object") continue;
          this.cache.set(i.id, i);
        }
      }
      return this.cache;
    } else {
      return null;
    }
  }

  /**
   * Removes a application command with their ID.
   * @param {string} id - The application command id to remove. 
   * @returns {Promise<Nullable<ErrorResponseFromApi | boolean>>}
   */

  async remove(id: string): Promise<Nullable<ErrorResponseFromApi | boolean>> {
    if (!this.#client.user) return;
    if (this.target !== "global") {
      var response = await this.#client.rest.request(
        "DELETE",
        Endpoints.ApplicationGuildCommand(this.#client.user.id, this.target, id),
        true
      );
    } else {
      var response = await this.#client.rest.request(
        "DELETE",
        Endpoints.ApplicationCommand(this.#client.user.id, id),
        true
      );
    }

    if(!response) return null;

    if(!response?.error) {
      return response as ErrorResponseFromApi;
    }

    return response?.error ? false : true;
  }
}

export { ApplicationCommandManager };
