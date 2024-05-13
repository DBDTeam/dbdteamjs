import { GatewayMessageCreateDispatchData } from "discord-api-types/v10";

import { Shard } from "../../../structures/Sharding";
import { Event } from "../Event";

export default class MessageCreate extends Event<GatewayMessageCreateDispatchData> {
  async handle(data: GatewayMessageCreateDispatchData, shard: Shard) {
    const client = this.client;
    const message = await this.getMessage(data);

    client.emit("messageCreate", message, shard);

    return { message };
  }
}
