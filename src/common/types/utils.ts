import {
  APIActionRowComponent,
  APIEmbed,
  APIInteractionResponseCallbackData,
  APIMessageActionRowComponent,
  GatewayPresenceClientStatus,
  InteractionResponseType,
  PermissionFlagsBits,
  RESTPostAPIChannelMessageJSONBody,
} from "discord-api-types/v10";
import { MessagePayloadFileData } from "../interfaces/message/MessagePayload";
import { GatewayActivityPayload, PresenceStatus } from "./Presences";

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
  ephemeral?: boolean
};

export interface PresenceData {
  status?: PresenceStatus;
  activities: GatewayActivityPayload[];
  platforms: GatewayPresenceClientStatus;
}

export type Badge =
  | "Discord Employee"
  | "Discord Partner"
  | "HypeSquad Events"
  | "Bug Hunter Level 1"
  | "HypeSquad Bravery"
  | "HypeSquad Brilliance"
  | "HypeSquad Balance"
  | "Early Nitro Supporter"
  | "Team User"
  | "Bug Hunter Level 2"
  | "Verified Bot"
  | "Early Verified Bot Developer"
  | "Moderator Programs Alumni"
  | "Bot with HTTP Interactions"
  | "Active Developer"
  | "Nitro Basic"
  | "Nitro"
  | "Pomelo";

export const BadgesBitfieldValues: Record<number, Badge> = {
  1: "Discord Employee",
  2: "Discord Partner",
  4: "HypeSquad Events",
  8: "Bug Hunter Level 1",
  64: "HypeSquad Bravery",
  128: "HypeSquad Brilliance",
  256: "HypeSquad Balance",
  512: "Early Nitro Supporter",
  1024: "Team User",
  16384: "Bug Hunter Level 2",
  65536: "Verified Bot",
  131072: "Early Verified Bot Developer",
  262144: "Moderator Programs Alumni",
  524288: "Bot with HTTP Interactions",
  4194304: "Active Developer",
};