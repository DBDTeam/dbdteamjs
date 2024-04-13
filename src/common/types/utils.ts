import {
  APIActionRowComponent,
  APIAttachment,
  APIEmbed,
  APIInteractionResponseCallbackData,
  APIMessageActionRowComponent,
  PermissionFlagsBits,
  RESTPostAPIChannelMessageJSONBody,
} from "discord-api-types/v10";

export type PermissionStrings = (keyof typeof PermissionFlagsBits)[];

export type Nullable<T> = T | null | undefined;

export type ProbablyPromise<T> = Promise<T> | T;

// ! IDK where to put these types :3
export interface ResolverProps {
  embeds?: APIEmbed[];
  components?: APIActionRowComponent<APIMessageActionRowComponent>[];
  files?: APIAttachment[];
}

export type ComponentInteractionMessageUpdate =
  APIInteractionResponseCallbackData & ResolverProps & { fetchReply: boolean };

export type MessageBodyRequest = RESTPostAPIChannelMessageJSONBody &
  ResolverProps;
