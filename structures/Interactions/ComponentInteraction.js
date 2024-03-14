const { User } = require("../User");
const { Member } = require("../Member")
const { ComponentTypes } = require("../../Types/Interactions");
const { Message } = require("../Message");
const { InteractionBase } = require("./BaseInteraction");

class ComponentInteraction extends InteractionBase {
    #data;
    constructor(data, client) {
        super(data, client);
        this.customId = data.data.custom_id;
        this.componentType = data.data.component_type;
        this.#data = data;
    }
    get isButton() {
        return this.componentType === ComponentTypes.Button;
    }
    get isSelectMenu() {
        return [ComponentTypes.String, ComponentTypes.User, ComponentTypes.Role, ComponentTypes.Mentionable, ComponentTypes.Channel].includes(this.componentType);
    }
    async _patch() {
        this.message = new Message(this.#data.message, this.client);
        const userData = this.#data.member.user;
        this.member = new Member({ ...this.#data.member, id: userData.id }, this.guild, this.client);
        this.user = new User(userData, this.client);
        if (this.isSelectMenu) {
            await this._addMenuInfo();
        }
    }
    
    async _addMenuInfo() {
        this.values = [...this.#data.data.values];
        const resolvedData = this.#data.data.resolved;
        if (resolvedData) {
            this.resolved = [];
            const resolveTypes = {
                channels: this.guild.channels,
                roles: this.guild.roles,
                users: this.guild.members
            };
            for (const [type, cache] of Object.entries(resolveTypes)) {
                const resolvedItems = resolvedData[type];
                if (resolvedItems) {
                    for (const item of Object.values(resolvedItems)) {
                        if (this.values.includes(item.id)) {
                            let x = cache.cache.get(item.id);
                            if (!x) {
                                x = await cache.fetch(item.id);
                            }
                            this.resolved.push(x);
                        }
                    }
                }
            }
        }
    }    
}

module.exports = { ComponentInteraction };