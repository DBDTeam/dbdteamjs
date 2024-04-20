import { GatewayIntegrationCreateDispatchData } from "discord-api-types/v10";
import { Shard } from "../../../structures";
import { interactionType } from "../../../utils/utils";
import { Event } from "../Event";

export default class InteractionCreate extends Event<GatewayIntegrationCreateDispatchData> {
  async handle(data: GatewayIntegrationCreateDispatchData, shard: Shard) {
    const Interaction = await interactionType(data, this.client);

    if (Interaction) {
      if ("patch" in Interaction) {
        //@ts-ignore
        await Interaction.patch();
      }
      this.client.emit("interactionCreate", Interaction, shard);
    }
  }
}
