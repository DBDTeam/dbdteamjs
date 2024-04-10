import { GatewayMessageCreateDispatchData } from "discord-api-types/v10";

import { EventNames } from "../../../interfaces/client/Events";
import { Event } from "../Event";

export default class MessageCreate extends Event<GatewayMessageCreateDispatchData> {
  handle(data: GatewayMessageCreateDispatchData) {
    const client = this.client;
    const message = this.getMessage(data);

    client.emit(EventNames.MessageCreate, message);

    return { message };
  }
}
