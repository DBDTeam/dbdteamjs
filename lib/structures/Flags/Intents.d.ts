import { Intents } from "../../interfaces/client/Intents";
export declare class IntentsBitFields {
    intents: number;
    private iced;
    constructor(...intents: Intents[]);
    add(intent: Intents): void;
    remove(intent: Intents): void;
    has(intent: Intents): boolean;
    freeze(): void;
}
