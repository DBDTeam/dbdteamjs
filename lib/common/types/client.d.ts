import { APIEmoji, PresenceUpdateStatus } from "discord-api-types/v10";
import { ClientUser } from "../../client/ClientUser";
import { Channel, GuildRole, Member, ThreadChannel } from "../../structures";
import { Guild } from "../../structures/Guild";
import { Message } from "../../structures/Message";
import { Shard } from "../../structures/Sharding";
import { User } from "../../structures/User";
import { GatewayActivityPayload, PresenceStatus } from "../../types/Presences";
import { SlashInteraction } from "../../structures/Interactions/SlashInteraction";
import { MessageInteraction } from "../../structures/Interactions/MessageInteraction";
import { ComponentInteraction } from "../../structures/Interactions/ComponentInteraction";
import { UserInteraction } from "../../structures/Interactions/UserInteraction";
import { Nullable, PresenceData } from "./utils";
import { Collection } from "../../utils/Collection";
import { ThreadMember } from "../../structures/ThreadMember";
/**
 * Represents the options for configuring a Discord client.
 */
export interface ClientOptions {
    /**
     * The Discord bot token used for authentication.
     */
    token: string;
    /**
     * A number representing the combined intents for the client.
     */
    intents: number;
    /**
     * Configuration options for the gateway connection.
     */
    gateway?: GatewayConfig;
    /**
     * Optional cache configuration settings.
     */
    cache?: CacheOptions;
}
/**
 * Represents the cache options for the client.
 */
export interface CacheOptions {
    /**
     * Whether to cache guild bans.
     */
    guild_bans?: boolean;
    /**
     * Whether to cache guild emojis.
     */
    guild_emojis?: boolean;
    /**
     * Whether to cache guild stickers.
     */
    guild_stickers?: boolean;
}
/**
 * Represents the gateway configuration options.
 */
export interface GatewayConfig {
    /**
     * Whether to use mobile platform for the gateway connection.
     */
    mobilePlatform?: boolean;
    /**
     * The total number of shards to use.
     */
    totalShards?: number;
}
/**
 * Represents the payload for updating the client's presence.
 */
export interface ClientPresencePayload {
    /**
     * An array of activities for the client.
     */
    activities?: GatewayActivityPayload[];
    /**
     * The status of the client.
     */
    status: PresenceStatus | PresenceUpdateStatus;
    /**
     * Whether the client is AFK.
     */
    afk?: boolean;
    /**
     * The timestamp since when the client has been idle.
     */
    since?: number;
}
/**
 * Represents the payload for editing the client user's profile.
 */
export interface EditClientUserPayload {
    /**
     * The new username for the client user.
     */
    username?: string;
    /**
     * The new avatar for the client user.
     */
    avatar?: string;
}
export declare enum EventNames {
    "Debug" = "debug",
    "MessageCreate" = "messageCreate",
    "InteractionCreate" = "interactionCreate",
    "ChannelCreate" = "channelCreate",
    "ChannelDelete" = "channelDelete",
    "ChannelUpdate" = "channelUpdate",
    "GuildBanAdd" = "guildBanAdd",
    "GuildBanRemove" = "guildBanRemove",
    "Ready" = "ready",
    "ThreadCreate" = "threadCreate",
    "ThreadUpdate" = "threadUpdate",
    "ThreadDelete" = "threadDelete",
    "ThreadListSync" = "threadListSync",
    "ThreadMemberUpdate" = "threadMemberUpdate",
    "GuildCreate" = "guildCreate",
    "GuildUnavailable" = "guildUnavailable",
    "GuildDelete" = "guildDelete",
    "GuildEmojiUpdate" = "guildEmojiUpdate",
    "GuildMemberAdd" = "guildMemberAdd",
    "GuildMemberChunk" = "guildMemberChunk",
    "GuildMemberLeave" = "guildMemberLeave",
    "GuildMemberUpdate" = "guildMemberUpdate",
    "GuildRoleCreate" = "guildRoleCreate",
    "GuildRoleDelete" = "guildRoleDelete",
    "GuildRoleUpdate" = "guildRoleUpdate",
    "GuildStickersUpdate" = "guildStickersUpdate",
    "GuildUpdate" = "guildUpdate",
    "MessageDelete" = "messageDelete",
    "MessageUpdate" = "messageUpdate",
    "PresenceUpdate" = "presenceUpdate",
    "VoiceServerUpdate" = "voiceServerUpdate",
    "VoiceStateUpdate" = "voiceStateUpdate"
}
export interface ClientEvents {
    shardConnect: (id: string) => unknown;
    shardDisconnect: (id: string) => unknown;
    shardError: (error: unknown) => unknown;
    debug: (...args: unknown[]) => unknown;
    error: (error: any) => unknown;
    ready: (user: ClientUser, shard: Shard) => unknown;
    messageCreate: (message: Message, shard: Shard) => unknown;
    messageDelete: (oldMessage: Message, shard: Shard) => unknown;
    messageUpdate: (oldMessage: Message, newMessage: Message, shard: Shard) => unknown;
    interactionCreate: (interaction: SlashInteraction | ComponentInteraction | UserInteraction | MessageInteraction, shard: Shard) => unknown;
    guildCreate: (guild: Guild, shard: Shard) => unknown;
    guildUpdate: (oldGuild: Guild, newGuild: Guild, shard: Shard) => unknown;
    guildBanRemove: (user: User, guild: Nullable<Guild>, shard: Shard) => unknown;
    guildBanAdd: (user: User, guild: Nullable<Guild>, shard: Shard) => unknown;
    guildUnavailable: (data: any, shard: Shard) => unknown;
    guildDelete: (oldGuild: Guild, shard: Shard) => unknown;
    guildEmojiUpdate: (emoji: APIEmoji[], guild: Guild, shard: Shard) => unknown;
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
    threadDelete: (oldThreadChannel: ThreadChannel, shard: Shard) => unknown;
    threadListSync: (guild: Guild, channels: Collection<string, ThreadChannel>, members: Collection<string, ThreadMember>, shard: Shard) => unknown;
    threadMemberUpdate: (threadChannel: ThreadChannel, threadMember: ThreadMember, shard: Shard) => unknown;
    presenceUpdate: (member: Member, oldPresence: Nullable<PresenceData>, newPresence: PresenceData, shard: Shard) => unknown;
}
