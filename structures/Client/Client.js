const { ShardManager } = require('../Sharding.js');
const { EventEmitter } = require("events")
const { ActionManager } = require("../Actions/ActionManager.js")
const { ClientPresence } = require("./ClientPresence.js")
const { readOnly } = require("../../Utils/utils.js");
const { ChannelManager } = require('../Managers/ChannelManager.js');
const { GuildManager } = require("../Managers/GuildManager.js");
const { UserManager } = require('../Managers/UserManager.js');
const { REST } = require('../../REST/REST.js');

class Client extends EventEmitter {
    constructor(opts) {
        super()
        /**
         * The token of the client
         * @readonly
         * @type {string}
         */
        readOnly(this, "token", opts.token)
        /**
         * The intents of the client
         * @readonly
         * @type {number}
         */
        readOnly(this, "intents", opts.intents);
        /**
         * The REST of the client
         * @readonly
         * @type {REST}
         */
        readOnly(this, "rest", new REST(this))
        /**
         * The Gateway Configuration of the client
         * @readonly
         * @type {object}
         */
        readOnly(this, "configGateway", opts?.gateway || {});
        /**
         * The shard manager of the client
         * @type {ShardManager}
         */
        this.shardManager = new ShardManager(this, this.configGateway);
        /**
         * The gateway of the ShardManager
         * @type {object}
         */
        this.gateway = this.shardManager.gateway
        /**
         * The guild manager of the client
         * @type {GuildManager}
         */
        this.guilds = new GuildManager(this)
        /**
         * The user manager of the client
         * @type {User}
         */
        this.users = new UserManager(this)
        /**
         * The channel manager of the client
         * @type {ChannelManager}
         */
        this.channels = new ChannelManager(this)
        /**
         * The timestamp when the client execute's the event "READY"
         * @type {number}
         */
        this.ready = 0;
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
         */
        this.actions = new ActionManager(this)

        this.shardManager.on("debug", (...args) => this.emit("debug", ...args))
        this.shardManager.on("eventReceived", async(d, id) => {
            this.actions._handle(d.t, d.d, id)
        })
        
    }
    /**
     * Establish the connection with the proyect to the WS
     */
    connect() {
        this.shardManager.connect();
    }
}

module.exports = { Client };