import { Client } from "../client/Client";
import { Base } from "../structures/Base";
import { Channel } from "../structures/BaseChannel";
import { ButtonInteraction } from "../structures/Interactions/ButtonInteraction";
import { InteractionModal } from "../structures/Interactions/InteractionModal";
import { MessageInteraction } from "../structures/Interactions/MessageInteraction";
import { SelectMenuInteraction } from "../structures/Interactions/SelectMenuInteraction";
import { SlashInteraction } from "../structures/Interactions/SlashInteraction";
import { UserInteraction } from "../structures/Interactions/UserInteraction";
import { Nullable, SnowflakeInformation } from "../common";
export declare class Utilities {
    static buildUrl(baseUrl: string, target?: string, options?: {
        [key: string]: any;
    }): string;
    static getId(t: string): string;
    static typeChannel(channelData: any, client: Client): Channel;
    static interactionType(data: any, client: any): Promise<SlashInteraction | UserInteraction | SelectMenuInteraction | ButtonInteraction | InteractionModal | MessageInteraction | undefined>;
    static setObj<T>(baseObj: Record<any, any>, actualObj: T, mappings?: {}, includeUndefined?: boolean): T;
    static getKeyByValue(object: object, value: any): string | null;
    static getAllStamps(c: Base | Date): Nullable<SnowflakeInformation>;
}
