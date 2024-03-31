import { type Client } from "../../client/Client";
import { Member } from "../Member";
import { Message } from "../Message";

export abstract class Event {
  constructor(public client: Client) {
    this.client = client;
  }

  abstract handle(data: unknown): ProbablyPromise;

  getMessage(data: any) {
    const message = new Message(data, this.client);

    message?.channel?.messages?.cache?.set(data.id, message);

    if (data.member && !message?.guild?.members.cache.get(data.author.id)) {
      message?.guild?.members?.cache.set(
        data.author.id,
        new Member(
          { ...data.member, id: data.author.id },
          message.guild,
          this.client
        )
      );
    }
  }
}
