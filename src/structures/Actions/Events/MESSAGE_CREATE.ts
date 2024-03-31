import { GatewayMessageCreateDispatchData } from "discord-api-types/v10";

import { Member } from "../../Member.js";
import { Message } from "../../Message.js";

import { Event } from "../Event";

export default class MessageCreate extends Event {
  handle(data: GatewayMessageCreateDispatchData) {
    const client = this.client;
    const message = new Message(data, client);

    message?.channel?.messages?.cache?.set(data.id, message);

    if (data.member && !message?.guild?.members.cache.get(data.author.id)) {
      message?.guild?.members?.cache.set(
        data.author.id,
        new Member(
          { ...data.member, id: data.author.id },
          message.guild,
          client
        )
      );
    }

    client.emit("messageCreate", message);

    return { message };
  }
}
