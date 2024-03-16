/**
 * Permissions for accessing different parts of the system.
 * @typedef {Object} DiscordIntents
 * @property {number} Guilds - Permissions related to guilds.
 * @property {number} GuildMembers - Permissions related to guild members.
 * @property {number} GuildModeration - Permissions related to guild moderation.
 * @property {number} GuildEmojisAndStickers - Permissions related to guild emojis and stickers.
 * @property {number} GuildIntegrations - Permissions related to guild integrations.
 * @property {number} GuildWebhooks - Permissions related to guild webhooks.
 * @property {number} GuildInvites - Permissions related to guild invites.
 * @property {number} GuildVoiceStates - Permissions related to guild voice states.
 * @property {number} GuildPresences - Permissions related to guild presences.
 * @property {number} GuildMessages - Permissions related to guild messages.
 * @property {number} GuildMessageReactions - Permissions related to guild message reactions.
 * @property {number} GuildMessageTyping - Permissions related to guild message typing.
 * @property {number} DirectMessages - Permissions related to direct messages.
 * @property {number} DirectMessagesReactions - Permissions related to direct message reactions.
 * @property {number} DirectMessageTyping - Permissions related to direct message typing.
 * @property {number} MessageContent - Permissions related to message content.
 * @property {number} GuildScheduledEvents - Permissions related to guild scheduled events.
 * @property {number} AutoModerationConfiguration - Permissions related to auto-moderation configuration.
 * @property {number} AutoModerationExecution - Permissions related to auto-moderation execution.
 */

/**
 * Definition of Discord intents.
 * @type {DiscordIntents}
 */
module.exports.DiscordIntents = {
    "Guilds": 1 << 0,
    "GuildMembers": 1 << 1,
    "GuildModeration": 1 << 2,
    "GuildEmojisAndStickers": 1 << 3,
    "GuildIntegrations": 1 << 4,
    "GuildWebhooks": 1 << 5,
    "GuildInvites": 1 << 6,
    "GuildVoiceStates": 1 << 7,
    "GuildPresences": 1 << 8,
    "GuildMessages": 1 << 9,
    "GuildMessageReactions": 1 << 10,
    "GuildMessageTyping": 1 << 11,
    "DirectMessages": 1 << 12,
    "DirectMessagesReactions": 1 << 13,
    "DirectMessageTyping": 1 << 14,
    "MessageContent": 1 << 15,
    "GuildScheduledEvents": 1 << 16,
    "AutoModerationConfiguration": 1 << 20,
    "AutoModerationExecution": 1 << 21,
};