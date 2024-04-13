/// <reference types="node" />
import { EventEmitter } from "node:events";
import { type Client } from "../client/Client";
import { GatewayConfig } from "../interfaces/client/Client";
import { Collection } from "../utils/Collection";
declare class Shard extends EventEmitter {
    private client;
    private heartbeatInterval;
    private sessionID;
    private sequence;
    private interval;
    private token;
    private intents;
    private authenticated;
    private time;
    private mobilePlatform;
    latency: number;
    ws: any;
    url: string;
    shardID: string;
    totalShards: number;
    restartTimes: number;
    constructor(client: Client, shardID: string, totalShards: number, gateway: GatewayConfig);
    connect(): Promise<void>;
    openEvent(): Promise<void>;
    closeEvent(code: number, reason: string): Promise<void>;
    identify(): Promise<void>;
    setAuthenticated(): Promise<void>;
    resume(): Promise<void>;
    messageEvent(data: any): Promise<void>;
    heartbeat(): Promise<void>;
    disconnect(): Promise<void>;
}
declare class ShardManager extends EventEmitter {
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
    constructor(client: Client, gateway: GatewayConfig);
    private getGatewayConfig;
    connect(): Promise<void>;
    reconnect(shardID: number): Promise<void>;
    disconnect(): Promise<void>;
}
export { Shard, ShardManager };
