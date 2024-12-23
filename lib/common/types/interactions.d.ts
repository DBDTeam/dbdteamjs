import { ApplicationCommandOptionType, InteractionType, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord-api-types/v10";
import { Channel, ForumChannel, ForumThreadChannel, GuildRole, TextChannel, ThreadChannel, User, VoiceChannel } from "../../structures";
import { Collection } from "../../utils/Collection";
/**
 * Represents the types of integrations for Discord commands.
 */
export declare enum IntegrationTypes {
    GUILD_INSTALL = 0,
    USER_INSTALL = 1
}
/**
 * Represents the contexts in which a Discord command can be executed.
 */
export declare enum InteractionContexts {
    GUILD = 0,
    BOT_DM = 1,
    PRIVATE_CHANNEL = 2
}
/**
 * Represents the body of a Discord command, including integrations and contexts.
 */
export type CommandsBody = RESTPostAPIChatInputApplicationCommandsJSONBody & {
    integrations_types?: IntegrationTypes[];
    contexts?: InteractionContexts[];
};
/**
 * Represents a value for a Discord interaction option.
 */
export type InteractionOptionValue = {
    /**
     * The name of the option
     */
    name: string;
    /**
     * The value of the option
     */
    value?: string;
    /**
     * The type of the option
     * @type { ApplicationCommandOptionType }
     */
    type: ApplicationCommandOptionType;
    /**
     * The options of the option (only if type is SubCommand or SubCommandGroup)
     */
    options?: Collection<string, InteractionOptionValue>;
};
export type InteractionResponseData = {
    name: string;
    id: string;
    type: InteractionType;
    user: User;
    userId: string;
};
export type SelectMenuResolvedValues = (Channel | TextChannel | VoiceChannel | ThreadChannel | ForumChannel | ForumThreadChannel | GuildRole | User)[];
