"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionContexts = exports.IntegrationTypes = void 0;
/**
 * Represents the types of integrations for Discord commands.
 */
var IntegrationTypes;
(function (IntegrationTypes) {
    IntegrationTypes[IntegrationTypes["GUILD_INSTALL"] = 0] = "GUILD_INSTALL";
    IntegrationTypes[IntegrationTypes["USER_INSTALL"] = 1] = "USER_INSTALL";
})(IntegrationTypes || (exports.IntegrationTypes = IntegrationTypes = {}));
/**
 * Represents the contexts in which a Discord command can be executed.
 */
var InteractionContexts;
(function (InteractionContexts) {
    InteractionContexts[InteractionContexts["GUILD"] = 0] = "GUILD";
    InteractionContexts[InteractionContexts["BOT_DM"] = 1] = "BOT_DM";
    InteractionContexts[InteractionContexts["PRIVATE_CHANNEL"] = 2] = "PRIVATE_CHANNEL";
})(InteractionContexts || (exports.InteractionContexts = InteractionContexts = {}));
