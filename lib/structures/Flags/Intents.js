"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentsBitFields = exports.Intents = void 0;
var Intents;
(function (Intents) {
    Intents[Intents["Guilds"] = 1] = "Guilds";
    Intents[Intents["GuildMembers"] = 2] = "GuildMembers";
    Intents[Intents["GuildModeration"] = 4] = "GuildModeration";
    Intents[Intents["GuildEmojisAndStickers"] = 8] = "GuildEmojisAndStickers";
    Intents[Intents["GuildIntegrations"] = 16] = "GuildIntegrations";
    Intents[Intents["GuildWebhooks"] = 32] = "GuildWebhooks";
    Intents[Intents["GuildInvites"] = 64] = "GuildInvites";
    Intents[Intents["GuildVoiceStates"] = 128] = "GuildVoiceStates";
    Intents[Intents["GuildPresences"] = 256] = "GuildPresences";
    Intents[Intents["GuildMessages"] = 512] = "GuildMessages";
    Intents[Intents["GuildMessageReactions"] = 1024] = "GuildMessageReactions";
    Intents[Intents["GuildMessageTyping"] = 2048] = "GuildMessageTyping";
    Intents[Intents["DirectMessages"] = 4096] = "DirectMessages";
    Intents[Intents["DirectMessagesReactions"] = 8192] = "DirectMessagesReactions";
    Intents[Intents["DirectMessageTyping"] = 16384] = "DirectMessageTyping";
    Intents[Intents["MessageContent"] = 32768] = "MessageContent";
    Intents[Intents["GuildScheduledEvents"] = 65536] = "GuildScheduledEvents";
    Intents[Intents["AutoModerationConfiguration"] = 1048576] = "AutoModerationConfiguration";
    Intents[Intents["AutoModerationExecution"] = 2097152] = "AutoModerationExecution";
})(Intents || (exports.Intents = Intents = {}));
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
