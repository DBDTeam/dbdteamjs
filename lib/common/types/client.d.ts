import { PresenceUpdateStatus } from "discord-api-types/v10";
import { Nullable } from "../../../lib/interfaces/other";
import { ClientUser } from "../../client/ClientUser";
import { Channel, GuildRole, Member, ThreadChannel } from "../../structures";
import { Guild } from "../../structures/Guild";
import { InteractionBase } from "../../structures/Interactions/BaseInteraction";
import { Message } from "../../structures/Message";
import { Shard } from "../../structures/Sharding";
import { User } from "../../structures/User";
import { GatewayActivityPayload, PresenceStatus } from "../../types/Presences";
export interface ClientOptions {
    token: string;
    intents: number;
    gateway: any;
}
export interface GatewayConfig {
    url: string;
    mobilePlatform: boolean;
    totalShards: number | undefined;
    agent: string;
}
export interface ClientPresencePayload {
    activities: Array<GatewayActivityPayload>;
    status: PresenceStatus | PresenceUpdateStatus;
    afk?: boolean;
    since?: number;
}
export interface EditClientUserPayload {
    username?: string;
    avatar?: string;
}
export declare enum EventNames {
    "MessageCreate" = "messageCreate",
    "InteractionCreate" = "interactionCreate",
    "ChannelCreate" = "channelCreate",
    "ChannelDelete" = "channelDelete",
    "GuildBanAdd" = "guildBanAdd",
    "GuildBanRemove" = "guildBanRemove",
    "Ready" = "ready",
    "ThreadCreate" = "threadCreate",
    "ThreadUpdate" = "threadUpdate",
    "GuildCreate" = "guildCreate",
    "GuildUnavailable" = "guildUnavailable",
    "GuildDelete" = "guildDelete",
    "GuildEmojiUpdate" = "guildEmojiUpdate",
    "GuildMemberAdd" = "guildMemberAdd",
    "GuildMemberChunk" = "guildMemberChunk",
    "GuildMemberLeave" = "guildMemberLeave",
    "GuildMemberUpdate" = "guildMemberUpdate",// Acá vas completando, únicamente los que tienen extensión .js de los events
    "GuildRoleCreate" = "guildRoleCreate",
    "GuildRoleDelete" = "guildRoleDelete",
    "GuildRoleUpdate" = "guildRoleUpdate",
    "GuildStickersUpdate" = "guildStickersUpdate",
    "GuildUpdate" = "guildUpdate",
    "MessageDelete" = "messageDelete",
    "MessageUpdate" = "messageUpdate",
    "PresenceUpdate" = "presenceUpdate",
    "VoiceServerUpdate" = "voiceServerUpdate",// "voiceServerUpdate" es el 2do string de la igualdad
    "VoiceStateUpdate" = "voiceStateUpdate"
}
export interface ClientEvents {
    shardConnect: (id: string) => unknown;
    shardDisconnect: (id: string) => unknown;
    shardError: (error: unknown) => unknown;
    debug: (...args: unknown[]) => unknown;
    error: (error: unknown) => unknown;
    ready: (user: ClientUser, shard: Shard) => unknown;
    messageCreate: (message: Message, shard: Shard) => unknown;
    interactionCreate: (interaction: InteractionBase, shard: Shard) => unknown;
    guildCreate: (guild: Guild, shard: Shard) => unknown;
    guildBanRemove: (user: User, guild: Nullable<Guild>, shard: Shard) => unknown;
    guildBanAdd: (user: User, guild: Nullable<Guild>, shard: Shard) => unknown;
    guildUnavailable: (data: any, shard: Shard) => unknown;
    guildDelete: (oldGuild: Guild, shard: Shard) => unknown;
    guildEmojiUpdate: (guild: Guild, shard: Shard) => unknown;
    guildMemberAdd: (member: Member, shard: Shard) => unknown;
    guildMemberChunk: (guild: Guild, members: Member[], chunkData: Record<string, number>, shard: Shard) => unknown;
    guildMemberLeave: (member: Member, shard: Shard) => unknown;
    guildMemberUpdate: (oldMember: Member, newMember: Member, shard: Shard) => unknown;
    guildRoleCreate: (role: GuildRole, shard: Shard) => unknown;
    guildRoleDelete: (oldRole: GuildRole, shard: Shard) => unknown;
    guildRoleUpdate: (newRole: GuildRole, oldRole: GuildRole, shard: Shard) => unknown;
    guildStickersUpdate: (guild: Guild, shard: Shard) => unknown;
    channelCreate: (channel: Channel, id: string, shard: Shard) => unknown;
    channelDelete: (oldChannel: Channel, id: string, shard: Shard) => unknown;
    channelUpdate: (oldChannel: unknown, newChannel: unknown, shard: Shard) => unknown;
    threadCreate: (threadChannel: ThreadChannel, shard: Shard) => unknown;
    threadUpdate: (oldThread: ThreadChannel, newThread: ThreadChannel, shard: Shard) => unknown;
}
export declare enum Intents {
    Guilds = 1,
    GuildMembers = 2,
    GuildModeration = 4,
    GuildEmojisAndStickers = 8,
    GuildIntegrations = 16,
    GuildWebhooks = 32,
    GuildInvites = 64,
    GuildVoiceStates = 128,
    GuildPresences = 256,
    GuildMessages = 512,
    GuildMessageReactions = 1024,
    GuildMessageTyping = 2048,
    DirectMessages = 4096,
    DirectMessagesReactions = 8192,
    DirectMessageTyping = 16384,
    MessageContent = 32768,
    GuildScheduledEvents = 65536,
    AutoModerationConfiguration = 1048576,
    AutoModerationExecution = 2097152
}
