import { MessageFlags } from "discord-api-types/v10";
import { MessageEmbedPayload } from "./Embeds";
import { MessagePayloadComponentData, MessagePayloadFileData, MessagePayloadMentionData } from "./MessagePayload";

export interface MessageEditPayload {
    content?: string;
    embeds?: MessageEmbedPayload;
    mentions?: MessagePayloadMentionData;
    flags?: MessageFlags;
    components?: MessagePayloadComponentData[];
    files?: MessagePayloadFileData[];
  }