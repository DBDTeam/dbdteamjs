"use strict";
/** @module Client */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientApplication = void 0;
const ApplicationCommandsManager_1 = require("../structures/Managers/ApplicationCommandsManager");
/**
 * Represents the Client Application
 */
class ClientApplication {
    client;
    commands;
    constructor(client) {
        /**
         * The client
         * @readonly
         */
        this.client = client;
        /**
         * Represents all of the application commands of the client
         * @type {ApplicationCommandManager}
         */
        this.commands = new ApplicationCommandsManager_1.ApplicationCommandManager(client);
    }
}
exports.ClientApplication = ClientApplication;
