import { Nullable } from "../../../lib/interfaces/other";
import { ClientUser } from "../../client/ClientUser";
import { Channel } from "../../structures";
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
  status: PresenceStatus;
  afk: boolean;
  since: number;
}

export interface EditClientUserPayload {
  username?: string;
  avatar?: string;
}

export enum EventNames {
  "MessageCreate" = "messageCreate",
  "InteractionCreate" = "interactionCreate",
  "ChannelCreate" = "channelCreate",
  "ChannelDelete" = "channelDelete",
  "GuildBanAdd" = "guildBanAdd",
  "GuildBanRemove" = "guildBanRemove",
  "Ready" = "ready",
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

  guildBanRemove: (user: User, guild: Nullable<Guild>, shard: Shard) => unknown;
  guildBanAdd: (user: User, guild: Nullable<Guild>, shard: Shard) => unknown;

  channelCreate: (channel: Channel, id: string, shard: Shard) => unknown;
  channelDelete: (oldChannel: Channel, id: string, shard: Shard) => unknown;

  channelUpdate: (_old: unknown, _new: unknown, shard: Shard) => unknown;
}

export enum Intents {
  Guilds = 1 << 0,
  GuildMembers = 1 << 1,
  GuildModeration = 1 << 2,
  GuildEmojisAndStickers = 1 << 3,
  GuildIntegrations = 1 << 4,
  GuildWebhooks = 1 << 5,
  GuildInvites = 1 << 6,
  GuildVoiceStates = 1 << 7,
  GuildPresences = 1 << 8,
  GuildMessages = 1 << 9,
  GuildMessageReactions = 1 << 10,
  GuildMessageTyping = 1 << 11,
  DirectMessages = 1 << 12,
  DirectMessagesReactions = 1 << 13,
  DirectMessageTyping = 1 << 14,
  MessageContent = 1 << 15,
  GuildScheduledEvents = 1 << 16,
  AutoModerationConfiguration = 1 << 20,
  AutoModerationExecution = 1 << 21,
}
