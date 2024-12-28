"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEnum = exports.ErrorNames = void 0;
const ErrorNamesArray = [
    "ClientInvalidToken",
    "ClientInvalidTokenAndIntents",
    "ClientInvalidOptionValue",
    "GuildMemberMeUncached",
    "ShardNotFound",
    "InvalidType",
    "MissingPermissions",
    "MissingRequiredProperties",
    "InvalidPermission",
];
var ErrorNames;
(function (ErrorNames) {
    ErrorNames["ClientInvalidToken"] = "ClientInvalidToken";
    ErrorNames["ClientInvalidOptionValue"] = "ClientInvalidOptionValue";
    ErrorNames["GuildMemberMeUncached"] = "GuildMemberMeUncached";
    ErrorNames["ClientInvalidTokenAndIntents"] = "ClientInvalidTokenAndIntents";
    ErrorNames["ShardNotFound"] = "ShardNotFound";
    ErrorNames["InvalidType"] = "InvalidType";
    ErrorNames["MissingPermissions"] = "MissingPermissions";
    ErrorNames["MissingRequiredProperties"] = "MissingRequiredProperties";
    ErrorNames["InvalidPermission"] = "InvalidPermission";
})(ErrorNames || (exports.ErrorNames = ErrorNames = {}));
exports.ErrorEnum = Object.fromEntries(ErrorNamesArray.map(key => [key, key]));
