"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShardManager = exports.Shard = void 0;
const ws_1 = __importDefault(require("ws"));
const common_1 = require("../common");
const Collection_1 = require("../utils/Collection");
const ClientListener_1 = require("../client/ClientListener");
const ClientError_1 = require("../client/errors/ClientError");
const ErrorList_1 = require("../client/errors/ErrorList");
class Shard extends ClientListener_1.ListenerManager {
    client;
    heartbeatInterval;
    sessionID;
    sequence;
    interval;
    token;
    intents;
    authenticated;
    time;
    browser;
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
        this.browser =
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
            this.ws.on("error", (error) => {
                if (error.code === "ECONNRESET") {
                    return;
                }
                this.emit("shardError", error);
            });
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
            const identifyPayload = {
                op: 2,
                d: {
                    token: this.token,
                    intents: this.intents,
                    shard: [this.shardID, this.totalShards],
                    properties: {
                        os: "linux",
                        browser: this.browser,
                        device: "dbdteam.js",
                    },
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
        if (message.s !== null)
            this.sequence = message.s;
        switch (message.op) {
            case 0:
                this.client.emit("debug", "Event from discord received: " + message.t, this.shardID);
                if (message.t == "READY") {
                    this.sessionID = message.d.session_id;
                }
                this.emit("rawEvent", message, this.shardID);
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
class ShardManager extends ClientListener_1.ListenerManager {
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
        this.totalShards = gateway?.shards || 0;
        this.url = "wss://gateway.discord.gg/?v=10&encoding=json";
        this.shards = new Collection_1.Collection();
        this.gateway = gateway || {};
        this.checkInfo();
    }
    /**
     * Validate the intents provided in `this.intents`.
     * @returns {string[]} A list of invalid intents, if any.
     */
    checkValidIntents() {
        // Obtenemos los valores de los intents válidos (solo los números)
        const validIntents = Object.values(common_1.Intents).filter((value) => typeof value === "number");
        return validIntents;
    }
    checkInfo() {
        if (!this.token || !this.intents)
            throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.ClientInvalidTokenAndIntents);
        if (this.totalShards && this.totalShards <= 0)
            throw new ClientError_1.ClientRangeError(ErrorList_1.ErrorNames.ClientInvalidOptionValue, "shards", "number");
        const validIntents = this.checkValidIntents();
        if ((this.intents & validIntents.reduce((acc, curr) => acc | curr, 0)) !== this.intents)
            throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.ClientInvalidOptionValue, "intents", `intent value.`);
    }
    async getGatewayConfig() {
        return await this.client.rest.request("GET", `/gateway/bot`, true);
    }
    async connect() {
        let gatewayConfig = await this.getGatewayConfig();
        if (gatewayConfig?.error)
            throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.ClientInvalidToken);
        this.config = gatewayConfig;
        if (this.totalShards === null || this.totalShards <= 0) {
            this.totalShards = this.config.shards || 1;
            this.gateway.shards = this.config.shards;
        }
        for (var shardID = 0; shardID < this.totalShards; shardID++) {
            const shard = new Shard(this.client, shardID, this.totalShards, this.gateway);
            this.shards.set(shardID, shard);
            await shard.connect();
            shard.on("rawEvent", (d) => {
                this.emit("rawEvent", d, shardID);
            });
        }
    }
    async reconnect(shardID) {
        this.client.emit("debug", "Trying to reconnect...", shardID);
        const shard = this.shards.get(shardID);
        if (!shard)
            throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.ShardNotFound, shardID);
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
