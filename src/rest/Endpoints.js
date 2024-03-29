"use strict";

module.exports.BASE_URL = "/api";
module.exports.CDN_URL = "https://cdn.discordapp.com";
module.exports.CLIENT_URL = "https://discord.com";

// APPLICATIONS

module.exports.Application = () => "/applications/@me"
module.exports.ApplicationRoleConnections = (appId) => `/applications/${appId}/role-connections/metadata`
module.exports.ApplicationCommands = (appId) => `/applications/${appId}/commands`
module.exports.ApplicationCommand = (appId, cmdId) => `/applications/${appId}/commands/${cmdId}`
module.exports.ApplicationCommands = (appId) => `/applications/${appId}/commands`
module.exports.ApplicationGuildCommands = (appId, guildId) => `/applications/${appId}/guilds/${guildId}/commands`
module.exports.ApplicationGuildCommand = (appId, guildId, cmdId) => `/applications/${appId}/guilds/${guildId}/commands/${cmdId}`
module.exports.ApplicationGuildCommandPermissions = (appId, guildId, cmdId) => `/applications/${appId}/guilds/${guildId}/commands/${cmdId}/permissions`
module.exports.ApplicationGuildCommands = (appId, guildId) => `/applications/${appId}/guilds/${guildId}/commands/permissions`

// INTERACTIONS (Receiving and Responding)

module.exports.Interaction = (intId, intToken) => `/interactions/${intId}/${intToken}/callback`
module.exports.InteractionOriginal = (appId, intToken) => `/webhooks/${appId}/${intToken}/messages/@original`
module.exports.InteractionCreateFollowUp = (appId, intToken) => `/webhooks/${appId}/${intToken}`
module.exports.InteractionFollowUp = (appId, intToken, msgId) => `/webhooks/${appId}/${intToken}/messages/${msgId}`

// GUILD AUDIT LOG
module.exports.GuildAuditLog = (guildId) => `/guilds/${guildId}/audit-logs`

// GUILD MODERATION
module.exports.GuildAutoModerationRules = (guildId) => `/guilds/${guildId}/auto-moderation/rules`
module.exports.GuildAutoModerationRule = (guildId, moderationId) => `/guilds/${guildId}/auto-moderation/rules/${moderationId}`

// CHANNEL
module.exports.Channel = (chId) => `/channels/${chId}`
module.exports.ChannelMessages = (chId) => `/channels/${chId}/messages`
module.exports.ChannelMessage = (chId, msgId) => `/channels/${chId}/messages/${msgId}`
module.exports.ChannelMessagesCrosspost = (chId, msgId) => `/channels/${chId}/messages/${msgId}/crosspost`
module.exports.ChannelMessageReactionUser = (chId, msgId, emoji , user) => `/channels/${chId}/messages/${msgId}/reactions/${emoji}/${user}`
module.exports.ChannelMessageReaction = (chId, msgId, emoji) => `/channels/${chId}/messages/${msgId}/reactions/${emoji}/`
module.exports.ChannelMessageReactions = (chId, msgId) => `/channels/${chId}/messages/${msgId}/reactions/`
module.exports.ChannelMessagesBulk = (chId) => `/channels/${chId}/messages/bulk-delete`
module.exports.ChannelMessagesBulk = (chId) => `/channels/${chId}/messages/bulk-delete`
module.exports.ChannelPermissions = (chId, overId) => `/channels/${chId}/permissions/${overId}`
module.exports.ChannelInvites = (chId) => `/channels/${chId}/invites`
module.exports.ChannelFollowers = (chId) => `/channels/${chId}/followers`
module.exports.ChannelTyping = (chId) => `/channels/${chId}/typing`
module.exports.ChannelPins = (chId) => `/channels/${chId}/pins`
module.exports.ChannelRecipents = (chId, userId) => `/channels/${chId}/recipents/${userId}`
module.exports.ChannelMessagesThread = (chId, msgId) => `/channels/${chId}/messages/${msgId}/threads`
module.exports.ChannelThreads = (chId) => `/channels/${chId}/threads`
module.exports.ChannelThreadMember = (chId, userId) => `/channels/${chId}/thread-members/${userId}`
module.exports.ChannelThreadMembers = (chId) => `/channels/${chId}/thread-members/`
module.exports.ChannelThreadsArchived = (chId, type) => `/channels/${chId}/threads/archived/${type}`
module.exports.ChannelThreadsArchivedPrivate = (chId) => `/channels/${chId}/users/@me/threads/archived/private`

// EMOJIS

module.exports.GuildEmojis = (guildId) => `/guilds/${guildId}/emojis`
module.exports.GuildEmoji = (guildId, emId) => `/guilds/${guildId}/emojis/${emId}`

// GUILDS

