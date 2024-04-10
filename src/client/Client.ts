import { TypedEmitter } from "tiny-typed-emitter";
import { ClientOptions, GatewayConfig } from "../interfaces/client/Client";
import { ClientEvents } from "../interfaces/client/Events";
import { REST } from "../rest/REST";
import { ChannelManager } from "../structures/Managers/ChannelManager";
import { GuildManager } from "../structures/Managers/GuildManager";
import { UserManager } from "../structures/Managers/UserManager";
import { ShardManager } from "../structures/Sharding";
import { ClientApplication } from "./ClientApplication";
import { ClientPresence } from "./ClientPresence";
import { ClientUser } from "./ClientUser";
import { EventManager } from "./events/EventManager";

/**
 * @typedef ClientOptions
 * @property {string} token - The Client token
 * @property {number} intents - The intents of the client
 * @property {GatewayConfig} gateway - The client gateway configuration
 */

/**
 * @extends {TypedEmitter<import("../../typings/index").ClientEvents>}
 */
class Client extends TypedEmitter<ClientEvents> {
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
  private events: EventManager;
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
  constructor(public opts: ClientOptions) {
    super();
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
    this.rest = new REST(this);

    /**
     * The Gateway Configuration of the client
     * @name Client#configGateway
     */
    this.configGateway = opts?.gateway;

    /**
     * The shard manager of the client
     */
    this.shardManager = new ShardManager(this, this.configGateway);
    /**
     * The gateway of the ShardManager
     */
    this.gateway = this.shardManager.gateway;
    /**
     * The guild manager of the client
     */
    this.guilds = new GuildManager(this);
    /**
     * The user manager of the client
     */
    this.users = new UserManager(this);
    /**
     * The channel manager of the client
     */
    this.channels = new ChannelManager(this);
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
    this.presence = new ClientPresence(this);
    /**
     * The application manager of the client
     */
    this.application = undefined;
    /**
     * The action manager of the client
     */
    this.events = new EventManager(this);

    this.shardManager.on("debug", (...args) => this.emit("debug", ...args));
    this.shardManager.on("eventReceived", async (d, id) => {
      this.events._handle(d.t, d.d, id);
    });
  }
  /**
   * Establish the connection with the proyect to the WS
   */
  public connect() {
    this.shardManager.connect();
  }

  public disconnect() {
    this.shardManager.disconnect();
  }

  public reconnectAll() {
    for (var [shardID] of this.shardManager.shards) {
      this.shardManager.reconnect(shardID);
    }
  }
}

export { Client };
