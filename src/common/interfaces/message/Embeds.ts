export interface MessageEmbedPayloadFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
  }
  
  export interface MessageEmbedPayloadAuthor {
    name: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
  }
  
  export interface MessageEmbedPayloadImage {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  }
  
  export interface MessageEmbedPayloadThumbnail {
    url: string;
    proxy_url?: string;
    height?: number;
    width?: number;
  }
  
  export interface MessageEmbedPayloadField {
    name: string;
    value: string;
    inline?: boolean;
  }
  
  export interface MessageEmbedPayload {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: Date;
    color?: number;
    footer?: MessageEmbedPayloadFooter;
    image?: MessageEmbedPayloadImage;
    thumbnail?: MessageEmbedPayloadThumbnail;
    author?: MessageEmbedPayloadAuthor;
    fields: MessageEmbedPayloadField[]
  }