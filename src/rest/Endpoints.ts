"use strict";

export const BASE_URL: string = "/api";
export const CDN_URL: string = "https://cdn.discordapp.com";
export const CLIENT_URL: string = "https://discord.com";

// APPLICATIONS

export const Application = (): string => "/applications/@me";
export const ApplicationRoleConnections = (appId: string): string =>
  `/applications/${appId}/role-connections/metadata`;
export const ApplicationCommands = (appId: string): string =>
  `/applications/${appId}/commands`;
export const ApplicationCommand = (appId: string, cmdId: string): string =>
  `/applications/${appId}/commands/${cmdId}`;
export const ApplicationGuildCommands = (
  appId: string,
  guildId: string
): string => `/applications/${appId}/guilds/${guildId}/commands`;
export const ApplicationGuildCommand = (
  appId: string,
  guildId: string,
  cmdId: string
): string => `/applications/${appId}/guilds/${guildId}/commands/${cmdId}`;
export const ApplicationGuildCommandPermissions = (
  appId: string,
  guildId: string,
  cmdId: string
): string =>
  `/applications/${appId}/guilds/${guildId}/commands/${cmdId}/permissions`;
export const ApplicationGuildCommandsPermissions = (
  appId: string,
  guildId: string
): string => `/applications/${appId}/guilds/${guildId}/commands/permissions`;

// INTERACTIONS (Receiving and Responding)

export const Interaction = (intId: string, intToken: string): string =>
  `/interactions/${intId}/${intToken}/callback`;

export const InteractionOriginal = (appId: string, intToken: string): string =>
  `/webhooks/${appId}/${intToken}/messages/@original`;

export const InteractionCreateFollowUp = (
  appId: string,
  intToken: string
): string => `/webhooks/${appId}/${intToken}`;

export const InteractionFollowUp = (
  appId: string,
  intToken: string,
  msgId: string
): string => `/webhooks/${appId}/${intToken}/messages/${msgId}`;

// GUILD AUDIT LOG

export const GuildAuditLog = (guildId: string): string =>
  `/guilds/${guildId}/audit-logs`;

// GUILD MODERATION

export const GuildAutoModerationRules = (guildId: string): string =>
  `/guilds/${guildId}/auto-moderation/rules`;
export const GuildAutoModerationRule = (
  guildId: string,
  moderationId: string
): string => `/guilds/${guildId}/auto-moderation/rules/${moderationId}`;

// CHANNEL

export const Channel = (chId: string): string => `/channels/${chId}`;
export const ChannelMessages = (chId: string): string =>
  `/channels/${chId}/messages`;
export const ChannelMessage = (chId: string, msgId: string): string =>
  `/channels/${chId}/messages/${msgId}`;
export const ChannelMessagesCrosspost = (chId: string, msgId: string): string =>
  `/channels/${chId}/messages/${msgId}/crosspost`;
export const ChannelMessageReactionUser = (
  chId: string,
  msgId: string,
  emoji: string,
  user: string
): string => `/channels/${chId}/messages/${msgId}/reactions/${emoji}/${user}`;
export const ChannelMessageReaction = (
  chId: string,
  msgId: string,
  emoji: string
): string => `/channels/${chId}/messages/${msgId}/reactions/${emoji}/`;
export const ChannelMessageReactions = (chId: string, msgId: string): string =>
  `/channels/${chId}/messages/${msgId}/reactions/`;
export const ChannelMessagesBulk = (chId: string): string =>
  `/channels/${chId}/messages/bulk-delete`;
export const ChannelPermissions = (chId: string, overId: string): string =>
  `/channels/${chId}/permissions/${overId}`;
export const ChannelInvites = (chId: string): string =>
  `/channels/${chId}/invites`;
export const ChannelFollowers = (chId: string): string =>
  `/channels/${chId}/followers`;
export const ChannelTyping = (chId: string): string =>
  `/channels/${chId}/typing`;
export const ChannelPins = (chId: string): string => `/channels/${chId}/pins`;
export const ChannelRecipents = (chId: string, userId: string): string =>
  `/channels/${chId}/recipents/${userId}`;
export const ChannelMessagesThread = (chId: string, msgId: string): string =>
  `/channels/${chId}/messages/${msgId}/threads`;
export const ChannelThreads = (chId: string): string =>
  `/channels/${chId}/threads`;
export const ChannelThreadMember = (chId: string, userId: string): string =>
  `/channels/${chId}/thread-members/${userId}`;
export const ChannelThreadMembers = (chId: string): string =>
  `/channels/${chId}/thread-members/`;
export const ChannelThreadsArchived = (chId: string, type: string): string =>
  `/channels/${chId}/threads/archived/${type}`;
export const ChannelThreadsArchivedPrivate = (chId: string): string =>
  `/channels/${chId}/users/@me/threads/archived/private`;

// EMOJIS

export const GuildEmojis = (guildId: string): string =>
  `/guilds/${guildId}/emojis`;
export const GuildEmoji = (guildId: string, emId: string): string =>
  `/guilds/${guildId}/emojis/${emId}`;

// GUILDS

export const Guilds = (): string => `/guilds`;
export const Guild = (guildId: string): string => `/guilds/${guildId}`;
export const GuildPreview = (guildId: string): string =>
  `/guilds/${guildId}/preview`;
export const GuildChannels = (guildId: string): string =>
  `/guilds/${guildId}/channels`;
