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
        this._patch();
    }
    get isButton() {
        return this.componentType === ComponentTypes.Button;
    }
    get isSelectMenu() {
        return [ComponentTypes.String, ComponentTypes.User, ComponentTypes.Role, ComponentTypes.Mentionable, ComponentTypes.Channel].includes(this.componentType);
    }
    _patch() {
        this.message = new Message(this.#data.message, this.client);
        const userData = this.#data.member.user;
        this.member = new Member({ ...this.#data.member, id: userData.id }, this.guild, this.client);
        this.user = new User(userData, this.client);
        if (this.isSelectMenu) {
            this._addMenuInfo();
        }
    }
    
    _addMenuInfo() {
        this.values = [...this.#data.data.values];
        const resolvedData = this.#data.data.resolved;
        if (resolvedData) {
            this.resolved = [];
            const resolveTypes = {
                channels: this.guild.channels.cache,
                roles: this.guild.roles.cache,
                users: this.guild.members.cache
            };
            Object.entries(resolveTypes).forEach(([t, c]) => {
                const resolvedItems = resolvedData[t];
                if (resolvedItems) {
                    Object.values(resolvedItems).forEach(i => {
                        if (this.values.includes(i.id)) {
                            this.resolved.push(c.get(i.id));
                        }
                    });
                }
            });
        }
    }
}

module.exports = { ComponentInteraction };