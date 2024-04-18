"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const REST_1 = require("../rest/REST");
const ChannelManager_1 = require("../structures/Managers/ChannelManager");
const GuildManager_1 = require("../structures/Managers/GuildManager");
const UserManager_1 = require("../structures/Managers/UserManager");
const Sharding_1 = require("../structures/Sharding");
const ClientPresence_1 = require("./ClientPresence");
const EventManager_1 = require("./events/EventManager");
class Client extends tiny_typed_emitter_1.TypedEmitter {
    opts;
    /**
     * The token of the client
     */
    token;
    /**
     * The intents of the client
     */
    intents;
    /**
     * The REST of the client
     */
    rest;
    /**
     * The Gateway Configuration of the client
     */
    configGateway;
    /**
     * The shard manager of the client
     */
    shardManager;
    /**
     * The gateway of the ShardManager
     */
    gateway;
    /**
     * The guild manager of the client
     */
    guilds;
    /**
     * The user manager of the client
     */
    users;
    /**
     * The channel manager of the client
     */
    channels;
    /**
     * The timestamp when the client execute's the event "READY"
     */
    ready = 0;
    /**
     * The client ping
     */
    ping = 0;
    /**
     * The client presence manager
     */
    presence;
    /**
     * The event manager of the client
     */
    events;
    /**
     * Represents the Client
     * @param opts The client options
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
    constructor(opts) {
        super();
        this.opts = opts;
        this.token = opts.token;
        this.intents = opts.intents;
        this.rest = new REST_1.REST(this);
        this.configGateway = opts?.gateway;
        this.shardManager = new Sharding_1.ShardManager(this, this.configGateway);
        this.gateway = this.shardManager.gateway;
        this.guilds = new GuildManager_1.GuildManager(this);
        this.users = new UserManager_1.UserManager(this);
        this.channels = new ChannelManager_1.ChannelManager(this);
        this.presence = new ClientPresence_1.ClientPresence(this);
        this.events = new EventManager_1.EventManager(this);
        this.shardManager.on("debug", (...args) => this.emit("debug", ...args));
        this.on("error", console.error);
        this.shardManager.on("eventReceived", async (d, id) => {
            this.events._handle(d.t, d.d, id);
        });
    }
    /**
     * Establish the connection with the proyect to the WS
     */
    async connect() {
        this.shardManager.connect();
    }
    /**
     * Disconnect the connection with the proyect to the WS
     */
    async disconnect() {
        this.shardManager.disconnect();
    }
    /**
     * Reconnect the connection with the proyect to the WS
     */
    async reconnectAll() {
        for (var [shardID] of this.shardManager.shards) {
            this.shardManager.reconnect(shardID);
        }
    }
}
exports.Client = Client;
