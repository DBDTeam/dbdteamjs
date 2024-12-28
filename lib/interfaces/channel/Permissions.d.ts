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
export declare const PermissionsBits: {
    readonly CREATE_INSTANT_INVITE: bigint;
    readonly KICK_MEMBERS: bigint;
    readonly BAN_MEMBERS: bigint;
    readonly ADMINISTRATOR: bigint;
    readonly MANAGE_CHANNELS: bigint;
    readonly MANAGE_GUILD: bigint;
    readonly ADD_REACTIONS: bigint;
    readonly VIEW_AUDIT_LOG: bigint;
    readonly PRIORITY_SPEAKER: bigint;
    readonly STREAM: bigint;
    readonly VIEW_CHANNEL: bigint;
    readonly SEND_MESSAGES: bigint;
    readonly SEND_TTS_MESSAGES: bigint;
    readonly MANAGE_MESSAGES: bigint;
    readonly EMBED_LINKS: bigint;
    readonly ATTACH_FILES: bigint;
    readonly READ_MESSAGE_HISTORY: bigint;
    readonly MENTION_EVERYONE: bigint;
    readonly USE_EXTERNAL_EMOJIS: bigint;
    readonly VIEW_GUILD_INSIGHTS: bigint;
    readonly CONNECT: bigint;
    readonly SPEAK: bigint;
    readonly MUTE_MEMBERS: bigint;
    readonly DEAFEN_MEMBERS: bigint;
    readonly MOVE_MEMBERS: bigint;
    readonly USE_VAD: bigint;
    readonly CHANGE_NICKNAME: bigint;
    readonly MANAGE_NICKNAMES: bigint;
    readonly MANAGE_ROLES: bigint;
    readonly MANAGE_WEBHOOKS: bigint;
    readonly MANAGE_GUILD_EXPRESSIONS: bigint;
    readonly USE_APPLICATION_COMMANDS: bigint;
    readonly REQUEST_TO_SPEAK: bigint;
    readonly MANAGE_EVENTS: bigint;
    readonly MANAGE_THREADS: bigint;
    readonly CREATE_PUBLIC_THREADS: bigint;
    readonly CREATE_PRIVATE_THREADS: bigint;
    readonly USE_EXTERNAL_STICKERS: bigint;
    readonly SEND_MESSAGES_IN_THREADS: bigint;
    readonly USE_EMBEDDED_ACTIVITIES: bigint;
    readonly MODERATE_MEMBERS: bigint;
    readonly VIEW_CREATOR_MONETIZATION_ANALYTICS: bigint;
    readonly USE_SOUNDBOARD: bigint;
    readonly CREATE_GUILD_EXPRESSIONS: bigint;
    readonly CREATE_EVENTS: bigint;
    readonly USE_EXTERNAL_SOUNDS: bigint;
    readonly SEND_VOICE_MESSAGES: bigint;
    readonly SEND_POLLS: bigint;
    readonly USE_EXTERNAL_APPS: bigint;
};
export declare const PermissionNames: {
    readonly CreateInstantInvite: "CREATE_INSTANT_INVITE";
    readonly KickMembers: "KICK_MEMBERS";
    readonly BanMembers: "BAN_MEMBERS";
    readonly Administrator: "ADMINISTRATOR";
    readonly ManageChannels: "MANAGE_CHANNELS";
    readonly ManageGuild: "MANAGE_GUILD";
    readonly AddReactions: "ADD_REACTIONS";
    readonly ViewAuditLog: "VIEW_AUDIT_LOG";
    readonly PrioritySpeaker: "PRIORITY_SPEAKER";
    readonly Stream: "STREAM";
    readonly ViewChannel: "VIEW_CHANNEL";
    readonly SendMessages: "SEND_MESSAGES";
    readonly SendTTSMessages: "SEND_TTS_MESSAGES";
    readonly ManageMessages: "MANAGE_MESSAGES";
    readonly EmbedLinks: "EMBED_LINKS";
    readonly AttachFiles: "ATTACH_FILES";
    readonly ReadMessageHistory: "READ_MESSAGE_HISTORY";
    readonly MentionEveryone: "MENTION_EVERYONE";
    readonly UseExternalEmojis: "USE_EXTERNAL_EMOJIS";
    readonly ViewGuildInsights: "VIEW_GUILD_INSIGHTS";
    readonly Connect: "CONNECT";
    readonly Speak: "SPEAK";
    readonly MuteMembers: "MUTE_MEMBERS";
    readonly DeafenMembers: "DEAFEN_MEMBERS";
    readonly MoveMembers: "MOVE_MEMBERS";
    readonly UseVAD: "USE_VAD";
    readonly ChangeNickname: "CHANGE_NICKNAME";
    readonly ManageNicknames: "MANAGE_NICKNAMES";
    readonly ManageRoles: "MANAGE_ROLES";
    readonly ManageWebhooks: "MANAGE_WEBHOOKS";
    readonly ManageGuildExpressions: "MANAGE_GUILD_EXPRESSIONS";
    readonly UseApplicationCommands: "USE_APPLICATION_COMMANDS";
    readonly RequestToSpeak: "REQUEST_TO_SPEAK";
    readonly ManageEvents: "MANAGE_EVENTS";
    readonly ManageThreads: "MANAGE_THREADS";
    readonly CreatePublicThreads: "CREATE_PUBLIC_THREADS";
    readonly CreatePrivateThreads: "CREATE_PRIVATE_THREADS";
    readonly UseExternalStickers: "USE_EXTERNAL_STICKERS";
    readonly SendMessagesInThreads: "SEND_MESSAGES_IN_THREADS";
    readonly UseEmbeddedActivities: "USE_EMBEDDED_ACTIVITIES";
    readonly ModerateMembers: "MODERATE_MEMBERS";
    readonly ViewCreatorMonetizationAnalytics: "VIEW_CREATOR_MONETIZATION_ANALYTICS";
    readonly UseSoundboard: "USE_SOUNDBOARD";
    readonly CreateGuildExpressions: "CREATE_GUILD_EXPRESSIONS";
    readonly CreateEvents: "CREATE_EVENTS";
    readonly UseExternalSounds: "USE_EXTERNAL_SOUNDS";
    readonly SendVoiceMessages: "SEND_VOICE_MESSAGES";
    readonly SendPolls: "SEND_POLLS";
    readonly UseExternalApps: "USE_EXTERNAL_APPS";
};
export type PermissionsType = keyof typeof PermissionsBits;
