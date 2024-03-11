const { Guild } = require("../../Guild")
const { typeChannel } = require("../../../Utils/utils.js")
const { ChannelTypes } = require("../../../Types/ChannelTypes.js")
const { Member } = require("../../Member.js")
const { User } = require("../../User.js")
module.exports = async(client, d) => {
    const g = new Guild(d, client)

    if(!client.guilds.cache.get(d.id)){
        client.guilds.cache.set(d.id, g)
    }

    for(var i of d.channels){
        i.guild = g
        var state = g.voiceStates?.toJSON()

        state = state.find(x => x.channel_id == i.id)

        if(state){
            i.session_id = state.session_id
        }

        ch = typeChannel(i, client)

        client.guilds.cache.get(d.id).channels.cache.set(i.id, ch)
        client.channels.cache.set(i.id, ch)
    }
    
    for(var i of d.threads){
        i.guild = g
        
        ch = typeChannel(i, client)

        client.guilds.cache.get(d.id).channels.cache.set(i.id, ch)
        client.channels.cache.set(i.id, ch)
    }

    for(var i of d.members){
        var memb = new Member({...i, id: i.user.id}, client.guilds.cache.get(d.id), client)
        var user = new User(i.user, client)

        client.guilds.cache.get(d.id).members.cache.set(memb.id, memb)
        client.users.cache.set(user.id, user)
    }

    const stamp = Date.parse(d.joined_at)
    
    if(stamp > Date.now()-2000){
        client.emit("guildCreate", g)
    }
}