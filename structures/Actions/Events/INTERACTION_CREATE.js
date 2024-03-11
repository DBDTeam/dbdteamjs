const { interactionType } = require("../../../Utils/utils")

module.exports = async(client, d, id) => {
    const Interaction = interactionType(d, client)
    client.emit("interactionCreate", Interaction)
}