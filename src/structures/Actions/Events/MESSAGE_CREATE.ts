import { GatewayMessageCreateDispatchData } from "discord-api-types/v10";

import { Event, EventNames } from "../Event";

export default class MessageCreate extends Event {
  handle(data: GatewayMessageCreateDispatchData) {
    const client = this.client;
    const message = this.getMessage(data)

    client.emit(EventNames.MessageCreate, message);

    return { message };
  }
}
