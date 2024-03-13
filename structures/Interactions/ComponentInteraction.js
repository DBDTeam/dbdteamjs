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

                for (var i in channels) {
                    const channel = channels[i]
                    var f = this.#data.data.values.find(x => x === channel.id)
                    if(f) {
                        this.resolved.push(this.guild.channels.cache.get(f))
                    }
                }
            } else if(this.#data.data.resolved.roles) {
                const roles = Object.values(this.#data.data.resolved.roles)

                for (var i in roles) {
                    const role = roles[i]
                    var f = this.#data.data.values.find(x => x === role.id)
                    if(f) {
                        this.resolved.push(this.guild.roles.cache.get(f))
                    }
                }
            } else if(this.#data.data.resolved.users) {
                const members = Object.values(this.#data.data.resolved.members)
                const users = Object.values(this.#data.data.resolved.users)

                for (var i in members) {
                    const user = users[i], member = members[i]
                    var f = this.#data.data.values.find(x => x === user.id)
                    if(f) {
                        this.resolved.push(this.guild.members.cache.get(f) || new Member({...member, user, id: user.id}, this.guild, this.client))
                    }
                }
            }
        }
    }
}

module.exports = { ComponentInteraction }