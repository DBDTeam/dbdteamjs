import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v10";
export declare enum IntegrationTypes {
    GUILD_INSTALL = 0,
    USER_INSTALL = 1
}
export declare enum InteractionContexts {
    GUILD = 0,
    BOT_DM = 1,
    PRIVATE_CHANNEL = 2
}
export type CommandsBody = RESTPostAPIApplicationCommandsJSONBody & {
    /**
     * The integrations types of the command
     */
    integrations_types: IntegrationTypes[];
    /**
     * The contexts of the command
     */
    contexts: InteractionContexts[];
};
