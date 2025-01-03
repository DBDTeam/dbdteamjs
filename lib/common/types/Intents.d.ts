/**
 * Enum representing the different intents that can be used when initializing a Discord client.
 * Each intent is represented by a bitfield value.
 */
export declare enum Intents {
    /**
     * Enables events related to guilds.
     */
    Guilds = 1,
    /**
     * Enables events related to guild members.
     */
    GuildMembers = 2,
    /**
     * Enables events related to guild moderation.
     */
    GuildModeration = 4,
    /**
     * Enables events related to guild emojis and stickers.
     */
    GuildEmojisAndStickers = 8,
    /**
     * Enables events related to guild integrations.
     */
    GuildIntegrations = 16,
    /**
     * Enables events related to guild webhooks.
     */
    GuildWebhooks = 32,
    /**
     * Enables events related to guild invites.
     */
    GuildInvites = 64,
    /**
     * Enables events related to guild voice states.
     */
    GuildVoiceStates = 128,
    /**
     * Enables events related to guild presences.
     */
    GuildPresences = 256,
    /**
     * Enables events related to guild messages.
     */
    GuildMessages = 512,
    /**
     * Enables events related to guild message reactions.
     */
    GuildMessageReactions = 1024,
    /**
     * Enables events related to guild message typing.
     */
    GuildMessageTyping = 2048,
    /**
     * Enables events related to direct messages.
     */
    DirectMessages = 4096,
    /**
     * Enables events related to direct message reactions.
     */
    DirectMessagesReactions = 8192,
    /**
     * Enables events related to direct message typing.
     */
    DirectMessageTyping = 16384,
    /**
     * Enables access to message content.
     */
    MessageContent = 32768,
    /**
     * Enables events related to guild scheduled events.
     */
    GuildScheduledEvents = 65536,
    /**
     * Enables events related to auto-moderation configuration.
     */
    AutoModerationConfiguration = 1048576,
    /**
     * Enables events related to auto-moderation execution.
     */
    AutoModerationExecution = 2097152
}
