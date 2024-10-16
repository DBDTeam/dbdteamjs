export declare const BASE_URL: string;
export declare const CDN_URL: string;
export declare const CLIENT_URL: string;
export declare const Application: () => string;
export declare const ApplicationRoleConnections: (appId: string) => string;
export declare const ApplicationCommands: (appId: string) => string;
export declare const ApplicationCommand: (appId: string, cmdId: string) => string;
export declare const ApplicationGuildCommands: (appId: string, guildId: string) => string;
export declare const ApplicationGuildCommand: (appId: string, guildId: string, cmdId: string) => string;
export declare const ApplicationGuildCommandPermissions: (appId: string, guildId: string, cmdId: string) => string;
export declare const ApplicationGuildCommandsPermissions: (appId: string, guildId: string) => string;
export declare const Interaction: (intId: string, intToken: string) => string;
export declare const InteractionOriginal: (appId: string, intToken: string) => string;
export declare const InteractionCreateFollowUp: (appId: string, intToken: string) => string;
export declare const InteractionFollowUp: (appId: string, intToken: string, msgId: string) => string;
export declare const GuildAuditLog: (guildId: string) => string;
export declare const GuildAutoModerationRules: (guildId: string) => string;
export declare const GuildAutoModerationRule: (guildId: string, moderationId: string) => string;
export declare const Channel: (chId: string) => string;
export declare const ChannelMessages: (chId: string) => string;
export declare const ChannelMessage: (chId: string, msgId: string) => string;
export declare const ChannelMessagesCrosspost: (chId: string, msgId: string) => string;
export declare const ChannelMessageReactionUser: (chId: string, msgId: string, emoji: string, user: string) => string;
export declare const ChannelMessageReaction: (chId: string, msgId: string, emoji: string) => string;
export declare const ChannelMessageReactions: (chId: string, msgId: string) => string;
export declare const ChannelMessagesBulk: (chId: string) => string;
export declare const ChannelPermissions: (chId: string, overId: string) => string;
export declare const ChannelInvites: (chId: string) => string;
export declare const ChannelFollowers: (chId: string) => string;
export declare const ChannelTyping: (chId: string) => string;
export declare const ChannelPins: (chId: string) => string;
export declare const ChannelRecipents: (chId: string, userId: string) => string;
export declare const ChannelMessagesThread: (chId: string, msgId: string) => string;
export declare const ChannelThreads: (chId: string) => string;
export declare const ChannelThreadMember: (chId: string, userId: string) => string;
export declare const ChannelThreadMembers: (chId: string) => string;
export declare const ChannelThreadsArchived: (chId: string, type: string) => string;
export declare const ChannelThreadsArchivedPrivate: (chId: string) => string;
export declare const GuildEmojis: (guildId: string) => string;
export declare const GuildEmoji: (guildId: string, emId: string) => string;
export declare const Guilds: () => string;
export declare const Guild: (guildId: string) => string;
export declare const GuildPreview: (guildId: string) => string;
export declare const GuildChannels: (guildId: string) => string;
export declare const GuildThreadsActive: (guildId: string) => string;
export declare const GuildMember: (guildId: string, member: string) => string;
export declare const GuildMembers: (guildId: string) => string;
export declare const GuildMemberSearch: (guildId: string) => string;
export declare const GuildMemberRole: (guildId: string, memId: string, rolId: string) => string;
export declare const GuildBans: (guildId: string) => string;
export declare const GuildBan: (guildId: string, userId: string) => string;
export declare const GuildRoles: (guildId: string) => string;
export declare const GuildRole: (guildId: string, rolId: string) => string;
export declare const GuildMFA: (guildId: string) => string;
export declare const GuildPrune: (guildId: string) => string;
export declare const GuildVoiceRegions: (guildId: string) => string;
export declare const GuildInvites: (guildId: string) => string;
export declare const GuildIntegrations: (guildId: string) => string;
export declare const GuildIntegration: (guildId: string, integrationId: string) => string;
export declare const GuildWidget: (guildId: string) => string;
export declare const GuildWidgetJSON: (guildId: string) => string;
export declare const GuildVanityURL: (guildId: string) => string;
export declare const GuildWidgetImage: (guildId: string) => string;
export declare const GuildWelcomeScreen: (guildId: string) => string;
export declare const GuildOnboarding: (guildId: string) => string;
export declare const GuildVoiceStates: (guildId: string, userId: string) => string;
export declare const GuildScheduledEvents: (guildId: string) => string;
export declare const GuildScheduledEvent: (guildId: string, scheduledId: string) => string;
export declare const GuildScheduledEventUsers: (guildId: string, scheduledId: string) => string;
export declare const GuildTemplate: (tempcode: string) => string;
export declare const GuildTemplates: (guildId: string) => string;
export declare const Invite: (invcode: string) => string;
export declare const StageInstances: () => string;
export declare const StageInstance: (chId: string) => string;
export declare const Sticker: (stickerId: string) => string;
export declare const StickerPacks: () => string;
export declare const GuildStickers: (guildId: string) => string;
export declare const GuildSticker: (guildId: string, stickerId: string) => string;
export declare const User: (userID: string) => string;
export declare const UserGuilds: () => string;
export declare const UserGuild: (guildId: string) => string;
export declare const UserGuildMember: (guildId: string) => string;
export declare const UserDM: () => string;
export declare const UserConnnections: () => string;
export declare const UserRoleConnections: (applicationId: string) => string;
export declare const ChannelWebhooks: (chId: string) => string;
export declare const GuildWebhooks: (guildId: string) => string;
export declare const Webhook: (webhookId: string) => string;
export declare const WebhookAndToken: (webhookId: string, webhookToken: string) => string;
export declare const WebhookSlack: (webhookId: string, webhookToken: string) => string;
export declare const WebhookGithub: (webhookId: string, webhookToken: string) => string;
export declare const WebhookMessage: (webhookId: string, webhookToken: string, msgId: string) => string;
