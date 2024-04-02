import { EventEmitter } from "node:events";
import WebSocket from "ws";
import { type Client } from "../client/Client";
import { Collection } from "../utils/Collection";
import { GatewayConfig } from "../interfaces/client/Client";

class Shard extends EventEmitter {
  private client: Client;
  private heartbeatInterval: any;
  private sessionID: string;
  private sequence: number;
  private interval: number;
  private token: string;
  private intents: number;
  private authenticated: boolean;
  private time: number;
  private mobilePlatform: string;
  public latency: number;
  public ws: any;
  public url: string;
  public shardID: number;
  public totalShards: number;
  public restartTimes: number;

  constructor(
    client: Client,
    shardID: number,
    totalShards: number,
    gateway: GatewayConfig
  ) {
    super();
    this.time = Date.now();
    this.client = client;
    this.url = gateway?.url || "wss://gateway.discord.gg/?v=10&encoding=json";
    this.mobilePlatform = gateway?.mobilePlatform
      ? "Discord Android"
      : "dbdteamjs";
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
    if (this.authenticated) return;

    try {
      this.ws = new WebSocket(this.url, {
        headers: { Authorization: `Bot ${this.token}` },
      });
      this.latency = Date.now();
      this.client.emit(
        "debug",
        "Starting the connection with the gateway...",
        this.shardID
      );
      this.ws.on("open", () => this.openEvent());
      this.ws.on("message", (data: any) => this.messageEvent(data));
      this.ws.on("close", (code: number, reason: string) =>
        this.closeEvent(code, reason)
      );
    } catch (error) {
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

  async closeEvent(code: number, reason: string) {
    if (
      code === 1001 &&
      reason
        .toString()
        ?.toLowerCase()
        ?.startsWith("discord websocket requesting")
    ) {
      this.ws = null;
      this.authenticated = false;
      this.restartTimes++;
      this.connect();
    }
    this.client.emit("error", {
      type: "Close",
      d: { reason: reason.toString(), code },
      time: new Date(),
      shard: this.shardID,
    });
    this.client.emit("shardDisconnect", this.shardID);
    clearInterval(this.heartbeatInterval);
    if (this.sessionID) this.resume();
    this.authenticated = false;
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
      this.client.emit(
        "debug",
        "Connected to the gateway successfully",
        this.shardID
      );
    }
  }

  async setAuthenticated() {
    this.authenticated = !this.authenticated;
  }

  async resume() {
    if (this.authenticated) return;

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

  async messageEvent(data: any) {
    const message = JSON.parse(data);
    if (message.s !== undefined) this.sequence = message.s;
    switch (message.op) {
      case 0:
        this.client.emit(
          "debug",
          "Event from discord received: " + message.t,
          this.shardID
        );
        if (message.t == "READY") {
          this.sessionID = message.d.session_id;
        }
        this.emit("eventReceived", message);
        break;
      case 9:
        this.setAuthenticated();
        if (!this.authenticated) {
          this.client.emit(
            "debug",
            "Received invalid session. Attempting to resume...",
            this.shardID
          );
          this.resume();
        }
        break;
      case 10:
        this.client.emit("debug", "Hello received", this.shardID);
        this.interval = message.d.heartbeat_interval;
        clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = setInterval(
          () => this.heartbeat(),
          this.interval
        );
        this.identify();
        break;
      case 11:
        this.client.emit("Heartbeat ACK received.", this.shardID);
        this.client.ping = Date.now() - this.latency;
        break;
    }
  }

  async heartbeat() {
    if (!this.authenticated) return;
    this.latency = Date.now();
    this.client.emit("Hearbeat sended.", this.shardID);
    this.ws.send(JSON.stringify({ op: 1, d: this.sequence }));
  }

  async disconnect() {
    if (!this.authenticated) return;
    clearInterval(this.heartbeatInterval);
    this.ws.close();
    this.client.emit("debug", "Shard disconnected.", this.shardID);
  }
}

class ShardManager extends EventEmitter {
  public shards;
  private token;
  private intents;
  public totalShards: number;
  private url;
  public client;
  public gateway;
  private config: any;

  /**
   *
   * @param {import('../client/Client').Client} client
   * @param {Shard} gateway
   */
  constructor(client: any, gateway: GatewayConfig) {
    super();
    this.client = client;
    this.token = client.token;
    this.intents = client.intents;
    this.totalShards = gateway.totalShards || 0;
    this.url = gateway?.url || "wss://gateway.discord.gg/?v=10&encoding=json";
    this.shards = new Collection();
    this.gateway = gateway;
  }

  private async getGatewayConfig() {
    return await this.client.rest.request("GET", `/gateway/bot`, true);
  }

  public async connect() {
    this.config = (await this.getGatewayConfig()).data;

    if (this.totalShards === null || this.totalShards <= 0) {
      this.totalShards = this.config.shards || 1;
      this.gateway.totalShards = this.config.shards;
    }

    for (var shardID = 0; shardID < this.totalShards; shardID++) {
      const shard = new Shard(
        this.client,
        shardID,
        this.totalShards,
        this.gateway
      );
      this.shards.set(shardID, shard);
      await shard.connect();
      shard.on("eventReceived", (d) => {
        this.emit("eventReceived", d, shardID);
      });
    }
  }

  public async reconnect(shardID: number) {
    this.client.emit("debug", "Trying to reconnect...", shardID);
    const shard = this.shards.get(shardID);
    if (!shard) {
      this.client.emit("debug", "Shard doesn't exists", shardID);
      return;
    }
    await shard.connect();
  }

  public async disconnect() {
    this.client.emit("debug", "Shards being disconnected...");
    for (const shard of this.shards.values()) {
      await shard.disconnect();
    }
  }
}

export { Shard, ShardManager };
