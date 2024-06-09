"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentsBitFields = void 0;
class IntentsBitFields {
    /**
     * The bitwise value of all intents added.
     */
    intents;
    #iced;
    /**
     * The intents that will be added to the Client.
     * @param {Intents[]} intents
     */
    constructor(...intents) {
        this.intents = 0;
        for (const intent of intents) {
            if (this.intents & intent)
                continue;
            this.intents |= intent;
        }
        this.#iced = false;
    }
    /**
     * Add intents to the property 'intents' of the class.
     * @param {...Intents} intents - The intents bitwise values.
     * @returns {IntentsBitFields}
     */
    add(...intents) {
        if (this.#iced)
            return;
        for (var intent of intents) {
            if ((this.intents & intent) === intent)
                return;
            this.intents |= intent;
        }
        return this;
    }
    /**
     * Remove intents to the property 'intents' of the class.
     * @param {...Intents} intents - The intents bitwise values.
     * @returns {IntentsBitFields}
     */
    remove(...intents) {
        if (this.#iced)
            return;
        for (var intent of intents) {
            if ((this.intents & intent) === intent)
                return;
            this.intents = ~intent;
        }
        return this;
    }
    /**
     * Check if any of the bitwise values exists in the property 'intents'.
     * @param {...Intents} intents - The intents bitwise values.
     * @returns {boolean}
     */
    hasAny(...intents) {
        return intents.some((intent) => (this.intents & intent) !== 0);
    }
    /**
     * Check if all of the bitwise values exists in the property 'intents'.
     * @param {...Intents} intents - The intents bitwise values.
     * @returns {boolean}
     */
    has(...intents) {
        for (var intent of intents) {
            if ((this.intents & intent) === 0) {
                return false;
            }
        }
        return true;
    }
    /**
     * Freezes the current class, so, you can't add or remove any intent.
     * @returns {IntentsBitFields}
     */
    freeze() {
        this.#iced = true;
        return this;
    }
}
exports.IntentsBitFields = IntentsBitFields;
