import {
  APIEmoji,
  GatewayReceivePayload,
  PresenceUpdateStatus,
} from "discord-api-types/v10";
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
  shards?: number;
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

export enum EventNames {
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
  "VoiceStateUpdate" = "voiceStateUpdate",
  "RawEvent" = "rawEvent",
}
/**
 * Interface defining the client's event handlers.
 */
export interface ClientEvents {
  /**
   * Fired when a shard connects to the gateway.
   * @param {string} id - The ID of the shard.
   */
  shardConnect: (id: number) => unknown;
  /**
   * Fired when a shard disconnects from the gateway.
   * @param {string} id - The ID of the shard.
   */
  shardDisconnect: (id: number) => unknown;
  /**
   * Fired when an error occurs within a shard.
   * @param {unknown} error - The error
   */
  shardError: (error: unknown) => unknown;

  /**
   * Fired when the client's debug mode is enabled
   * @param args - Additional arguments passed to the debug function.
   */
  debug: (...args: unknown[]) => unknown;
  /**
   * Fired when an error occurs within the client.
   * @param error - The error that occurred.
   */
  error: (error: any) => unknown;

  /**
   * Fired when the client is ready and has logged in.
   * @param { ClientUser } user - The client user
   * @param {Shard} shard -  The shard that the client is connected
   */
  ready: (user: ClientUser, shard: Shard) => unknown;

  /**
   * Fired when a message was created.
   * @param {Message} message - The message that was created.
   * @param {Shard} shard - The shard where the message was created.
   */
  messageCreate: (message: Message, shard: Shard) => unknown;
  /**
   * Fired when a message was deleted.
   * @param {Message} oldMessage - The old message that was in cache.
   * @param {Shard} shard - The shard where the message was deleted.
   */
  messageDelete: (oldMessage: Message, shard: Shard) => unknown;
  /**
   *
   * @param {Message} newMessage - The message that was updated.
   * @param {Message} oldMessage - The old message that was in cache.
   * @param {Shard} shard - The shard where the message was updated.
   */
  messageUpdate: (
    oldMessage: Message,
    newMessage: Message,
    shard: Shard
  ) => unknown;
  /**
   * Fired when an interaction was created.
   * @param {SlashInteraction | ComponentInteraction | UserInteraction | MessageInteraction} interaction - The interaction.
   * @param shard - The shard where the interaction was created.
   */
  interactionCreate: (
    interaction:
      | SlashInteraction
      | ComponentInteraction
      | UserInteraction
      | MessageInteraction,
    shard: Shard
  ) => unknown;

  /**
   * Fired when a new guild is created.
   * @param {Guild} guild - The new guild.
   * @param {Shard} shard - The shard where the guild was created.
   */
  guildCreate: (guild: Guild, shard: Shard) => unknown;

  /**
   * Fired when a guild is updated.
   * @param {Guild} oldGuild - The old guild data.
   * @param {Guild} newGuild - The new guild data.
   * @param {Shard} shard - The shard where the guild was updated.
   */
  guildUpdate: (oldGuild: Guild, newGuild: Guild, shard: Shard) => unknown;

  /**
   * Fired when a user is removed from a guild's ban list.
   * @param {User} user - The user who was removed from the ban list.
   * @param {Nullable<Guild>} guild - The guild where the ban was removed.
   * @param {Shard} shard - The shard where the ban was removed.
   */
  guildBanRemove: (user: User, guild: Nullable<Guild>, shard: Shard) => unknown;

  /**
   * Fired when a user is added to a guild's ban list.
   * @param {User} user - The user who was added to the ban list.
   * @param {Nullable<Guild>} guild - The guild where the ban was added.
   * @param {Shard} shard - The shard where the ban was added.
   */
  guildBanAdd: (user: User, guild: Nullable<Guild>, shard: Shard) => unknown;

  /**
   * Fired when a guild becomes unavailable.
   * @param {any} data - The data related to the unavailable guild.
   * @param {Shard} shard - The shard where the guild became unavailable.
   */
  guildUnavailable: (data: any, shard: Shard) => unknown;

  /**
   * Fired when a guild is deleted.
   * @param {Guild} oldGuild - The old guild data.
   * @param {Shard} shard - The shard where the guild was deleted.
   */
  guildDelete: (oldGuild: Guild, shard: Shard) => unknown;

  /**
   * Fired when a guild's emojis are updated.
   * @param {APIEmoji[]} emoji - The new emojis for the guild.
   * @param {Guild} guild - The guild where the emojis were updated.
   * @param {Shard} shard - The shard where the emojis were updated.
   */
  guildEmojiUpdate: (emoji: APIEmoji[], guild: Guild, shard: Shard) => unknown;

  /**
   * Fired when a member joins to a guild.
   * @param {Member} member - The member that has joined to the guild.
   * @param {Shard} shard - The shard id
   * @returns
   */
  guildMemberAdd: (member: Member, shard: Shard) => unknown;

  /**
   * Fired when a chunk of members is received for a guild.
   * @param {Guild} guild - The guild where the chunk of members was received.
   * @param {Member[]} members - The members in the chunk.
   * @param {Record<string, number>} chunkData - The chunk data.
   * @param {Shard} shard - The shard where the chunk of members was received.
   */
  guildMemberChunk: (
    guild: Guild,
    members: Member[],
    chunkData: Record<string, number>,
    shard: Shard
  ) => unknown;

