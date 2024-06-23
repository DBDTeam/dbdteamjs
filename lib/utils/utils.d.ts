import { type Client } from "../client/Client";
import { Base } from "../structures/Base";
import { Channel } from "../structures/BaseChannel";
import { ButtonInteraction } from "../structures/Interactions/ButtonInteraction";
import { InteractionModal } from "../structures/Interactions/InteractionModal";
import { MessageInteraction } from "../structures/Interactions/MessageInteraction";
import { SelectMenuInteraction } from "../structures/Interactions/SelectMenuInteraction";
import { SlashInteraction } from "../structures/Interactions/SlashInteraction";
import { UserInteraction } from "../structures/Interactions/UserInteraction";
import { Nullable } from "../common";
export declare const getId: (t: string) => string;
export declare function typeChannel(channelData: any, client: Client): Channel;
export declare function interactionType(data: any, client: any): Promise<SlashInteraction | UserInteraction | ButtonInteraction | InteractionModal | MessageInteraction | SelectMenuInteraction | undefined>;
export declare function setObj<T>(baseObj: Record<any, any>, actualObj: T, mappings?: {}, includeUndefined?: boolean): T;
export declare function getKeyByValue(object: object, value: any): string | null;
export interface SnowflakeInformation {
    stamp: number;
    unix: number;
    date: Date;
}
export declare function getAllStamps(c: Base | Date): Nullable<SnowflakeInformation>;
