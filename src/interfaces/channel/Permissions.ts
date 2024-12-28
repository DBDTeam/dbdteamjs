import { GuildRole, Member, ThreadMember, User } from "../../structures";
import { ResponseFromApi } from "../rest/requestHandler";

export interface ChannelPermissionSuccessResponse extends ResponseFromApi {
  /**
   * The allowed perms of the response. (if any)
   */
  allow?: number;
  /**
   * The disallowed perms of the response. (if any)
   */
  deny?: number;
}

export interface TargetPayload {
  /**
   * The type of permission overwrite, 0 for GuildRoles, 1 for GuildMembers.
   */
  type?: "0" | "1";
  /**
   * The target id of the role or member.
   */
  target: Member | ThreadMember | User | GuildRole;
}

export interface ObjectOfThePerms {
  /**
   * The array of permissions bitwise to allow in the current channel.
   */
  allow?: PermissionsType[] | PermissionsType;
  /**
   * The array of permissions bitwise to disable in the current channel.
   */
  deny?: PermissionsType[] | PermissionsType;
}

export const PermissionsBits = {
  CREATE_INSTANT_INVITE: BigInt(1 << 0),
  KICK_MEMBERS: BigInt(1 << 1),
  BAN_MEMBERS: BigInt(1 << 2),
  ADMINISTRATOR: BigInt(1 << 3),
  MANAGE_CHANNELS: BigInt(1 << 4),
  MANAGE_GUILD: BigInt(1 << 5),
  ADD_REACTIONS: BigInt(1 << 6),
  VIEW_AUDIT_LOG: BigInt(1 << 7),
  PRIORITY_SPEAKER: BigInt(1 << 8),
  STREAM: BigInt(1 << 9),
  VIEW_CHANNEL: BigInt(1 << 10),
  SEND_MESSAGES: BigInt(1 << 11),
  SEND_TTS_MESSAGES: BigInt(1 << 12),
  MANAGE_MESSAGES: BigInt(1 << 13),
  EMBED_LINKS: BigInt(1 << 14),
  ATTACH_FILES: BigInt(1 << 15),
  READ_MESSAGE_HISTORY: BigInt(1 << 16),
  MENTION_EVERYONE: BigInt(1 << 17),
  USE_EXTERNAL_EMOJIS: BigInt(1 << 18),
  VIEW_GUILD_INSIGHTS: BigInt(1 << 19),
  CONNECT: BigInt(1 << 20),
  SPEAK: BigInt(1 << 21),
  MUTE_MEMBERS: BigInt(1 << 22),
  DEAFEN_MEMBERS: BigInt(1 << 23),
  MOVE_MEMBERS: BigInt(1 << 24),
  USE_VAD: BigInt(1 << 25),
  CHANGE_NICKNAME: BigInt(1 << 26),
  MANAGE_NICKNAMES: BigInt(1 << 27),
  MANAGE_ROLES: BigInt(1 << 28),
  MANAGE_WEBHOOKS: BigInt(1 << 29),
  MANAGE_GUILD_EXPRESSIONS: BigInt(1 << 30),
  USE_APPLICATION_COMMANDS: BigInt(1 << 31),
  REQUEST_TO_SPEAK: BigInt(1 << 32),
  MANAGE_EVENTS: BigInt(1 << 33),
  MANAGE_THREADS: BigInt(1 << 34),
  CREATE_PUBLIC_THREADS: BigInt(1 << 35),
  CREATE_PRIVATE_THREADS: BigInt(1 << 36),
  USE_EXTERNAL_STICKERS: BigInt(1 << 37),
  SEND_MESSAGES_IN_THREADS: BigInt(1 << 38),
  USE_EMBEDDED_ACTIVITIES: BigInt(1 << 39),
  MODERATE_MEMBERS: BigInt(1 << 40),
  VIEW_CREATOR_MONETIZATION_ANALYTICS: BigInt(1 << 41),
  USE_SOUNDBOARD: BigInt(1 << 42),
  CREATE_GUILD_EXPRESSIONS: BigInt(1 << 43),
  CREATE_EVENTS: BigInt(1 << 44),
  USE_EXTERNAL_SOUNDS: BigInt(1 << 45),
  SEND_VOICE_MESSAGES: BigInt(1 << 46),
  SEND_POLLS: BigInt(1 << 47),
  USE_EXTERNAL_APPS: BigInt(1 << 48),
} as const;

export const PermissionNames = {
  CreateInstantInvite: "CREATE_INSTANT_INVITE",
  KickMembers: "KICK_MEMBERS",
  BanMembers: "BAN_MEMBERS",
  Administrator: "ADMINISTRATOR",
  ManageChannels: "MANAGE_CHANNELS",
  ManageGuild: "MANAGE_GUILD",
  AddReactions: "ADD_REACTIONS",
  ViewAuditLog: "VIEW_AUDIT_LOG",
  PrioritySpeaker: "PRIORITY_SPEAKER",
  Stream: "STREAM",
  ViewChannel: "VIEW_CHANNEL",
  SendMessages: "SEND_MESSAGES",
  SendTTSMessages: "SEND_TTS_MESSAGES",
  ManageMessages: "MANAGE_MESSAGES",
  EmbedLinks: "EMBED_LINKS",
  AttachFiles: "ATTACH_FILES",
  ReadMessageHistory: "READ_MESSAGE_HISTORY",
  MentionEveryone: "MENTION_EVERYONE",
  UseExternalEmojis: "USE_EXTERNAL_EMOJIS",
  ViewGuildInsights: "VIEW_GUILD_INSIGHTS",
  Connect: "CONNECT",
  Speak: "SPEAK",
  MuteMembers: "MUTE_MEMBERS",
  DeafenMembers: "DEAFEN_MEMBERS",
  MoveMembers: "MOVE_MEMBERS",
  UseVAD: "USE_VAD",
  ChangeNickname: "CHANGE_NICKNAME",
  ManageNicknames: "MANAGE_NICKNAMES",
  ManageRoles: "MANAGE_ROLES",
  ManageWebhooks: "MANAGE_WEBHOOKS",
  ManageGuildExpressions: "MANAGE_GUILD_EXPRESSIONS",
  UseApplicationCommands: "USE_APPLICATION_COMMANDS",
  RequestToSpeak: "REQUEST_TO_SPEAK",
  ManageEvents: "MANAGE_EVENTS",
  ManageThreads: "MANAGE_THREADS",
  CreatePublicThreads: "CREATE_PUBLIC_THREADS",
  CreatePrivateThreads: "CREATE_PRIVATE_THREADS",
  UseExternalStickers: "USE_EXTERNAL_STICKERS",
  SendMessagesInThreads: "SEND_MESSAGES_IN_THREADS",
  UseEmbeddedActivities: "USE_EMBEDDED_ACTIVITIES",
  ModerateMembers: "MODERATE_MEMBERS",
  ViewCreatorMonetizationAnalytics: "VIEW_CREATOR_MONETIZATION_ANALYTICS",
  UseSoundboard: "USE_SOUNDBOARD",
  CreateGuildExpressions: "CREATE_GUILD_EXPRESSIONS",
  CreateEvents: "CREATE_EVENTS",
  UseExternalSounds: "USE_EXTERNAL_SOUNDS",
  SendVoiceMessages: "SEND_VOICE_MESSAGES",
  SendPolls: "SEND_POLLS",
  UseExternalApps: "USE_EXTERNAL_APPS",
} as const;

export type PermissionsType = keyof typeof PermissionsBits;

