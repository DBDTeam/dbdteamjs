const { User } = require("../User");
const { Member } = require("../Member")
const { ComponentTypes } = require("../../Types/Interactions");
const { Message } = require("../Message");
const { InteractionBase } = require("./BaseInteraction");
const { Collection } = require("../../Utils/Collection");

class ComponentInteraction extends InteractionBase {
    #data;
    constructor(data, client) {
        super(data, client)
        this.customId = data.data.custom_id
        this.componentType = data.data.component_type
        this.#data = data
        this._patch()
    }
    get isButton() {
        return this.componentType == ComponentTypes.Button
    }
    get isSelectMenu() {
        return [ComponentTypes.String, ComponentTypes.User, ComponentTypes.Role, ComponentTypes.Mentionable, ComponentTypes.Channel].includes(this.componentType)
    }
    _patch() {
        if(this.componentType == ComponentTypes.Button){
            this._addButtonInfo()
        } else if([ComponentTypes.String, ComponentTypes.User, ComponentTypes.Role, ComponentTypes.Mentionable, ComponentTypes.Channel].includes(this.componentType)){
            this._addMenuInfo()
        }
    }
    _addButtonInfo() {
        this.message = new Message(this.#data.message, this.client)
        this.member = new Member({ ...this.#data.member, id: this.#data.member.user.id }, this.guild, this.client)
        this.user = new User(this.#data.member.user, this.client)
    }
    
    _addMenuInfo() {
        this.message = new Message(this.#data.message, this.client)
        this.member = new Member({ ...this.#data.member, id: this.#data.member.user.id }, this.guild, this.client)
        this.user = new User(this.#data.member.user, this.client)
        this.values = []
        for(var i of this.#data.data.values){
            this.values.push(i)
        }
        if([ComponentTypes.User, ComponentTypes.Role, ComponentTypes.Mentionable, ComponentTypes.Channel].includes(this.componentType)){
            this.resolved = []
            if(this.#data.data.resolved.channels){
                const channels = Object.values(this.#data.data.resolved.channels)

                for (var i of channels) {
                    var f = this.#data.data.values.find(i.id)
                    if(f) {
                        this.resolved.push(this.guild.channels.cache.get(f.id) || f)
                    }
                }
            } else if(this.#data.data.resolved.roles) {
                const roles = Object.values(this.#data.data.resolved.roles)

                for (var i of roles) {
                    var f = this.#data.data.values.find(i.id)
                    if(f) {
                        this.resolved.push(this.guild.roles.cache.get(f.id) || f)
                    }
                }
            } else if(this.#data.data.resolved.users) {
                const members = Object.values(this.#data.data.resolved.members)

                for (var i of members) {
                    var f = this.#data.data.values.find(i.user.id)
                    if(f) {
                        this.resolved.push(this.guild.members.cache.get(f.user.id) || f)
                    }
                }
            }
        }
    }
}

module.exports = { ComponentInteraction }