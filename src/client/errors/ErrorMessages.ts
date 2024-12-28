import { ErrorEnum } from "./ErrorList";

type ErrorMessageFunction = (...args: any[]) => string;

export const ErrorMessages: Record<
  keyof typeof ErrorEnum,
  string | ErrorMessageFunction
> = {
  [ErrorEnum.ClientInvalidTokenAndIntents]: "An invalid client token and intents were provided.",
  [ErrorEnum.ClientInvalidToken]: "An invalid client token was provided.",
  [ErrorEnum.ClientInvalidOptionValue]: (name: string, value: string) =>
    `The ${name} property requires a valid ${value} value.`,
  [ErrorEnum.GuildMemberMeUncached]: "The client is not present in the guild member cache.",
  [ErrorEnum.ShardNotFound]: (shardId) => `The shard with ID ${shardId} was not found.`,
  [ErrorEnum.InvalidType]: (type, field) =>
    `A value of type ${type} was expected for the field ${field}.`,
  [ErrorEnum.MissingPermissions]: (permissionName) =>
    `The client is missing the required permission: ${permissionName}.`,
  [ErrorEnum.MissingRequiredProperties]: (entityName: string, requiredProps: string[]) =>
    `${entityName} must include at least one of the following properties: ${requiredProps.join(', ')}.`,
  [ErrorEnum.InvalidPermission]: (permissionName: string) => `Permission \"${permissionName}\" doesn't exist.`
};
