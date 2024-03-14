const { interactionType } = require("../../../Utils/utils")

module.exports = async(client, d, id) => {
    const Interaction = await interactionType(d, client)
    
    if(Interaction.isSelectMenu){
        await Interaction.__patch()
    }

    client.emit("interactionCreate", Interaction, id)
}