  /**
   * Fired when a member leaves a guild.
   * @param {Member} member - The member who left the guild.
   * @param {Shard} shard - The shard where the member left the guild.
   */
  guildMemberLeave: (member: Member, shard: Shard) => unknown;

  /**
   * Fired when a member is updated in a guild.
   * @param {Member} oldMember - The old member data.
   * @param {Member} newMember - The new member data.
   * @param {Shard} shard - The shard where the member was updated.
   */
  guildMemberUpdate: (
    oldMember: Member,
    newMember: Member,
    shard: Shard
  ) => unknown;

  /**
   * Fired when a new guild role is created.
   * @param {GuildRole} role - The new guild role.
   * @param {Shard} shard - The shard where the guild role was created.
   */
  guildRoleCreate: (role: GuildRole, shard: Shard) => unknown;

  /**
   * Fired when a guild role is deleted.
   * @param {GuildRole} oldRole - The old guild role data.
   * @param {Shard} shard - The shard where the guild role was deleted.
   */
  guildRoleDelete: (oldRole: GuildRole, shard: Shard) => unknown;

  /**
   * Fired when a guild role is updated.
   * @param {GuildRole} newRole - The new guild role data.
   * @param {GuildRole} oldRole - The old guild role data.
   * @param {Shard} shard - The shard where the guild role was updated.
   */
  guildRoleUpdate: (
    newRole: GuildRole,
    oldRole: GuildRole,
    shard: Shard
  ) => unknown;

  /**
   * Fired when a guild's stickers are updated.
   * @param {Guild} guild - The guild where the stickers were updated.
   * @param {Shard} shard - The shard where the stickers were updated.
   */
  guildStickersUpdate: (guild: Guild, shard: Shard) => unknown;

  /**
   * Fired when a new channel is created.
   * @param {Channel} channel - The new channel.
   * @param {string} id - The ID of the new channel.
   * @param {Shard} shard - The shard where the channel was created.
   */
  channelCreate: (channel: Channel, id: string, shard: Shard) => unknown;

  /**
   * Fired when a channel is deleted.
   * @param {Channel} oldChannel - The old channel.
   * @param {string} id - The ID of the old channel.
   * @param {Shard} shard - The shard where the channel was deleted.
   */
  channelDelete: (oldChannel: Channel, id: string, shard: Shard) => unknown;

  /**
   * Fired when a channel is updated.
   * @param {unknown} oldChannel - The old channel data.
   * @param {unknown} newChannel - The new channel data.
   * @param {Shard} shard - The shard where the channel was updated.
   */
  channelUpdate: (
    oldChannel: unknown,
    newChannel: unknown,
    shard: Shard
  ) => unknown;
  /**
   * Fired when a new thread channel is created.
   * @param {ThreadChannel} threadChannel - The new thread channel.
   * @param {Shard} shard - The shard where the thread channel was created.
   */
  threadCreate: (threadChannel: ThreadChannel, shard: Shard) => unknown;

  /**
   * Fired when a thread channel is updated.
   * @param {ThreadChannel} oldThread - The old thread channel data.
   * @param {ThreadChannel} newThread - The new thread channel data.
   * @param {Shard} shard - The shard where the thread channel was updated.
   */
  threadUpdate: (
    oldThread: ThreadChannel,
    newThread: ThreadChannel,
    shard: Shard
  ) => unknown;

  /**
   * Fired when a thread channel is deleted.
   * @param {ThreadChannel} oldThreadChannel - The old thread channel.
   * @param {Shard} shard - The shard where the thread channel was deleted.
   */
  threadDelete: (oldThreadChannel: ThreadChannel, shard: Shard) => unknown;

  /**
   * Fired when a guild's threads are synchronized.
   * @param {Guild} guild - The guild where the threads were synchronized.
   * @param {Collection<string, ThreadChannel>} channels - The threads in the guild.
   * @param {Collection<string, ThreadMember>} members - The thread members in the guild.
   * @param {Shard} shard - The shard where the threads were synchronized.
   */
  threadListSync: (
    guild: Guild,
    channels: Collection<string, ThreadChannel>,
    members: Collection<string, ThreadMember>,
    shard: Shard
  ) => unknown;

  /**
   * Fired when a thread member is updated.
   * @param {ThreadChannel} threadChannel - The thread channel where the member was updated.
   * @param {ThreadMember} threadMember - The new thread member data.
   * @param {Shard} shard - The shard where the thread member was updated.
   */
  threadMemberUpdate: (
    threadChannel: ThreadChannel,
    threadMember: ThreadMember,
    shard: Shard
  ) => unknown;

  /**
   * Fired when a member's presence data is updated in a guild.
   * @param {Member} member - The member whose presence data was updated.
   * @param {Nullable<PresenceData>} oldPresence - The old presence data before the update.
   * @param {PresenceData} newPresence - The new presence data after the update.
   * @param {Shard} shard - The shard where the presence update occurred.
   */
  presenceUpdate: (
    member: Member,
    oldPresence: Nullable<PresenceData>,
    newPresence: PresenceData,
    shard: Shard
  ) => unknown;

  /**
   * Fired when a raw gateway event is received.
   * @param {GatewayReceivePayload} message - The raw gateway event message.
   * @param {string} shardId - The ID of the shard where the raw event was received.
   */
  rawEvent: (message: GatewayReceivePayload, shardId: number) => unknown;
}
