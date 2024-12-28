import { type Client } from "../client/Client";
import { GatewayConfig } from "../common";
import { Collection } from "../utils/Collection";
import { ListenerManager } from "../client/ClientListener";
declare class Shard extends ListenerManager {
    private client;
    private heartbeatInterval;
    private sessionID;
    private sequence;
    private interval;
    private token;
    private intents;
    private authenticated;
    private time;
    private browser;
    latency: number;
    ws: any;
    url: string;
    shardID: number;
    totalShards: number;
    restartTimes: number;
    constructor(client: Client, shardID: number, totalShards: number, gateway: GatewayConfig);
    connect(): Promise<void>;
    openEvent(): Promise<void>;
    closeEvent(code: number, reason: string): Promise<void>;
    identify(): Promise<void>;
    setAuthenticated(): Promise<void>;
    resume(): Promise<void>;
    messageEvent(data: string): Promise<void>;
    heartbeat(): Promise<void>;
    disconnect(): Promise<void>;
}
declare class ShardManager extends ListenerManager {
    shards: Collection<number, Shard>;
    private token;
    private intents;
    totalShards: number;
    private url;
    client: Client;
    gateway: GatewayConfig;
    private config;
    /**
     *
     * @param {import('../client/Client').Client} client
     * @param {Shard} gateway
     */
    constructor(client: Client, gateway?: GatewayConfig);
    /**
     * Validate the intents provided in `this.intents`.
     * @returns {string[]} A list of invalid intents, if any.
     */
    private checkValidIntents;
    private checkInfo;
    private getGatewayConfig;
    connect(): Promise<void>;
    reconnect(shardID: number): Promise<void>;
    disconnect(): Promise<void>;
}
export { Shard, ShardManager };
