import { APIActionRowComponent, APIAttachment, APIEmbed, APIInteractionResponseCallbackData, APIMessageActionRowComponent, InteractionResponseType, PermissionFlagsBits, RESTPostAPIChannelMessageJSONBody } from "discord-api-types/v10";
export type PermissionStrings = (keyof typeof PermissionFlagsBits)[];
export type Nullable<T> = T | null | undefined;
export type ProbablyPromise<T> = Promise<T> | T;
export interface ResolverProps {
    embeds?: APIEmbed[];
    components?: APIActionRowComponent<APIMessageActionRowComponent>[];
    files?: APIAttachment[];
}
export type ComponentInteractionMessageUpdate = Omit<APIInteractionResponseCallbackData, "thread_name" | "applied_tags"> & ResolverProps & {
    fetchResponse?: boolean;
};
export type MessageBodyRequest = RESTPostAPIChannelMessageJSONBody & ResolverProps;
export type InteractionBodyRequest = ComponentInteractionMessageUpdate & {
    type?: InteractionResponseType;
};