export const GuildThreadsActive = (guildId: string): string =>
  `/guilds/${guildId}/threads/active`;
export const GuildMember = (guildId: string, member: string): string =>
  `/guilds/${guildId}/members/${member}`;
export const GuildMembers = (guildId: string): string =>
  `/guilds/${guildId}/members`;
export const GuildMemberSearch = (guildId: string): string =>
  `/guilds/${guildId}/members/search`;
export const GuildMemberRole = (
  guildId: string,
  memId: string,
  rolId: string
): string => `/guilds/${guildId}/members/${memId}/roles/${rolId}`;
export const GuildBans = (guildId: string): string => `/guilds/${guildId}/bans`;
export const GuildBan = (guildId: string, userId: string): string =>
  `/guilds/${guildId}/bans/${userId}`;
export const GuildRoles = (guildId: string): string =>
  `/guilds/${guildId}/roles`;
export const GuildRole = (guildId: string, rolId: string): string =>
  `/guilds/${guildId}/roles/${rolId}`;
export const GuildMFA = (guildId: string): string => `/guilds/${guildId}/mfa`;
export const GuildPrune = (guildId: string): string =>
  `/guilds/${guildId}/prune`;
export const GuildVoiceRegions = (guildId: string): string =>
  `/guilds/${guildId}/regions`;
export const GuildInvites = (guildId: string): string =>
  `/guilds/${guildId}/invites`;
export const GuildIntegrations = (guildId: string): string =>
  `/guilds/${guildId}/integrations`;
export const GuildIntegration = (
  guildId: string,
  integrationId: string
): string => `/guilds/${guildId}/integrations/${integrationId}`;
export const GuildWidget = (guildId: string): string =>
  `/guilds/${guildId}/widget`;
export const GuildWidgetJSON = (guildId: string): string =>
  `/guilds/${guildId}/widget.json`;
export const GuildVanityURL = (guildId: string): string =>
  `/guilds/${guildId}/vanity-url`;
export const GuildWidgetImage = (guildId: string): string =>
  `/guilds/${guildId}/widget.png`;
export const GuildWelcomeScreen = (guildId: string): string =>
  `/guilds/${guildId}/welcome-screen`;
export const GuildOnboarding = (guildId: string): string =>
  `/guilds/${guildId}/onboarding`;
export const GuildVoiceStates = (guildId: string, userId: string): string =>
  `/guilds/${guildId}/voice-states/${userId}`;

// GUILD SCHEDULED EVENT

export const GuildScheduledEvents = (guildId: string): string =>
  `/guilds/${guildId}/scheduled-events`;
export const GuildScheduledEvent = (
  guildId: string,
  scheduledId: string
): string => `/guilds/${guildId}/scheduled-events/${scheduledId}`;
export const GuildScheduledEventUsers = (
  guildId: string,
  scheduledId: string
): string => `/guilds/${guildId}/scheduled-events/${scheduledId}/users`;

// GUILD TEMPLATE

export const GuildTemplate = (tempcode: string): string =>
  `/guilds/templates/${tempcode}`;
export const GuildTemplates = (guildId: string): string =>
  `/guilds/${guildId}/templates/`;

// INVITE

export const Invite = (invcode: string): string => `/invites/${invcode}`;

// STAGE INSTANCE

export const StageInstances = (): string => `/stage-instances`;
export const StageInstance = (chId: string): string =>
  `/stage-instances/${chId}`;

// STICKER

export const Sticker = (stickerId: string): string => `/stickers/${stickerId}`;
export const StickerPacks = (): string => `/sticker-packs`;
export const GuildStickers = (guildId: string): string =>
  `/guilds/${guildId}/stickers`;
export const GuildSticker = (guildId: string, stickerId: string): string =>
  `/guilds/${guildId}/stickers/${stickerId}`;

// USER
export const User = (userID: string): string => `/users/${userID}`;
export const UserGuilds = (): string => `/users/@me/guilds`;
export const UserGuild = (guildId: string): string =>
  `/users/@me/guilds/${guildId}`;
export const UserGuildMember = (guildId: string): string =>
  `/users/@me/guilds/${guildId}/member`;
export const UserDM = (): string => `/users/@me/channels`;
export const UserConnnections = (): string => `/users/@me/connections`;
export const UserRoleConnections = (applicationId: string): string =>
  `/users/@me/applications/${applicationId}/role-connections`;

// WEBHOOKS

export const ChannelWebhooks = (chId: string): string =>
  `/channels/${chId}/webhooks`;
export const GuildWebhooks = (guildId: string): string =>
  `/guilds/${guildId}/webhooks`;
export const Webhook = (webhookId: string): string => `/webhooks/${webhookId}`;
export const WebhookAndToken = (
  webhookId: string,
  webhookToken: string
): string => `/webhooks/${webhookId}/${webhookToken}`;
export const WebhookSlack = (webhookId: string, webhookToken: string): string =>
  `/webhooks/${webhookId}/${webhookToken}/slack`;
export const WebhookGithub = (
  webhookId: string,
  webhookToken: string
): string => `/webhooks/${webhookId}/${webhookToken}/github`;
export const WebhookMessage = (
  webhookId: string,
  webhookToken: string,
  msgId: string
): string => `/webhooks/${webhookId}/${webhookToken}/messages/${msgId}`;
