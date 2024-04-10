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
/**
 * @typedef ClientOptions
 * @property {string} token - The Client token
 * @property {number} intents - The intents of the client
 * @property {GatewayConfig} gateway - The client gateway configuration
 */
/**
 * @extends {TypedEmitter<import("../../typings/index").ClientEvents>}
 */
class Client extends tiny_typed_emitter_1.TypedEmitter {
    opts;
    token;
    intents;
    rest;
    configGateway;
    shardManager;
    gateway;
    guilds;
    users;
    channels;
    ready;
    ping;
    user;
    presence;
    application;
    events;
    guild;
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
    constructor(opts) {
        super();
        this.opts = opts;
        /**
         * The token of the client
         * @name Client#token¿
         */
        this.token = opts.token;
        /**
         * The intents of the client
         * @name Client#intents
         */
        this.intents = opts.intents;
        /**
         * The REST of the client
         * @name Client#rest
         */
        this.rest = new REST_1.REST(this);
        /**
         * The Gateway Configuration of the client
         * @name Client#configGateway
         */
        this.configGateway = opts?.gateway;
        /**
         * The shard manager of the client
         */
        this.shardManager = new Sharding_1.ShardManager(this, this.configGateway);
        /**
         * The gateway of the ShardManager
         */
        this.gateway = this.shardManager.gateway;
        /**
         * The guild manager of the client
         */
        this.guilds = new GuildManager_1.GuildManager(this);
        /**
         * The user manager of the client
         */
        this.users = new UserManager_1.UserManager(this);
        /**
         * The channel manager of the client
         */
        this.channels = new ChannelManager_1.ChannelManager(this);
        /**
         * The timestamp when the client execute's the event "READY"
         */
        this.ready = 0;
        /**
         * The ping of the client
         */
        this.ping = 0;
        /**
         * The client user
         * @type {ClientUser|undefined}
         */
        this.user = undefined;
        /**
         * The client presence manager
         * @type {ClientPresence}
         */
        this.presence = new ClientPresence_1.ClientPresence(this);
        /**
         * The application manager of the client
         */
        this.application = undefined;
        /**
         * The action manager of the client
         */
        this.events = new EventManager_1.EventManager(this);
        this.shardManager.on("debug", (...args) => this.emit("debug", ...args));
        this.shardManager.on("eventReceived", async (d, id) => {
            this.events._handle(d.t, d.d, id);
        });
    }
    /**
     * Establish the connection with the proyect to the WS
     */
    connect() {
        this.shardManager.connect();
    }
    disconnect() {
        this.shardManager.disconnect();
    }
    reconnectAll() {
        for (var [shardID] of this.shardManager.shards) {
            this.shardManager.reconnect(shardID);
        }
    }
}
exports.Client = Client;
