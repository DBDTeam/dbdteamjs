"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = void 0;
const ErrorList_1 = require("./ErrorList");
exports.ErrorMessages = {
    [ErrorList_1.ErrorEnum.ClientInvalidTokenAndIntents]: "An invalid client token and intents were provided.",
    [ErrorList_1.ErrorEnum.ClientInvalidToken]: "An invalid client token was provided.",
    [ErrorList_1.ErrorEnum.ClientInvalidOptionValue]: (name, value) => `The ${name} property requires a valid ${value} value.`,
    [ErrorList_1.ErrorEnum.GuildMemberMeUncached]: "The client is not present in the guild member cache.",
    [ErrorList_1.ErrorEnum.ShardNotFound]: (shardId) => `The shard with ID ${shardId} was not found.`,
    [ErrorList_1.ErrorEnum.InvalidType]: (type, field) => `A value of type ${type} was expected for the field ${field}.`,
    [ErrorList_1.ErrorEnum.MissingPermissions]: (permissionName) => `The client is missing the required permission: ${permissionName}.`,
    [ErrorList_1.ErrorEnum.MissingRequiredProperties]: (entityName, requiredProps) => `${entityName} must include at least one of the following properties: ${requiredProps.join(', ')}.`,
    [ErrorList_1.ErrorEnum.InvalidPermission]: (permissionName) => `Permission \"${permissionName}\" doesn't exist.`
};
