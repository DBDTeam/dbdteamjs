const { interactionType } = require("../../../utils/utils");

module.exports = async (client, d, id) => {
  const Interaction = await interactionType(d, client);

  if (Interaction.isSelectMenu || Interaction.isUser) {
    await Interaction.__patch();
  }

  client.emit("interactionCreate", Interaction, id);
};
