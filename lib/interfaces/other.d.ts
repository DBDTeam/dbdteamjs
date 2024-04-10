import { APIActionRowComponent, APIAttachment, APIEmbed, APIInteractionResponseCallbackData, APIMessageActionRowComponent, RESTPostAPIChannelMessageJSONBody } from "discord-api-types/v10";
export type Nullded = null | undefined;
export type Nullable<T> = T | null | undefined;
export type ProbablyPromise<T> = PromiseLike<T> | T;
export interface ResolverProps {
    embeds?: APIEmbed[];
    components?: APIActionRowComponent<APIMessageActionRowComponent>[];
    files?: APIAttachment[];
}
export type ComponentInteractionMessageUpdate = APIInteractionResponseCallbackData & ResolverProps;
export type MessageBodyRequest = RESTPostAPIChannelMessageJSONBody & ResolverProps;
