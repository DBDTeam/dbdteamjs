import { Intents } from "../../common";
export declare class IntentsBitFields {
    #private;
    /**
     * The bitwise value of all intents added.
     */
    intents: number;
    /**
     * The intents that will be added to the Client.
     * @param {Intents[]} intents
     */
    constructor(...intents: Intents[]);
    /**
     * Add intents to the property 'intents' of the class.
     * @param {...Intents} intents - The intents bitwise values.
     * @returns {IntentsBitFields}
     */
    add(...intents: Intents[]): this | undefined;
    /**
     * Remove intents to the property 'intents' of the class.
     * @param {...Intents} intents - The intents bitwise values.
     * @returns {IntentsBitFields}
     */
    remove(...intents: Intents[]): this | undefined;
    /**
     * Check if any of the bitwise values exists in the property 'intents'.
     * @param {...Intents} intents - The intents bitwise values.
     * @returns {boolean}
     */
    hasAny(...intents: Intents[]): boolean;
    /**
     * Check if all of the bitwise values exists in the property 'intents'.
     * @param {...Intents} intents - The intents bitwise values.
     * @returns {boolean}
     */
    has(...intents: Intents[]): boolean;
    /**
     * Freezes the current class, so, you can't add or remove any intent.
     * @returns {IntentsBitFields}
     */
    freeze(): this;
}
