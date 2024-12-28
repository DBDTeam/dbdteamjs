declare const ErrorNamesArray: string[];
export declare enum ErrorNames {
    "ClientInvalidToken" = "ClientInvalidToken",
    "ClientInvalidOptionValue" = "ClientInvalidOptionValue",
    "GuildMemberMeUncached" = "GuildMemberMeUncached",
    "ClientInvalidTokenAndIntents" = "ClientInvalidTokenAndIntents",
    "ShardNotFound" = "ShardNotFound",
    "InvalidType" = "InvalidType",
    "MissingPermissions" = "MissingPermissions",
    "MissingRequiredProperties" = "MissingRequiredProperties",
    "InvalidPermission" = "InvalidPermission"
}
export declare const ErrorEnum: { [K in (typeof ErrorNamesArray)[number]]: K; };
export {};
