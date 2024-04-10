import { ProbablyPromise } from "../../interfaces/other";
import { Member } from "../../structures/Member";
import { Message } from "../../structures/Message";
import { Shard } from "../../structures/Sharding";
import { User } from "../../structures/User";
import { typeChannel } from "../../utils/utils";
import { type Client } from "../Client";

export abstract class Event<T> {
  constructor(public client: Client) {
    this.client = client;
  }

  abstract handle(data: T, shard: Shard): ProbablyPromise<unknown>;

  getMessage(data: any) {
    const message = new Message(data, this.client);

    if (message.channel && "messages" in message.channel) {
      message?.channel?.messages?.cache?.set(data.id, message);
    }

    if (
      message.guild &&
      data.member &&
      !message.guild?.members?.cache.get(data.author.id)
    ) {
      const member = new Member(
        { ...data.member, id: data.author.id },
        message.guild,
        this.client
      );
      message?.guild?.members?.cache.set(data.author.id, member);

      this.client.users.cache.set(data.author.id, member.user);
    }

    return message;
  }

  getChannel(data: any) {
    const channel = typeChannel(data, this.client);

    channel.guild?.channels?.cache?.set(channel.id, channel);

    this.client?.channels?.cache?.set(channel.id, channel);

    return channel;
  }

  getUser(data: any) {
    const user = new User(data, this.client);

    this.client?.users?.cache?.set(user.id, user);

    return user;
  }
}
