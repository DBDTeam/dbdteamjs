import { ProbablyPromise } from "../../common";
import { Guild, GuildRole } from "../../structures";
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

  abstract handle(data: T, shard: Shard): ProbablyPromise<any>;

  async getMessage(data: any) {
    const message = new Message(data, this.client);
    await message.___patch()

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

  getMember(data: any, guildId: any) {
    const member = new Member(
      { ...data, id: data.user.id },
      guildId,
      this.client
    );

    if ("user" in member) {
      this.client.users.cache.set(member.id, member.user);
    }

    member.guild.members?.cache.set(member.id, member);

    return member;
  }

  getGuild(data: any) {
    const guild = new Guild(data, this.client);

    this.client.guilds.cache.set(guild.id, guild);

    return guild;
  }

  getRole(data: any, guildId: string) {
    const guild = this.client.guilds.cache.get(guildId)

    if(!guild) return;

    const role = new GuildRole(data, guild, this.client)

    guild.roles?.cache.set(role.id, role)

    return role;
  }
}
