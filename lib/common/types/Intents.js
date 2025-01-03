"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intents = void 0;
/**
 * Enum representing the different intents that can be used when initializing a Discord client.
 * Each intent is represented by a bitfield value.
 */
var Intents;
(function (Intents) {
    /**
     * Enables events related to guilds.
     */
    Intents[Intents["Guilds"] = 1] = "Guilds";
    /**
     * Enables events related to guild members.
     */
    Intents[Intents["GuildMembers"] = 2] = "GuildMembers";
    /**
     * Enables events related to guild moderation.
     */
    Intents[Intents["GuildModeration"] = 4] = "GuildModeration";
    /**
     * Enables events related to guild emojis and stickers.
     */
    Intents[Intents["GuildEmojisAndStickers"] = 8] = "GuildEmojisAndStickers";
    /**
     * Enables events related to guild integrations.
     */
    Intents[Intents["GuildIntegrations"] = 16] = "GuildIntegrations";
    /**
     * Enables events related to guild webhooks.
     */
    Intents[Intents["GuildWebhooks"] = 32] = "GuildWebhooks";
    /**
     * Enables events related to guild invites.
     */
    Intents[Intents["GuildInvites"] = 64] = "GuildInvites";
    /**
     * Enables events related to guild voice states.
     */
    Intents[Intents["GuildVoiceStates"] = 128] = "GuildVoiceStates";
    /**
     * Enables events related to guild presences.
     */
    Intents[Intents["GuildPresences"] = 256] = "GuildPresences";
    /**
     * Enables events related to guild messages.
     */
    Intents[Intents["GuildMessages"] = 512] = "GuildMessages";
    /**
     * Enables events related to guild message reactions.
     */
    Intents[Intents["GuildMessageReactions"] = 1024] = "GuildMessageReactions";
    /**
     * Enables events related to guild message typing.
     */
    Intents[Intents["GuildMessageTyping"] = 2048] = "GuildMessageTyping";
    /**
     * Enables events related to direct messages.
     */
    Intents[Intents["DirectMessages"] = 4096] = "DirectMessages";
    /**
     * Enables events related to direct message reactions.
     */
    Intents[Intents["DirectMessagesReactions"] = 8192] = "DirectMessagesReactions";
    /**
     * Enables events related to direct message typing.
     */
    Intents[Intents["DirectMessageTyping"] = 16384] = "DirectMessageTyping";
    /**
     * Enables access to message content.
     */
    Intents[Intents["MessageContent"] = 32768] = "MessageContent";
    /**
     * Enables events related to guild scheduled events.
     */
    Intents[Intents["GuildScheduledEvents"] = 65536] = "GuildScheduledEvents";
    /**
     * Enables events related to auto-moderation configuration.
     */
    Intents[Intents["AutoModerationConfiguration"] = 1048576] = "AutoModerationConfiguration";
    /**
     * Enables events related to auto-moderation execution.
     */
    Intents[Intents["AutoModerationExecution"] = 2097152] = "AutoModerationExecution";
})(Intents || (exports.Intents = Intents = {}));
