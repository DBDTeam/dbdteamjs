import { APIActionRowComponent, APIEmbed, APIMessageActionRowComponent, RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10";

export interface MessagePayloadFileData {
  name: string;
  description: string;
  url: string | Buffer;
}

export interface ResolveProps {
   embeds?: APIEmbed[],
   components?: APIActionRowComponent<APIMessageActionRowComponent>[],
   files?: MessagePayloadFileData[], 
}


export type MessageCreateBodyRequest = OmitInsert<
  RESTPostAPIWebhookWithTokenJSONBody,
  'components' | 'embeds',
   ResolveProps
>