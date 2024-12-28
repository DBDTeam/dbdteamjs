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

export enum ErrorNames {
    "ClientInvalidToken" = "ClientInvalidToken" ,
    "ClientInvalidOptionValue" = "ClientInvalidOptionValue",
    "GuildMemberMeUncached" = "GuildMemberMeUncached",
    "ClientInvalidTokenAndIntents" = "ClientInvalidTokenAndIntents",
    "ShardNotFound" = "ShardNotFound",
    "InvalidType" = "InvalidType",
    "MissingPermissions" = "MissingPermissions",
    "MissingRequiredProperties" = "MissingRequiredProperties",
    "InvalidPermission" = "InvalidPermission",
}

export const ErrorEnum = Object.fromEntries(ErrorNamesArray.map(key => [key, key])) as {
    [K in typeof ErrorNamesArray[number]]: K;
};