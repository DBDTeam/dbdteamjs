import { APIApplicationCommand } from "discord-api-types/v10";
export interface ApplicationCommand extends APIApplicationCommand {
    defaultMemberPermissions: null | string;
    defaultMemberPerms: null | string;
    defaultPermission: boolean;
    defaultPerm: boolean;
    descriptionLocalizations: null | Record<"en-US" | "en-GB" | "bg" | "zh-CN" | "zh-TW" | "hr" | "cs" | "da" | "nl" | "fi" | "fr" | "de" | "el" | "hi" | "hu" | "it" | "ja" | "ko" | "lt" | "no" | "pl" | "pt-BR" | "ro" | "ru" | "es-ES" | "es-419" | "sv-SE" | "th" | "tr" | "uk" | "vi", null | string>;
    descriptionDictionary: null | Record<"en-US" | "en-GB" | "bg" | "zh-CN" | "zh-TW" | "hr" | "cs" | "da" | "nl" | "fi" | "fr" | "de" | "el" | "hi" | "hu" | "it" | "ja" | "ko" | "lt" | "no" | "pl" | "pt-BR" | "ro" | "ru" | "es-ES" | "es-419" | "sv-SE" | "th" | "tr" | "uk" | "vi", null | string>;
    dmPermission: boolean;
}
