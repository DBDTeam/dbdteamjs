"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShardManager = exports.Shard = void 0;
const events_1 = require("events");
// @ts-ignore shh
const ws_1 = __importDefault(require("ws"));
const common_1 = require("../common");
const Collection_1 = require("../utils/Collection");
class Shard extends events_1.EventEmitter {
    client;
    heartbeatInterval;
    sessionID;
    sequence;
    interval;
    token;
    intents;
    authenticated;
    time;
    mobilePlatform;
    latency;
    ws;
    url;
    shardID;
    totalShards;
    restartTimes;
    constructor(client, shardID, totalShards, gateway) {
        super();
        this.time = Date.now();
        this.client = client;
        this.url = "wss://gateway.discord.gg/?v=10&encoding=json";
        this.mobilePlatform =
            gateway?.mobilePlatform === true ? "Discord Android" : "dbdteamjs";
        this.token = client.token;
        this.intents = client.intents;
        this.shardID = shardID;
        this.totalShards = totalShards;
        this.sessionID = "";
        this.sequence = 0;
        this.interval = 45000;
        this.authenticated = false;
        this.latency = 0;
        this.restartTimes = 0;
    }
    async connect() {
        if (this.authenticated)
            return;
        try {
            this.ws = new ws_1.default(this.url, {
                headers: { Authorization: `Bot ${this.token}` },
            });
            this.latency = Date.now();
            this.client.emit("debug", "Starting the connection with the gateway...", this.shardID);
            this.ws.on("open", () => this.openEvent());
            this.ws.on("message", (data) => this.messageEvent(data));
            this.ws.on("close", (code, reason) => this.closeEvent(code, reason));
        }
        catch (error) {
            this.client.emit("shardError", error);
        }
    }
    async openEvent() {
        this.client.ping = Date.now() - this.latency;
        this.client.emit("shardConnect", this.shardID);
        this.heartbeatInterval = setInterval(() => this.heartbeat(), this.interval);
        this.identify();
        this.authenticated = true;
    }
    async closeEvent(code, reason) {
        if (code === 1001 ||
            code === 1006 ||
            reason
                .toString()
                ?.toLowerCase()
                ?.startsWith("discord websocket requesting")) {
            this.ws = null;
            this.authenticated = false;
            this.restartTimes++;
            this.connect();
            this.client.emit(common_1.EventNames.Debug, `${reason}`, this.shardID);
            return;
        }
        this.client.emit("error", {
            type: "Close",
            d: { reason: reason.toString(), code },
            time: new Date(),
            shard: this.shardID,
        });
        this.client.emit("shardDisconnect", this.shardID);
        clearInterval(this.heartbeatInterval);
        if (this.sessionID) {
            this.authenticated = false;
            this.resume();
        }
    }
    async identify() {
        if (!this.authenticated) {
            this.setAuthenticated();
            let _browser = this.mobilePlatform;
            const identifyPayload = {
                op: 2,
                d: {
                    token: this.token,
                    intents: this.intents,
                    shard: [this.shardID, this.totalShards],
                    properties: { os: "linux", browser: _browser, device: "dbdteam.js" },
                },
            };
            this.ws.send(JSON.stringify(identifyPayload));
            this.client.emit("debug", "Connected to the gateway successfully", this.shardID);
        }
    }
    async setAuthenticated() {
        this.authenticated = !this.authenticated;
    }
    async resume() {
        if (this.authenticated)
            return;
        const resumePayload = {
            op: 6,
            d: {
                token: this.token,
                session_id: this.sessionID,
                seq: this.sequence,
            },
        };
        this.ws.send(JSON.stringify(resumePayload));
        this.client.emit("debug", "Resumming the connection", this.shardID);
    }
    async messageEvent(data) {
        const message = JSON.parse(data);
        if (message.s !== undefined)
            this.sequence = message.s;
        switch (message.op) {
            case 0:
                this.client.emit("debug", "Event from discord received: " + message.t, this.shardID);
                if (message.t == "READY") {
                    this.sessionID = message.d.session_id;
                }
                this.emit("eventReceived", message);
                break;
            case 9:
                this.setAuthenticated();
                if (!this.authenticated) {
                    this.client.emit("debug", "Received invalid session. Attempting to resume...", this.shardID);
                    this.resume();
                }
                break;
            case 10:
                this.client.emit("debug", "Hello received", this.shardID);
                this.interval = message.d.heartbeat_interval;
                clearInterval(this.heartbeatInterval);
                this.heartbeatInterval = setInterval(() => this.heartbeat(), this.interval);
                this.identify();
                break;
            case 11:
                this.client.emit("debug", "Heartbeat ACK received.", this.shardID);
                this.client.ping = Date.now() - this.latency;
                break;
        }
    }
    async heartbeat() {
        if (!this.authenticated)
            return;
        this.latency = Date.now();
        this.client.emit("debug", "Hearbeat sended.", this.shardID);
        this.ws.send(JSON.stringify({ op: 1, d: this.sequence }));
    }
    async disconnect() {
        if (!this.authenticated)
            return;
        clearInterval(this.heartbeatInterval);
        this.ws.close();
        this.client.emit("debug", "Shard disconnected.", this.shardID);
    }
}
exports.Shard = Shard;
class ShardManager extends events_1.EventEmitter {
    shards;
    token;
    intents;
    totalShards;
    url;
    client;
    gateway;
    config;
    /**
     *
     * @param {import('../client/Client').Client} client
     * @param {Shard} gateway
     */
    constructor(client, gateway) {
        super();
        this.client = client;
        this.token = client?.token;
        this.intents = client?.intents;
        this.totalShards = gateway?.totalShards || 0;
        this.url = "wss://gateway.discord.gg/?v=10&encoding=json";
        this.shards = new Collection_1.Collection();
        this.gateway = gateway;
        this.checkInfo();
    }
    checkInfo() {
        if (!this.token || !this.intents)
            throw new Error(`Please, input a valid token and intents to run the client.`);
        if (this.totalShards && this.totalShards <= 0)
            throw new Error(`Please, input a valid total of shards.`);
    }
    async getGatewayConfig() {
        return await this.client.rest.request("GET", `/gateway/bot`, true);
    }
    async connect() {
        this.config = (await this.getGatewayConfig())?.data;
        if (!this.config)
            throw new Error(`Please, provide a valid client token.`);
        if (this.totalShards === null || this.totalShards <= 0) {
            this.totalShards = this.config.shards || 1;
            this.gateway.totalShards = this.config.shards;
        }
        for (var shardID = 0; shardID < this.totalShards; shardID++) {
            const shard = new Shard(this.client, // @ts-ignore lmaooo
            shardID, this.totalShards, this.gateway);
            this.shards.set(shardID, shard);
            await shard.connect();
            shard.on("eventReceived", (d) => {
                this.emit("eventReceived", d, shardID);
            });
        }
    }
    async reconnect(shardID) {
        this.client.emit("debug", "Trying to reconnect...", shardID);
        const shard = this.shards.get(shardID);
        if (!shard) {
            this.client.emit("debug", "Shard doesn't exists", shardID);
            return;
        }
        await shard.connect();
    }
    async disconnect() {
        this.client.emit("debug", "Shards being disconnected...");
        for (var shard of this.shards.toJSON()) {
            await shard.disconnect();
        }
    }
}
exports.ShardManager = ShardManager;
