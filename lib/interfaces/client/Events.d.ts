import { Nullable } from "../../../lib/interfaces/other";
import { ClientUser } from "../../client/ClientUser";
import { Guild } from "../../structures/Guild";
import { InteractionBase } from "../../structures/Interactions/BaseInteraction";
import { Message } from "../../structures/Message";
import { Shard } from "../../structures/Sharding";
import { User } from "../../structures/User";
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
    interactionCreate: (interaction: InteractionBase) => unknown;
    guildBanRemove: (user: User, guild: Nullable<Guild>, shard: Shard) => unknown;
    guildBanAdd: () => unknown;
    channelUpdate: (_old: unknown, _new: unknown, shard: Shard) => unknown;
}