module.exports.Guilds = () => `/guilds`
module.exports.Guild = (guildId) => `/guilds/${guildId}`
module.exports.GuildPreview = (guildId) => `/guilds/${guildId}/preview`
module.exports.GuildChannels = (guildId) => `/guilds/${guildId}/channels`
module.exports.GuildThreadsActive = (guildId) => `/guilds/${guildId}/threads/active`
module.exports.GuildMember = (guildId, member) => `/guilds/${guildId}/members/${member}`
module.exports.GuildMembers = (guildId) => `/guilds/${guildId}/members`
module.exports.GuildMemberSearch = (guildId) => `/guilds/${guildId}/members/search`
module.exports.GuildMemberRole = (guildId, memId, rolId) => `/guilds/${guildId}/members/${memId}/roles/${rolId}`
module.exports.GuildBans = (guildId) => `/guilds/${guildId}/bans`
module.exports.GuildBan = (guildId, userId) => `/guilds/${guildId}/bans/${userId}`
module.exports.GuildRoles = (guildId) => `/guilds/${guildId}/roles`
module.exports.GuildRole = (guildId, rolId) => `/guilds/${guildId}/roles/${rolId}`
module.exports.GuildMFA = (guildId) => `/guilds/${guildId}/mfa`
module.exports.GuildPrune = (guildId) => `/guilds/${guildId}/prune`
module.exports.GuildVoiceRegions = (guildId) => `/guilds/${guildId}/regions`
module.exports.GuildInvites = (guildId) => `/guilds/${guildId}/invites`
module.exports.GuildIntegrations = (guildId) => `/guilds/${guildId}/integrations`
module.exports.GuildIntegration = (guildId, integrationId) => `/guilds/${guildId}/integrations/${integrationId}`
module.exports.GuildWidget = (guildId) => `/guilds/${guildId}/widget`
module.exports.GuildWidgetJSON = (guildId) => `/guilds/${guildId}/widget.json`
module.exports.GuildVanityURL = (guildId) => `/guilds/${guildId}/vanity-url`
module.exports.GuildWidgetImage = (guildId) => `/guilds/${guildId}/widget.png`
module.exports.GuildWelcomeScreen = (guildId) => `/guilds/${guildId}/welcome-screen`
module.exports.GuildOnboarding = (guildId) => `/guilds/${guildId}/onboarding`
module.exports.GuildVoiceStates = (guildId, userId) => `/guilds/${guildId}/voice-states/${userId}`

// GUILD SCHEDULED EVENT

module.exports.GuildScheduledEvents = (guildId) => `/guilds/${guildId}/scheduled-events`
module.exports.GuildScheduledEvent = (guildId, scheduledId) => `/guilds/${guildId}/scheduled-events/${scheduledId}`
module.exports.GuildScheduledEventUsers = (guildId, scheduledId) => `/guilds/${guildId}/scheduled-events/${scheduledId}/users`

// GUILD TEMPLATE

module.exports.GuildTemplate = (tempcode) => `/guilds/templates/${tempcode}`
module.exports.GuildTemplates = (guildId) => `/guilds/${guildId}/templates/`
module.exports.GuildTemplates = (guildId) => `/guilds/${guildId}/templates/`

// INVITE

module.exports.Invite = (invcode) => `/invites/${invcode}`

// STAGE INSTANCE

module.exports.StageInstances = () => `/stage-instances`
module.exports.StageInstance = (chId) => `/stage-instances/${chId}`

// STICKER

module.exports.Sticker = (stickerId) => `/stickers/${stickerId}`
module.exports.StickerPacks = () => `/sticker-packs`
module.exports.GuildStickers = (guildId) => `/guilds/${guildId}/stickers`
module.exports.GuildSticker = (guildId, stickerId) => `/guilds/${guildId}/stickers/${stickerId}`

// USER
module.exports.User = (userID) => `/users/${userID}`
module.exports.UserGuilds = () => `/users/@me/guilds`
module.exports.UserGuild = (guildId) => `/users/@me/guilds/${guildId}`
module.exports.UserGuildMember = (guildId) => `/users/@me/guilds/${guildId}/member`
module.exports.UserDM = () => `/users/@me/channels`
module.exports.UserConnnections = () => `/users/@me/connections`
module.exports.UserRoleConnections = (applicationId) => `/users/@me/applications/${applicationId}/role-connections`

// WEBHOOKS

module.exports.ChannelWebhooks = (chId) => `/channels/${chId}/webhooks`
module.exports.GuildWebhooks = (guildId) => `/guilds/${guildId}/webhooks`
module.exports.Webhook = (webhookId) => `/webhooks/${webhookId}`
module.exports.WebhookAndToken = (webhookId, webhookToken) => `/webhooks/${webhookId}/${webhookToken}`
module.exports.WebhookSlack = (webhookId, webhookToken) => `/webhooks/${webhookId}/${webhookToken}/slack`
module.exports.WebhookGithub = (webhookId, webhookToken) => `/webhooks/${webhookId}/${webhookToken}/github`
module.exports.WebhookMessage = (webhookId, webhookToken, msgId) => `/webhooks/${webhookId}/${webhookToken}/messages/${msgId}`