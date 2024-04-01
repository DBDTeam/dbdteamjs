export enum Intents {
    Guilds = 1 << 0,
    GuildMembers = 1 << 1,
    GuildModeration = 1 << 2,
    GuildEmojisAndStickers = 1 << 3,
    GuildIntegrations = 1 << 4,
    GuildWebhooks = 1 << 5,
    GuildInvites = 1 << 6,
    GuildVoiceStates = 1 << 7,
    GuildPresences = 1 << 8,
    GuildMessages = 1 << 9,
    GuildMessageReactions = 1 << 10,
    GuildMessageTyping = 1 << 11,
    DirectMessages = 1 << 12,
    DirectMessagesReactions = 1 << 13,
    DirectMessageTyping = 1 << 14,
    MessageContent = 1 << 15,
    GuildScheduledEvents = 1 << 16,
    AutoModerationConfiguration = 1 << 20,
    AutoModerationExecution = 1 << 21,
}

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