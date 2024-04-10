import { APIApplicationCommand } from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import { Collection } from "../../utils/Collection";
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
    private client;
    target: string;
    cache: Collection<string, Record<any, any>>;
    constructor(client: Client, guildId?: string | null | undefined);
    add(obj: ApplicationCommand): Promise<Record<any, any> | import("../../interfaces/rest/requestHandler").ResponseFromApi | null | undefined>;
    fetch(id: string): Promise<Record<any, any> | import("../../interfaces/rest/requestHandler").ResponseFromApi | null | undefined>;
    set(commands: Array<ApplicationCommand> | ApplicationCommand): Promise<Collection<string, Record<any, any>> | null | undefined>;
    remove(id: string): Promise<import("../../interfaces/rest/requestHandler").ResponseFromApi | null | undefined>;
}
export { ApplicationCommandManager };
