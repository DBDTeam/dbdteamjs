import { type Client } from "../../client/Client";
import { typeChannel } from "../../utils/utils";
import { Member } from "../Member";
import { Message } from "../Message";
import { User } from "../User";

export enum EventNames {
  "MessageCreate" = "messageCreate",
  "InteractionCreate" = "interactionCreate"
}

export abstract class Event {
  constructor(public client: Client) {
    this.client = client;
  }

  abstract handle(data: unknown): ProbablyPromise;

  getMessage(data: any) {
    const message = new Message(data, this.client);

    message?.channel?.messages?.cache?.set(data.id, message);

    if (data.member && !message?.guild?.members.cache.get(data.author.id)) {
      const member = new Member(
        { ...data.member, id: data.author.id },
        message.guild,
        this.client
      )
      message?.guild?.members?.cache.set(
        data.author.id,
        member
      );

      this.client.users.cache.set(data.author.id, member.user)
    }

    return message
  }

  getChannel(data: any) {
    const channel = typeChannel(data, this.client)

    channel.guild?.channels?.cache?.set(channel.id, channel)

    this.client?.channels?.cache?.set(channel.id, channel)

    return channel
  }

  getUser(data: any) {
    const user = new User(data, this.client)

    this.client?.users?.cache?.set(user.id, user)

    return user
  }
}
