class IntentsBitFields {
    #Intents = {
        "Guilds": 1 << 0,
        "GuildMembers": 1 << 1,
        "GuildModeration": 1 << 2,
        "GuildEmojisAndStickers": 1 << 3,
        "GuildIntegrations": 1 << 4,
        "GuildWebhooks": 1 << 5,
        "GuildInvites": 1 << 6,
        "GuildVoiceStates": 1 << 7,
        "GuildPresences": 1 << 8,
        "GuildMessages": 1 << 9,
        "GuildMessageReactions": 1 << 10,
        "GuildMessageTyping": 1 << 11,
        "DirectMessages": 1 << 12,
        "DirectMessagesReactions": 1 << 13,
        "DirectMessageTyping": 1 << 14,
        "MessageContent": 1 << 15,
        "GuildScheduledEvents": 1 << 16,
        "AutoModerationConfiguration": 1 << 20,
        "AutoModerationExecution": 1 << 21,
    }
    #intent;
    #iced = false;
    constructor(...intents) {
        this.intents = 0;
        this.#intent = intents

        for(var i of this.#intent){
            if(this.#Intents.hasOwnProperty(i)){
                if((this.intents & this.#Intents[i]) === this.#Intents[i]) continue;
                this.intents |= this.#Intents[i]
            }
        };
        this.perms = undefined;
    }
    add(intentName) {
        if(this.#iced) return;
        var int = this.#Intents.hasOwnProperty(intentName) ? this.#Intents[intentName] : null

        if(!int || (this.intents & int) === int) return;

        this.intents |= this.#Intents[intentName]
        return this.perms
    }

    remove(intentName) {
        if(this.#iced) return;
        if (!this.#Intents.hasOwnProperty(intentName)) return;
    
        const intentMask = this.#Intents[intentName];
    
        if ((this.intents & intentMask) === 0) return;
    
        const invertedMask = ~intentMask;
        this.intents &= invertedMask;
        return this.perms
    }
    
    has(intentName) {
        return (this.intents & this.#Intents[intentName]) !== 0;
    }

    freeze() {
        this.#iced = true
    }
 }

module.exports = { IntentsBitFields }
