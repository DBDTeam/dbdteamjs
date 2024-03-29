const { ShardManager } = require("../structures/Sharding.js");
const { EventEmitter } = require("node:events");
const { ActionManager } = require("../structures/Actions/ActionManager.js");
const { ClientPresence } = require("./ClientPresence.js");
const { ChannelManager } = require("../structures/Managers/ChannelManager.js");
const { GuildManager } = require("../structures/Managers/GuildManager.js");
const { UserManager } = require("../structures/Managers/UserManager.js");
const { REST } = require("../rest/REST.js");
const { ClientApplication } = require("./ClientApplication.js");
const { ClientUser } = require("./ClientUser.js");
const { readOnly } = require("../utils/utils.js");

/**
 * @typedef ClientOptions
 * @property {string} token - The Client token
 * @property {number} intents - The intents of the client
 * @property {object} gateway - The client gateway configuration
 */

/**
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {
  /**
   * Represents the Client
   * @param {ClientOptions} opts - The client options
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
    /**
     * The token of the client
     * @name Client#token
     * @type {string}
     * @readonly
     */
    this.token = opts.token;
    readOnly(this, "token", opts.token);

    /**
     * The intents of the client
     * @name Client#intents
     * @type {number}
     * @readonly
     */
    this.intents = opts.intents;
    readOnly(this, "intents", opts.intents);

    /**
     * The REST of the client
     * @name Client#rest
     * @type {REST}
     * @readonly
     */
    this.rest = new REST(this);
    readOnly(this, "rest", this.rest);

    /**
     * The Gateway Configuration of the client
     * @name Client#c
     * @type {object}
     * @readonly
     */
    this.configGateway = opts?.gateway || {};
    readOnly(this, "configGateway", this.configGateway);

    /**
     * The shard manager of the client
     * @type {ShardManager}
     */
    this.shardManager = new ShardManager(this, this.configGateway);
    /**
     * The gateway of the ShardManager
     * @type {object}
     */
    this.gateway = this.shardManager.gateway;
    /**
     * The guild manager of the client
     * @type {GuildManager}
     */
    this.guilds = new GuildManager(this);
    /**
     * The user manager of the client
     * @type {UserManager}
     */
    this.users = new UserManager(this);
    /**
     * The channel manager of the client
     * @type {ChannelManager}
     */
    this.channels = new ChannelManager(this);
    /**
     * The timestamp when the client execute's the event "READY"
     * @type {number}
     */
    this.ready = 0;
    /**
     * The ping of the client
     * @type {number}
     */
    this.ping = 0;
    /**
     * The client user
     * @type {ClientUser|undefined}
     */
    this.user = null;
    /**
     * The client presence manager
     * @type {ClientPresence}
     */
    this.presence = new ClientPresence(this);
    /**
     * The application manager of the client
     * @type {ClientApplication}
     */
    this.application = null;
    /**
     * The action manager of the client
     * @type {ActionManager}
     * @private
     */
    this.actions = new ActionManager(this);

    this.shardManager.on("debug", (...args) => this.emit("debug", ...args));
    this.shardManager.on("eventReceived", async (d, id) => {
      this.actions._handle(d.t, d.d, id);
    });
  }
  /**
   * Establish the connection with the proyect to the WS
   */
  connect() {
    this.shardManager.connect();
  }
}

module.exports = { Client };
