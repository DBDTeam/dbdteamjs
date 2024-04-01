import { TypedEmitter } from "tiny-typed-emitter";
import { REST } from "../rest/REST";
import { ChannelManager } from "../structures/Managers/ChannelManager";
import { GuildManager } from "../structures/Managers/GuildManager";
import { UserManager } from "../structures/Managers/UserManager";
import { GatewayConfig, ShardManager } from "../structures/Sharding";
import { ClientApplication } from "./ClientApplication";
import { ClientPresence } from "./ClientPresence";
import { ClientUser } from "./ClientUser";
/**
 * @typedef ClientOptions
 * @property {string} token - The Client token
 * @property {number} intents - The intents of the client
 * @property {GatewayConfig} gateway - The client gateway configuration
 */
export interface ClientOptions {
    token: string;
    intents: number;
    gateway: GatewayConfig;
}
/**
 * @extends {TypedEmitter<import("../../typings/index").ClientEvents>}
 */
declare class Client extends TypedEmitter {
    opts: ClientOptions;
    readonly token: string;
    readonly intents: number;
    readonly rest: REST;
    readonly configGateway: GatewayConfig;
    shardManager: ShardManager;
    gateway: GatewayConfig;
    guilds: GuildManager;
    users: UserManager;
    channels: ChannelManager;
    ready: number;
    ping: number;
    user?: ClientUser;
    presence: ClientPresence;
    application: ClientApplication | undefined;
    private actions;
    guild: any;
    /**
     * Represents the Client
     * @param opts - The client options
     *
     * @example
     * const client = new Client({
     *  token: `Client token goes here`,
     *  intents: YourIntents,
     *  gateway: {
     *      mobilePlatform: true
     *  }
     * })
     */
    constructor(opts: ClientOptions);
    /**
     * Establish the connection with the proyect to the WS
     */
    connect(): void;
    disconnect(): void;
    reconnectAll(): void;
}
export { Client };
