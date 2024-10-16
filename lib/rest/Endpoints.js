"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildBans = exports.GuildMemberRole = exports.GuildMemberSearch = exports.GuildMembers = exports.GuildMember = exports.GuildThreadsActive = exports.GuildChannels = exports.GuildPreview = exports.Guild = exports.Guilds = exports.GuildEmoji = exports.GuildEmojis = exports.ChannelThreadsArchivedPrivate = exports.ChannelThreadsArchived = exports.ChannelThreadMembers = exports.ChannelThreadMember = exports.ChannelThreads = exports.ChannelMessagesThread = exports.ChannelRecipents = exports.ChannelPins = exports.ChannelTyping = exports.ChannelFollowers = exports.ChannelInvites = exports.ChannelPermissions = exports.ChannelMessagesBulk = exports.ChannelMessageReactions = exports.ChannelMessageReaction = exports.ChannelMessageReactionUser = exports.ChannelMessagesCrosspost = exports.ChannelMessage = exports.ChannelMessages = exports.Channel = exports.GuildAutoModerationRule = exports.GuildAutoModerationRules = exports.GuildAuditLog = exports.InteractionFollowUp = exports.InteractionCreateFollowUp = exports.InteractionOriginal = exports.Interaction = exports.ApplicationGuildCommandsPermissions = exports.ApplicationGuildCommandPermissions = exports.ApplicationGuildCommand = exports.ApplicationGuildCommands = exports.ApplicationCommand = exports.ApplicationCommands = exports.ApplicationRoleConnections = exports.Application = exports.CLIENT_URL = exports.CDN_URL = exports.BASE_URL = void 0;
exports.WebhookMessage = exports.WebhookGithub = exports.WebhookSlack = exports.WebhookAndToken = exports.Webhook = exports.GuildWebhooks = exports.ChannelWebhooks = exports.UserRoleConnections = exports.UserConnnections = exports.UserDM = exports.UserGuildMember = exports.UserGuild = exports.UserGuilds = exports.User = exports.GuildSticker = exports.GuildStickers = exports.StickerPacks = exports.Sticker = exports.StageInstance = exports.StageInstances = exports.Invite = exports.GuildTemplates = exports.GuildTemplate = exports.GuildScheduledEventUsers = exports.GuildScheduledEvent = exports.GuildScheduledEvents = exports.GuildVoiceStates = exports.GuildOnboarding = exports.GuildWelcomeScreen = exports.GuildWidgetImage = exports.GuildVanityURL = exports.GuildWidgetJSON = exports.GuildWidget = exports.GuildIntegration = exports.GuildIntegrations = exports.GuildInvites = exports.GuildVoiceRegions = exports.GuildPrune = exports.GuildMFA = exports.GuildRole = exports.GuildRoles = exports.GuildBan = void 0;
exports.BASE_URL = "/api";
exports.CDN_URL = "https://cdn.discordapp.com";
exports.CLIENT_URL = "https://discord.com";
// APPLICATIONS
const Application = () => "/applications/@me";
exports.Application = Application;
const ApplicationRoleConnections = (appId) => `/applications/${appId}/role-connections/metadata`;
exports.ApplicationRoleConnections = ApplicationRoleConnections;
const ApplicationCommands = (appId) => `/applications/${appId}/commands`;
exports.ApplicationCommands = ApplicationCommands;
const ApplicationCommand = (appId, cmdId) => `/applications/${appId}/commands/${cmdId}`;
exports.ApplicationCommand = ApplicationCommand;
const ApplicationGuildCommands = (appId, guildId) => `/applications/${appId}/guilds/${guildId}/commands`;
exports.ApplicationGuildCommands = ApplicationGuildCommands;
const ApplicationGuildCommand = (appId, guildId, cmdId) => `/applications/${appId}/guilds/${guildId}/commands/${cmdId}`;
exports.ApplicationGuildCommand = ApplicationGuildCommand;
const ApplicationGuildCommandPermissions = (appId, guildId, cmdId) => `/applications/${appId}/guilds/${guildId}/commands/${cmdId}/permissions`;
exports.ApplicationGuildCommandPermissions = ApplicationGuildCommandPermissions;
const ApplicationGuildCommandsPermissions = (appId, guildId) => `/applications/${appId}/guilds/${guildId}/commands/permissions`;
exports.ApplicationGuildCommandsPermissions = ApplicationGuildCommandsPermissions;
// INTERACTIONS (Receiving and Responding)
const Interaction = (intId, intToken) => `/interactions/${intId}/${intToken}/callback`;
exports.Interaction = Interaction;
const InteractionOriginal = (appId, intToken) => `/webhooks/${appId}/${intToken}/messages/@original`;
exports.InteractionOriginal = InteractionOriginal;
const InteractionCreateFollowUp = (appId, intToken) => `/webhooks/${appId}/${intToken}`;
exports.InteractionCreateFollowUp = InteractionCreateFollowUp;
const InteractionFollowUp = (appId, intToken, msgId) => `/webhooks/${appId}/${intToken}/messages/${msgId}`;
exports.InteractionFollowUp = InteractionFollowUp;
// GUILD AUDIT LOG
const GuildAuditLog = (guildId) => `/guilds/${guildId}/audit-logs`;
exports.GuildAuditLog = GuildAuditLog;
// GUILD MODERATION
const GuildAutoModerationRules = (guildId) => `/guilds/${guildId}/auto-moderation/rules`;
exports.GuildAutoModerationRules = GuildAutoModerationRules;
const GuildAutoModerationRule = (guildId, moderationId) => `/guilds/${guildId}/auto-moderation/rules/${moderationId}`;
exports.GuildAutoModerationRule = GuildAutoModerationRule;
// CHANNEL
const Channel = (chId) => `/channels/${chId}`;
exports.Channel = Channel;
const ChannelMessages = (chId) => `/channels/${chId}/messages`;
exports.ChannelMessages = ChannelMessages;
const ChannelMessage = (chId, msgId) => `/channels/${chId}/messages/${msgId}`;
exports.ChannelMessage = ChannelMessage;
const ChannelMessagesCrosspost = (chId, msgId) => `/channels/${chId}/messages/${msgId}/crosspost`;
exports.ChannelMessagesCrosspost = ChannelMessagesCrosspost;
const ChannelMessageReactionUser = (chId, msgId, emoji, user) => `/channels/${chId}/messages/${msgId}/reactions/${emoji}/${user}`;
exports.ChannelMessageReactionUser = ChannelMessageReactionUser;
const ChannelMessageReaction = (chId, msgId, emoji) => `/channels/${chId}/messages/${msgId}/reactions/${emoji}/`;
exports.ChannelMessageReaction = ChannelMessageReaction;
const ChannelMessageReactions = (chId, msgId) => `/channels/${chId}/messages/${msgId}/reactions/`;
exports.ChannelMessageReactions = ChannelMessageReactions;
const ChannelMessagesBulk = (chId) => `/channels/${chId}/messages/bulk-delete`;
exports.ChannelMessagesBulk = ChannelMessagesBulk;
const ChannelPermissions = (chId, overId) => `/channels/${chId}/permissions/${overId}`;
exports.ChannelPermissions = ChannelPermissions;
const ChannelInvites = (chId) => `/channels/${chId}/invites`;
exports.ChannelInvites = ChannelInvites;
const ChannelFollowers = (chId) => `/channels/${chId}/followers`;
exports.ChannelFollowers = ChannelFollowers;
const ChannelTyping = (chId) => `/channels/${chId}/typing`;
exports.ChannelTyping = ChannelTyping;
const ChannelPins = (chId) => `/channels/${chId}/pins`;
exports.ChannelPins = ChannelPins;
const ChannelRecipents = (chId, userId) => `/channels/${chId}/recipents/${userId}`;
exports.ChannelRecipents = ChannelRecipents;
const ChannelMessagesThread = (chId, msgId) => `/channels/${chId}/messages/${msgId}/threads`;
exports.ChannelMessagesThread = ChannelMessagesThread;
const ChannelThreads = (chId) => `/channels/${chId}/threads`;
exports.ChannelThreads = ChannelThreads;
const ChannelThreadMember = (chId, userId) => `/channels/${chId}/thread-members/${userId}`;
exports.ChannelThreadMember = ChannelThreadMember;
const ChannelThreadMembers = (chId) => `/channels/${chId}/thread-members/`;
exports.ChannelThreadMembers = ChannelThreadMembers;
const ChannelThreadsArchived = (chId, type) => `/channels/${chId}/threads/archived/${type}`;
exports.ChannelThreadsArchived = ChannelThreadsArchived;
const ChannelThreadsArchivedPrivate = (chId) => `/channels/${chId}/users/@me/threads/archived/private`;
exports.ChannelThreadsArchivedPrivate = ChannelThreadsArchivedPrivate;
// EMOJIS
const GuildEmojis = (guildId) => `/guilds/${guildId}/emojis`;
exports.GuildEmojis = GuildEmojis;
const GuildEmoji = (guildId, emId) => `/guilds/${guildId}/emojis/${emId}`;
exports.GuildEmoji = GuildEmoji;
// GUILDS
const Guilds = () => `/guilds`;
exports.Guilds = Guilds;
const Guild = (guildId) => `/guilds/${guildId}`;
exports.Guild = Guild;
const GuildPreview = (guildId) => `/guilds/${guildId}/preview`;
exports.GuildPreview = GuildPreview;
const GuildChannels = (guildId) => `/guilds/${guildId}/channels`;
exports.GuildChannels = GuildChannels;
const GuildThreadsActive = (guildId) => `/guilds/${guildId}/threads/active`;
exports.GuildThreadsActive = GuildThreadsActive;
const GuildMember = (guildId, member) => `/guilds/${guildId}/members/${member}`;
exports.GuildMember = GuildMember;
const GuildMembers = (guildId) => `/guilds/${guildId}/members`;
exports.GuildMembers = GuildMembers;
const GuildMemberSearch = (guildId) => `/guilds/${guildId}/members/search`;
exports.GuildMemberSearch = GuildMemberSearch;
const GuildMemberRole = (guildId, memId, rolId) => `/guilds/${guildId}/members/${memId}/roles/${rolId}`;
exports.GuildMemberRole = GuildMemberRole;
const GuildBans = (guildId) => `/guilds/${guildId}/bans`;
exports.GuildBans = GuildBans;
const GuildBan = (guildId, userId) => `/guilds/${guildId}/bans/${userId}`;
exports.GuildBan = GuildBan;
const GuildRoles = (guildId) => `/guilds/${guildId}/roles`;
exports.GuildRoles = GuildRoles;
const GuildRole = (guildId, rolId) => `/guilds/${guildId}/roles/${rolId}`;
exports.GuildRole = GuildRole;
const GuildMFA = (guildId) => `/guilds/${guildId}/mfa`;
exports.GuildMFA = GuildMFA;
const GuildPrune = (guildId) => `/guilds/${guildId}/prune`;
exports.GuildPrune = GuildPrune;
const GuildVoiceRegions = (guildId) => `/guilds/${guildId}/regions`;
exports.GuildVoiceRegions = GuildVoiceRegions;
const GuildInvites = (guildId) => `/guilds/${guildId}/invites`;
exports.GuildInvites = GuildInvites;
const GuildIntegrations = (guildId) => `/guilds/${guildId}/integrations`;
exports.GuildIntegrations = GuildIntegrations;
const GuildIntegration = (guildId, integrationId) => `/guilds/${guildId}/integrations/${integrationId}`;
exports.GuildIntegration = GuildIntegration;
const GuildWidget = (guildId) => `/guilds/${guildId}/widget`;
exports.GuildWidget = GuildWidget;
const GuildWidgetJSON = (guildId) => `/guilds/${guildId}/widget.json`;
exports.GuildWidgetJSON = GuildWidgetJSON;
const GuildVanityURL = (guildId) => `/guilds/${guildId}/vanity-url`;
exports.GuildVanityURL = GuildVanityURL;
const GuildWidgetImage = (guildId) => `/guilds/${guildId}/widget.png`;
exports.GuildWidgetImage = GuildWidgetImage;
const GuildWelcomeScreen = (guildId) => `/guilds/${guildId}/welcome-screen`;
exports.GuildWelcomeScreen = GuildWelcomeScreen;
const GuildOnboarding = (guildId) => `/guilds/${guildId}/onboarding`;
exports.GuildOnboarding = GuildOnboarding;
const GuildVoiceStates = (guildId, userId) => `/guilds/${guildId}/voice-states/${userId}`;
exports.GuildVoiceStates = GuildVoiceStates;
// GUILD SCHEDULED EVENT
const GuildScheduledEvents = (guildId) => `/guilds/${guildId}/scheduled-events`;
exports.GuildScheduledEvents = GuildScheduledEvents;
const GuildScheduledEvent = (guildId, scheduledId) => `/guilds/${guildId}/scheduled-events/${scheduledId}`;
exports.GuildScheduledEvent = GuildScheduledEvent;
const GuildScheduledEventUsers = (guildId, scheduledId) => `/guilds/${guildId}/scheduled-events/${scheduledId}/users`;
exports.GuildScheduledEventUsers = GuildScheduledEventUsers;
// GUILD TEMPLATE
const GuildTemplate = (tempcode) => `/guilds/templates/${tempcode}`;
exports.GuildTemplate = GuildTemplate;
const GuildTemplates = (guildId) => `/guilds/${guildId}/templates/`;
exports.GuildTemplates = GuildTemplates;
// INVITE
const Invite = (invcode) => `/invites/${invcode}`;
exports.Invite = Invite;
// STAGE INSTANCE
const StageInstances = () => `/stage-instances`;
exports.StageInstances = StageInstances;
const StageInstance = (chId) => `/stage-instances/${chId}`;
exports.StageInstance = StageInstance;
// STICKER
const Sticker = (stickerId) => `/stickers/${stickerId}`;
exports.Sticker = Sticker;
const StickerPacks = () => `/sticker-packs`;
exports.StickerPacks = StickerPacks;
const GuildStickers = (guildId) => `/guilds/${guildId}/stickers`;
exports.GuildStickers = GuildStickers;
const GuildSticker = (guildId, stickerId) => `/guilds/${guildId}/stickers/${stickerId}`;
exports.GuildSticker = GuildSticker;
// USER
const User = (userID) => `/users/${userID}`;
exports.User = User;
const UserGuilds = () => `/users/@me/guilds`;
exports.UserGuilds = UserGuilds;
const UserGuild = (guildId) => `/users/@me/guilds/${guildId}`;
exports.UserGuild = UserGuild;
const UserGuildMember = (guildId) => `/users/@me/guilds/${guildId}/member`;
exports.UserGuildMember = UserGuildMember;
const UserDM = () => `/users/@me/channels`;
exports.UserDM = UserDM;
const UserConnnections = () => `/users/@me/connections`;
exports.UserConnnections = UserConnnections;
const UserRoleConnections = (applicationId) => `/users/@me/applications/${applicationId}/role-connections`;
exports.UserRoleConnections = UserRoleConnections;
// WEBHOOKS
const ChannelWebhooks = (chId) => `/channels/${chId}/webhooks`;
exports.ChannelWebhooks = ChannelWebhooks;
const GuildWebhooks = (guildId) => `/guilds/${guildId}/webhooks`;
exports.GuildWebhooks = GuildWebhooks;
const Webhook = (webhookId) => `/webhooks/${webhookId}`;
exports.Webhook = Webhook;
const WebhookAndToken = (webhookId, webhookToken) => `/webhooks/${webhookId}/${webhookToken}`;
exports.WebhookAndToken = WebhookAndToken;
const WebhookSlack = (webhookId, webhookToken) => `/webhooks/${webhookId}/${webhookToken}/slack`;
exports.WebhookSlack = WebhookSlack;
const WebhookGithub = (webhookId, webhookToken) => `/webhooks/${webhookId}/${webhookToken}/github`;
exports.WebhookGithub = WebhookGithub;
const WebhookMessage = (webhookId, webhookToken, msgId) => `/webhooks/${webhookId}/${webhookToken}/messages/${msgId}`;
exports.WebhookMessage = WebhookMessage;
