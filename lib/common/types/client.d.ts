import { Nullable } from "../../../lib/interfaces/other";
import { ClientUser } from "../../client/ClientUser";
import { Guild } from "../../structures/Guild";
import { InteractionBase } from "../../structures/Interactions/BaseInteraction";
import { Message } from "../../structures/Message";
import { Shard } from "../../structures/Sharding";
import { User } from "../../structures/User";
import { ActivityPayload, PresenceStatus } from "../../types/Presences";
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
    activities: Array<ActivityPayload>;
    status: PresenceStatus;
    afk: boolean;
    since: number;
}
export interface EditClientUserPayload {
    username?: string;
    avatar?: string;
}
export declare enum EventNames {
    "MessageCreate" = "messageCreate",
    "InteractionCreate" = "interactionCreate"
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
    guildBanAdd: () => unknown;
    channelUpdate: (_old: unknown, _new: unknown, shard: Shard) => unknown;
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
