const { ShardManager } = require('../Sharding.js');
const { EventEmitter } = require("events")
const { ActionManager } = require("../Actions/ActionManager.js")
const { ClientPresence } = require("./ClientPresence.js")
const { readOnly } = require("../../Utils/utils.js");
const { ChannelManager } = require('../Managers/ChannelManager.js');
const { GuildManager } = require("../Managers/GuildManager.js");
const { UserManager } = require('../Managers/UserManager.js');
const { REST } = require('../../REST/REST.js');
const { ApplicationCommandManager } = require("../Managers/ApplicationCommandsManager.js");

class Client extends EventEmitter {
    constructor(opts) {
        super()
        readOnly(this, "token", opts.token)
        readOnly(this, "intents", opts.intents);
        readOnly(this, "rest", new REST(this))
        readOnly(this, "configGateway", opts?.gateway || {});
        this.shardManager = new ShardManager(this, this.configGateway);
        this.gateway = this.shardManager.gateway
        this.guilds = new GuildManager(this)
        this.users = new UserManager(this)
        this.channels = new ChannelManager(this)
        this.ready = 0;
        this.user = null;
        this.presence = new ClientPresence(this);
        this.application = null;
        this.actions = new ActionManager(this)

        this.shardManager.on("debug", (...args) => this.emit("debug", ...args))
        this.shardManager.on("eventReceived", async(d, id) => {
            this.actions._handle(d.t, d.d, id)
        })
        
    }
    connect() {
        this.shardManager.connect();
    }
}

module.exports = { Client };