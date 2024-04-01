/// <reference types="node" />
import { EventEmitter } from "node:events";
import { type Client } from "../client/Client";
import { Collection } from "../utils/Collection";
export interface GatewayConfig {
    url: string;
    mobilePlatform: boolean;
    totalShards: number | undefined;
    agent: string;
}
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
    messageEvent(data: any): Promise<void>;
    heartbeat(): Promise<void>;
    disconnect(): Promise<void>;
}
declare class ShardManager extends EventEmitter {
    shards: Collection;
    private token;
    private intents;
    totalShards: number;
    private url;
    client: any;
    gateway: GatewayConfig;
    private config;
    /**
     *
     * @param {import('../client/Client').Client} client
     * @param {Shard} gateway
     */
    constructor(client: any, gateway: GatewayConfig);
    private getGatewayConfig;
    connect(): Promise<void>;
    reconnect(shardID: number): Promise<void>;
    disconnect(): Promise<void>;
}
export { Shard, ShardManager };
