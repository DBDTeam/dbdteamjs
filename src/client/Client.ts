import { TypedEmitter } from "tiny-typed-emitter";
import { ClientEvents, ClientOptions, GatewayConfig } from "../common";
import { REST } from "../rest/REST";
import { ChannelManager } from "../structures/Managers/ChannelManager";
import { GuildManager } from "../structures/Managers/GuildManager";
import { UserManager } from "../structures/Managers/UserManager";
import { ShardManager } from "../structures/Sharding";
import { ClientApplication } from "./ClientApplication";
import { ClientPresence } from "./ClientPresence";
import { ClientUser } from "./ClientUser";
import { EventManager } from "./events/EventManager";

class Client extends TypedEmitter<ClientEvents> {
  /**
   * The token of the client
   */
  readonly token: string;
  /**
   * The intents of the client
   */
  readonly intents: number;
  /**
   * The REST of the client
   */
  readonly rest: REST;
  /**
   * The Gateway Configuration of the client
   */
  readonly configGateway: GatewayConfig;
  /**
   * The shard manager of the client
   */
  shardManager: ShardManager;
  /**
   * The gateway of the ShardManager
   */
  gateway: GatewayConfig;
  /**
   * The guild manager of the client
   */
  guilds: GuildManager;
  /**
   * The user manager of the client
   */
  users: UserManager;
  /**
   * The channel manager of the client
   */
  channels: ChannelManager;

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
  presence: ClientPresence;
  /**
   * The event manager of the client
   */
  private events: EventManager;
  /**
   * The application manager of the client
   */
  declare application: ClientApplication;
  /**
   * The client user
   */
  declare user: ClientUser;

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
  constructor(public opts: ClientOptions) {
    super();
    this.token = opts.token;
    this.intents = opts.intents;
    this.rest = new REST(this);
    this.configGateway = opts?.gateway;
    this.shardManager = new ShardManager(this, this.configGateway);
    this.gateway = this.shardManager.gateway;
    this.guilds = new GuildManager(this);
    this.users = new UserManager(this);
    this.channels = new ChannelManager(this);
    this.presence = new ClientPresence(this);
    this.events = new EventManager(this);

    this.shardManager.on("debug", (...args) => this.emit("debug", ...args));
    this.on("error", console.error);
    this.shardManager.on("eventReceived", async (d, id) => {
      this.events._handle(d.t, d.d, id);
    });
  }

  /**
   * Establish the connection with the proyect to the WS
   */
  public async connect() {
    this.shardManager.connect();
  }

  /**
   * Disconnect the connection with the proyect to the WS
   */
  public async disconnect() {
    this.shardManager.disconnect();
  }

  /**
   * Reconnect the connection with the proyect to the WS
   */
  public async reconnectAll() {
    for (var [shardID] of this.shardManager.shards) {
      this.shardManager.reconnect(shardID);
    }
  }
}

export { Client };
