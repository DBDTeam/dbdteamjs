const DiscordIntents = require("../../Types/Intents").DiscordIntents

class IntentBitFields {
    /**
     * Use this to put your Intents in your bot
     */
    #Intents = DiscordIntents
    #intent;
    #iced = false;
    /**
     * Add your intents.
     * @example
     * const Intents = new IntentBitFields("Guilds", "GuildMembers", "GuildMessages", "GuildMessageContent")
     * Intents.add("GuildPresences")
     * Intents.freeze() // This freezes the intents
     * Intents.add("GuildBans") // This wouldn't be added
     * @param  {...DiscordIntents} intents 
     */
    constructor(...intents) {
        this.intents = 0;
        this.#intent = intents

        for(var i of this.#intent){
            if(this.#Intents.hasOwnProperty(i)){
                if((this.intents & this.#Intents[i]) === this.#Intents[i]) continue;
                this.intents |= this.#Intents[i]
            }
        }
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

module.exports = { IntentBitFields }