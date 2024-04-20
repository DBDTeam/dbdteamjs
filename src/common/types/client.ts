import { Nullable } from "../../../lib/interfaces/other";
import { ClientUser } from "../../client/ClientUser";
import { Channel, GuildRole, Member, ThreadChannel } from "../../structures";
import { Guild } from "../../structures/Guild";
import { InteractionBase } from "../../structures/Interactions/BaseInteraction";
import { Message } from "../../structures/Message";
import { Shard } from "../../structures/Sharding";
import { User } from "../../structures/User";
import { GatewayActivityPayload, PresenceStatus } from "../../types/Presences";
import { Collection } from "../../utils/Collection";

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
  "ThreadCreate" = "threadCreate",
  "ThreadUpdate" = "threadUpdate",
  "GuildCreate" = "guildCreate",
  "GuildUnavailable" = "guildUnavailable",
  "GuildDelete" = "guildDelete",
  "GuildEmojiUpdate" = "guildEmojiUpdate",
  "GuildMemberAdd" = "guildMemberAdd",
  "GuildMemberChunk" = "guildMemberChunk",
  "GuildMemberLeave" = "guildMemberLeave",
  "GuildMemberUpdate" = "guildMemberUpdate", // Acá vas completando, únicamente los que tienen extensión .js de los events
  "GuildRoleCreate" = "guildRoleCreate",
  "GuildRoleDelete" ="guildRoleDelete",
  "GuildRoleUpdate" = "guildRoleUpdate",
  "GuildStickersUpdate" = "guildStickersUpdate",
  "GuildUpdate" = "guildUpdate",
  "MessageDelete" = "messageDelete",
  "MessageUpdate" = "messageUpdate",
  "PresenceUpdate" = "presenceUpdate",
  "VoiceServerUpdate" = "voiceServerUpdate", // "voiceServerUpdate" es el 2do string de la igualdad
  "VoiceStateUpdate" = "voiceStateUpdate" 
} // Ahora algo más díficil, vas a seguir el ejemplo de abajo, vas a tener que entender el código.

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
  // ACA EL EJEMPLO: (Vas poniendo de nombre el 2 string de la igualdad)
  guildRoleCreate: (role: GuildRole, shard: Shard) => unknown;
  //Acostúmbrate a explicar con el nombre, role sería como
  //Si fuera un role nuevo, pero oldRole da a significar que es un role antiguo.
  guildRoleDelete: (oldRole: GuildRole, shard: Shard) => unknown;
  //Al usuario le sirve saber qué diferencias hay entre el nuevo y el antiguo, por eso va newRole primero
  //Y luego el oldRole.
  guildRoleUpdate: (newRole: GuildRole, oldRole: GuildRole, shard: Shard) => unknown;
  guildStickersUpdate: (guild: Guild, shard: Shard) => unknown;
  
  channelCreate: (channel: Channel, id: string, shard: Shard) => unknown;
  channelDelete: (oldChannel: Channel, id: string, shard: Shard) => unknown;
  channelUpdate: (oldChannel: unknown, newChannel: unknown, shard: Shard) => unknown;
  threadCreate: (threadChannel: ThreadChannel, shard: Shard) => unknown
  threadUpdate: (oldThread: ThreadChannel, newThread: ThreadChannel, shard: Shard) => unknown
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
