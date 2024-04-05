import { GatewayMessageCreateDispatchData } from "discord-api-types/v10";

import { Event } from "../Event";
import { EventNames } from "../../../interfaces/client/Events";

export default class MessageCreate extends Event {
  handle(data: GatewayMessageCreateDispatchData) {
    const client = this.client;
    const message = this.getMessage(data)

    client.emit(EventNames.MessageCreate, message);

    return { message };
  }
}
