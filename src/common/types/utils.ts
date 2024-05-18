import {
  APIActionRowComponent,
  APIAttachment,
  APIEmbed,
  APIInteractionResponseCallbackData,
  APIMessageActionRowComponent,
  GatewayPresenceClientStatus,
  InteractionResponseType,
  PermissionFlagsBits,
  RESTPostAPIChannelMessageJSONBody,
} from "discord-api-types/v10";
import { MessagePayloadFileData } from "../../interfaces/message/MessagePayload";
import { GatewayActivityPayload, PresenceStatus } from "../../types/Presences";

export type PermissionStrings = (keyof typeof PermissionFlagsBits)[];

export type Nullable<T> = T | null | undefined;

export type ProbablyPromise<T> = Promise<T> | T;

// ! IDK where to put these types :3
export interface ResolverProps {
  embeds?: APIEmbed[];
  components?: APIActionRowComponent<APIMessageActionRowComponent>[];
  files?: MessagePayloadFileData[];
}

export type ComponentInteractionMessageUpdate = Omit<
  APIInteractionResponseCallbackData,
  "thread_name" | "applied_tags"
> &
  ResolverProps & { fetchResponse?: boolean };

export type MessageBodyRequest = RESTPostAPIChannelMessageJSONBody &
  ResolverProps;

export type MessageUpdateBodyRequest = Omit<
  RESTPostAPIChannelMessageJSONBody,
  "nonce" | "enforce_nonce" | "allowed_mentions" | "message_reference"
> &
  ResolverProps;

export type InteractionBodyRequest = ComponentInteractionMessageUpdate & {
  type?: InteractionResponseType;
};

export interface PresenceData {
  status?: PresenceStatus;
  activities: GatewayActivityPayload[];
  platforms: GatewayPresenceClientStatus;
}
