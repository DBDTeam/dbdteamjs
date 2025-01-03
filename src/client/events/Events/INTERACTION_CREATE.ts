import { GatewayIntegrationCreateDispatchData } from "discord-api-types/v10";
import { Shard } from "../../../structures";
import { Event } from "../Event";
import { EventNames } from "../../../common";
import { Utilities } from "../../../utils/utils";

export default class InteractionCreate extends Event<GatewayIntegrationCreateDispatchData> {
  async handle(data: GatewayIntegrationCreateDispatchData, shard: Shard) {
    const Interaction = await Utilities.interactionType(data, this.client);

    if (Interaction) {
      if ("_____patch" in Interaction) {
        //@ts-ignore
        await Interaction._____patch();
      }

      this.client.emit(EventNames.InteractionCreate, Interaction, shard);
    }
  }
}
