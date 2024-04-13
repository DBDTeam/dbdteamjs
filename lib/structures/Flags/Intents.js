"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentsBitFields = void 0;
class IntentsBitFields {
    intents;
    iced;
    constructor(...intents) {
        this.intents = 0;
        for (const intent of intents) {
            if (this.intents & intent)
                continue;
            this.intents |= intent;
        }
        this.iced = false;
    }
    add(intent) {
        if (this.iced)
            return;
        if ((this.intents & intent) === intent)
            return;
        this.intents |= intent;
    }
    remove(intent) {
        if (this.iced)
            return;
        if ((this.intents & intent) === 0)
            return;
        this.intents &= ~intent;
    }
    has(intent) {
        return (this.intents & intent) !== 0;
    }
    freeze() {
        this.iced = true;
    }
}
exports.IntentsBitFields = IntentsBitFields;
