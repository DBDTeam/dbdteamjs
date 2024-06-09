import { APIApplicationCommand } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { CommandsBody, Nullable } from "../../common";
import { Collection } from "../../utils/Collection";
import { ErrorResponseFromApi } from "../../interfaces/rest/requestHandler";
export interface ApplicationCommand extends APIApplicationCommand {
    defaultMemberPermissions: null | string;
    defaultMemberPerms: null | string;
    defaultPermission: boolean;
    defaultPerm: boolean;
    descriptionLocalizations: null | Record<"en-US" | "en-GB" | "bg" | "zh-CN" | "zh-TW" | "hr" | "cs" | "da" | "nl" | "fi" | "fr" | "de" | "el" | "hi" | "hu" | "it" | "ja" | "ko" | "lt" | "no" | "pl" | "pt-BR" | "ro" | "ru" | "es-ES" | "es-419" | "sv-SE" | "th" | "tr" | "uk" | "vi", null | string>;
    descriptionDictionary: null | Record<"en-US" | "en-GB" | "bg" | "zh-CN" | "zh-TW" | "hr" | "cs" | "da" | "nl" | "fi" | "fr" | "de" | "el" | "hi" | "hu" | "it" | "ja" | "ko" | "lt" | "no" | "pl" | "pt-BR" | "ro" | "ru" | "es-ES" | "es-419" | "sv-SE" | "th" | "tr" | "uk" | "vi", null | string>;
    dmPermission: boolean;
}
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
    add(body: ApplicationCommand): Promise<Nullable<ErrorResponseFromApi | APIApplicationCommand>>;
    /**
     * Fetches a application command with their id.
     * @param {string} id - The ID of the application command to fetch.
     * @returns {Promise<Nullable<ErrorResponseFromApi | APIApplicationCommand>>}
     */
    fetch(id: string): Promise<Nullable<ErrorResponseFromApi | APIApplicationCommand>>;
    set(commands: CommandsBody[] | CommandsBody): Promise<Nullable<ErrorResponseFromApi | Collection<string, APIApplicationCommand>>>;
    /**
     * Removes a application command with their ID.
     * @param {string} id - The application command id to remove.
     * @returns {Promise<Nullable<ErrorResponseFromApi | boolean>>}
     */
    remove(id: string): Promise<Nullable<ErrorResponseFromApi | boolean>>;
}
export { ApplicationCommandManager };
