/// <reference types="node" />
import { AllowedMentionsTypes, MessageFlags, RESTAPIPollCreate } from "discord-api-types/v10";
import { MessageEmbedPayload } from "./Embeds";
export interface MessagePayloadMentionData {
    parse: AllowedMentionsTypes;
    users: string[];
    roles: string[];
    messageReferenceId?: string | null;
}
export interface MessagePayloadFileData {
    name: string;
    description: string;
    url: string | Buffer;
}
export interface MessagePayloadComponentData {
    type: number;
    components: Record<string, any>[];
}
export interface MessagePayloadReplyData {
    mention?: boolean;
    error?: boolean;
    id: string;
}
export interface PollData extends RESTAPIPollCreate {
    multiselect: boolean;
}
export interface MessagePayloadData {
    content?: string;
    nonce?: string | number;
    tts?: boolean;
    embeds?: MessageEmbedPayload[];
    mentions?: MessagePayloadMentionData;
    reply?: MessagePayloadReplyData;
    flags?: MessageFlags;
    components?: MessagePayloadComponentData[];
    files?: MessagePayloadFileData[];
    poll?: PollData;
}
