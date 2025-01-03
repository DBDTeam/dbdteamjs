/**
 * Enum representing the different intents that can be used when initializing a Discord client.
 * Each intent is represented by a bitfield value.
 */
export enum Intents {
    /**
     * Enables events related to guilds.
     */
    Guilds = 1 << 0,
  
    /**
     * Enables events related to guild members.
     */
    GuildMembers = 1 << 1,
  
    /**
     * Enables events related to guild moderation.
     */
    GuildModeration = 1 << 2,
  
    /**
     * Enables events related to guild emojis and stickers.
     */
    GuildEmojisAndStickers = 1 << 3,
  
    /**
     * Enables events related to guild integrations.
     */
    GuildIntegrations = 1 << 4,
  
    /**
     * Enables events related to guild webhooks.
     */
    GuildWebhooks = 1 << 5,
  
    /**
     * Enables events related to guild invites.
     */
    GuildInvites = 1 << 6,
  
    /**
     * Enables events related to guild voice states.
     */
    GuildVoiceStates = 1 << 7,
  
    /**
     * Enables events related to guild presences.
     */
    GuildPresences = 1 << 8,
  
    /**
     * Enables events related to guild messages.
     */
    GuildMessages = 1 << 9,
  
    /**
     * Enables events related to guild message reactions.
     */
    GuildMessageReactions = 1 << 10,
  
    /**
     * Enables events related to guild message typing.
     */
    GuildMessageTyping = 1 << 11,
  
    /**
     * Enables events related to direct messages.
     */
    DirectMessages = 1 << 12,
  
    /**
     * Enables events related to direct message reactions.
     */
    DirectMessagesReactions = 1 << 13,
  
    /**
     * Enables events related to direct message typing.
     */
    DirectMessageTyping = 1 << 14,
  
    /**
     * Enables access to message content.
     */
    MessageContent = 1 << 15,
  
    /**
     * Enables events related to guild scheduled events.
     */
    GuildScheduledEvents = 1 << 16,
  
    /**
     * Enables events related to auto-moderation configuration.
     */
    AutoModerationConfiguration = 1 << 20,
  
    /**
     * Enables events related to auto-moderation execution.
     */
    AutoModerationExecution = 1 << 21,
  }