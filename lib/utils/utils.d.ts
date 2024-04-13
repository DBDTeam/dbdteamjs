import { type Client } from "../client/Client";
import { Base } from "../structures/Base";
import { Channel } from "../structures/BaseChannel";
import { CategoryChannel } from "../structures/CategoryChannel";
import { TextChannel } from "../structures/TextChannel";
import { ThreadChannel } from "../structures/ThreadChannel";
import { VoiceChannel } from "../structures/VoiceChannel";
export declare const getId: (t: string) => string;
export declare function typeChannel(channelData: any, client: Client): TextChannel | VoiceChannel | CategoryChannel | ThreadChannel | Channel;
export declare function interactionType(data: any, client: any): Promise<{
    client: any;
    data: any;
}>;
export declare function setObj<T>(baseObj: Record<any, any>, actualObj: T, mappings?: {}, includeUndefined?: boolean): T;
export declare function getKeyByValue(object: object, value: any): string | null;
export declare function getAllStamps(c: Base): {
    stamp: number;
    unix: number;
    date: Date;
} | null;
