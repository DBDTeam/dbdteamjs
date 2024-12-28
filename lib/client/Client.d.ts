import { CacheOptions, ClientOptions, GatewayConfig, Nullable } from "../common";
import { REST } from "../rest/REST";
import { ChannelManager } from "../structures/Managers/ChannelManager";
import { GuildManager } from "../structures/Managers/GuildManager";
import { UserManager } from "../structures/Managers/UserManager";
import { ShardManager } from "../structures/Sharding";
import { ClientApplication } from "./ClientApplication";
import { ClientPresence } from "./ClientPresence";
import { ClientUser } from "./ClientUser";
import { SnowflakeInformation } from "../utils/utils";
import { ListenerManager } from "./ClientListener";
declare class Client extends ListenerManager {
    /**
     * The token of the client
     */
    readonly token: string;
    /**
     * The intents of the client
     */
    readonly intents: number;
    /**
     * The REST of the client
     */
    readonly rest: REST;
    /**
     * The Gateway Configuration of the client
     */
    readonly configGateway?: GatewayConfig;
    /**
     * The Cache options of the client.
     */
    readonly cacheOpts?: CacheOptions;
    /**
     * The shard manager of the client
     */
    shardManager: ShardManager;
    /**
     * The gateway of the ShardManager
     */
    gateway: GatewayConfig;
    /**
     * The guild manager of the client
     */
    guilds: GuildManager;
    /**
     * The user manager of the client
     */
    users: UserManager;
    /**
     * The channel manager of the client
     */
    channels: ChannelManager;
    /**
     * The timestamp when the client execute's the event "READY"
     */
    ready: Nullable<SnowflakeInformation>;
    /**
     * The client ping
     */
    ping: number;
    /**
     * The client presence manager
     */
    presence: ClientPresence;
    /**
     * The event manager of the client
     */
    private events;
    /**
     * The application manager of the client
     */
    application: ClientApplication;
    /**
     * The client user
     */
    user: ClientUser;
    /**
     * Represents the Client
     * @param { ClientOptions } opts The client options
     *
     * @example
     * ```ts
     * const client = new Client({
     *  token: `Client token goes here`,
     *  intents: YourIntents,
     *  gateway: {
     *      mobilePlatform: true
     *  }
     * })
     * ```
     */
    constructor(opts: ClientOptions);
    /**
     * Establish the connection with the proyect to the WS
     */
    connect(): Promise<void>;
    /**
     * Disconnect the connection with the proyect to the WS
     */
    disconnect(): Promise<void>;
    /**
     * Reconnect the connection with the proyect to the WS
     */
    reconnectAll(): Promise<void>;
}
export { Client };
