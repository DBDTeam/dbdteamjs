import { APIApplicationCommand } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { CommandsBody, Nullable } from "../../common";
import { Collection } from "../../utils/Collection";
import { RESTResponse } from "../../rest/requestHandler";
declare class ApplicationCommandManager {
    #private;
    /**
     * The current target to add commands. ("global" for add in all guilds.)
     */
    target: string;
    /**
     * The cache of the commands that are already created. (only if they are created in the same sesion as the client is.)
     */
    cache: Collection<string, APIApplicationCommand>;
    constructor(client: Client, guildId?: string | null | undefined);
    /**
     * Creates a command in the current target.
     * @param {ApplicationCommand} body - The body of the new application command.
     * @returns {}
     */
    add(body: CommandsBody | CommandsBody[]): Promise<Nullable<RESTResponse | Collection<string, APIApplicationCommand>>>;
    /**
     * Fetches a application command with their id.
     * @param {string} id - The ID of the application command to fetch.
     * @returns {Promise<Nullable<RESTResponse | APIApplicationCommand>>}
     */
    fetch(id: string): Promise<Nullable<RESTResponse | APIApplicationCommand>>;
    set(commands: CommandsBody[] | CommandsBody): Promise<Nullable<RESTResponse | Collection<string, APIApplicationCommand>>>;
    /**
     * Removes a application command with their ID.
     * @param {string} id - The application command id to remove.
     * @returns {Promise<Nullable<RESTResponse | boolean>>}
     */
    remove(id: string): Promise<Nullable<RESTResponse | boolean>>;
}
export { ApplicationCommandManager };
