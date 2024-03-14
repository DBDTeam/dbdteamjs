const { interactionType } = require("../../../Utils/utils")

module.exports = async(client, d, id) => {
    const Interaction = await interactionType(d, client)
    try{
        await Interaction._patch()
    } catch(err) { }
    client.emit("interactionCreate", Interaction, id)
}