import { Intents } from "../../interfaces/client/Intents";

export class IntentsBitFields {
    public intents: number;
    private iced: boolean;
    
    constructor(...intents: Intents[]) {
        this.intents = 0;

        for (const intent of intents) {
            if (this.intents & intent) continue;
            this.intents |= intent;
        }

        this.iced = false;
    }

    add(intent: Intents) {
        if (this.iced) return;
        if ((this.intents & intent) === intent) return;

        this.intents |= intent;
    }

    remove(intent: Intents) {
        if (this.iced) return;
        if ((this.intents & intent) === 0) return;

        this.intents &= ~intent;
    }

    has(intent: Intents) {
        return (this.intents & intent) !== 0;
    }

    freeze() {
        this.iced = true;
    }
}