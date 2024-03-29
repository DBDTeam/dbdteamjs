const { User } = require("../User");
const { PermissionsBitField } = require("../../types/PermissionsBitFields")
const Endpoints = require("../../rest/Endpoints");
const { Member } = require("../Member");

class ChannelPermissionManager {
    #Perms;
    #client;
    #type;
    #target;
    constructor(overwrites, target, client) {
        this.#client = client
        this.#target = target
        this.#Perms = PermissionsBitField.Channels;
        this.overwrites = overwrites
    }

    async edit(userObj, permsObj, reason = null) {
        let addedPerms = 0;
        let removedPerms = 0;
    
        const obj = getType(userObj == "everyone" ? this.#target.guildId : userObj, this.#target);
    
        for (const allowPerm of permsObj.allow) {
            if (this.#Perms.hasOwnProperty(allowPerm) && !(permsObj.deny.includes(allowPerm))) {
                addedPerms |= this.#Perms[allowPerm];
            }
        }
    
        for (const denyPerm of permsObj.deny) {
            if (this.#Perms.hasOwnProperty(denyPerm) && !(permsObj.allow.includes(denyPerm))) {
                removedPerms |= this.#Perms[denyPerm];
            }
        }
        const data = {
            allow: addedPerms,
            deny: removedPerms,
            id: obj.targetId,
            type: obj.type
        };
    
        var response = await this.#client.rest.request("PUT", Endpoints.ChannelPermissions(obj.id, obj.targetId), true, { data }, reason);

        return {...response, allow: addedPerms, deny: removedPerms}
    }    

    async add(userObj, permsObj, reason = null) {
        let addedPerms = 0;
    
        const obj = getType(userObj == "everyone" ? this.#target.guildId : userObj, this.#target);
    
        for (const allowPerm of permsObj.allow) {
            if (this.#Perms.hasOwnProperty(allowPerm) && !(permsObj.deny.includes(allowPerm))) {
                addedPerms |= this.#Perms[allowPerm];
            }
        }
    
        const data = {
            allow: addedPerms,
            id: obj.targetId,
            type: obj.type
        };

        var response = await this.#client.rest.request("PUT", Endpoints.ChannelPermissions(obj.id, obj.targetId), true, { data }, reason);

        return {...response, allow: addedPerms}
    }
    
    async remove(userObj, permsObj, reason = null) {
        let removedPerms = 0;
    
        const obj = getType(userObj == "everyone" ? this.#target.guildId : userObj, this.#target);
    
        for (const denyPerm of permsObj.deny) {
            if (this.#Perms.hasOwnProperty(denyPerm) && !(permsObj.allow.includes(denyPerm))) {
                removedPerms |= this.#Perms[denyPerm];
            }
        }
        const data = {
            deny: removedPerms,
            id: obj.targetId,
            type: obj.type
        };
    
        var response = await this.#client.rest.request("PUT", Endpoints.ChannelPermissions(obj.id, obj.targetId), true, { data }, reason);

        return {...response, allow: removedPerms}
    } 
}

function getType(obj, channel) {
    var isUser = obj instanceof User || obj instanceof Member

    return isUser ? {
        type: 1,
        id: channel.id,
        targetId: obj.id || obj.user.id
    } : {
        type: 0,
        id: channel.id,
        targetId: obj.id
    }
}

module.exports = { ChannelPermissionManager }