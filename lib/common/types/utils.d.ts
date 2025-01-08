import { APIActionRowComponent, APIEmbed, APIInteractionResponseCallbackData, APIMessageActionRowComponent, GatewayPresenceClientStatus, InteractionResponseType, PermissionFlagsBits, RESTPostAPIChannelMessageJSONBody } from "discord-api-types/v10";
import { MessagePayloadFileData } from "../interfaces/message/MessagePayload";
import { GatewayActivityPayload, PresenceStatus } from "./Presences";
export type PermissionStrings = (keyof typeof PermissionFlagsBits)[];
export type Nullable<T> = T | null | undefined;
export type ProbablyPromise<T> = Promise<T> | T;
export interface ResolverProps {
    embeds?: APIEmbed[];
    components?: APIActionRowComponent<APIMessageActionRowComponent>[];
    files?: MessagePayloadFileData[];
}
export type ComponentInteractionMessageUpdate = Omit<APIInteractionResponseCallbackData, "thread_name" | "applied_tags"> & ResolverProps & {
    fetchResponse?: boolean;
};
export type MessageBodyRequest = RESTPostAPIChannelMessageJSONBody & ResolverProps;
export type MessageUpdateBodyRequest = Omit<RESTPostAPIChannelMessageJSONBody, "nonce" | "enforce_nonce" | "allowed_mentions" | "message_reference"> & ResolverProps;
export type InteractionBodyRequest = ComponentInteractionMessageUpdate & {
    type?: InteractionResponseType;
    ephemeral?: boolean;
};
export interface PresenceData {
    status?: PresenceStatus;
    activities: GatewayActivityPayload[];
    platforms: GatewayPresenceClientStatus;
}
export type Badge = "Discord Employee" | "Discord Partner" | "HypeSquad Events" | "Bug Hunter Level 1" | "HypeSquad Bravery" | "HypeSquad Brilliance" | "HypeSquad Balance" | "Early Nitro Supporter" | "Team User" | "Bug Hunter Level 2" | "Verified Bot" | "Early Verified Bot Developer" | "Moderator Programs Alumni" | "Bot with HTTP Interactions" | "Active Developer" | "Nitro Basic" | "Nitro" | "Pomelo";
export declare const BadgesBitfieldValues: Record<number, Badge>;
