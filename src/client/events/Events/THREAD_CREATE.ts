import { GatewayThreadCreateDispatch } from "discord-api-types/v10";
import { Shard, ThreadChannel } from "../../../structures";
import { Event } from "../Event";
import { EventNames } from "../../../common";

export default class ThreadChannelCreate extends Event<GatewayThreadCreateDispatch> {
  handle(d: any, shard: Shard) {
    const threadChannel = this.getChannel(d) as ThreadChannel;

    threadChannel.guild?.channels.cache.set(threadChannel.id, threadChannel);
    this.client.channels.cache.set(threadChannel.id, threadChannel);

    this.client.emit(EventNames.ThreadCreate, threadChannel, shard);
  }
}
