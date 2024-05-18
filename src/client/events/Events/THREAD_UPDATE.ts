import { GatewayThreadUpdateDispatch } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard, ThreadChannel } from "../../../structures";
import { EventNames } from "../../../common";

export default class ThreadUpdate extends Event<GatewayThreadUpdateDispatch> {
  handle(data: any, shard: Shard) {
    const oldThread = this.client.channels.cache.get(data.id) as ThreadChannel;
    const newThread = this.getChannel(data) as ThreadChannel;

    if ("guild" in newThread) {
      newThread.guild?.channels.cache.set(newThread.id, newThread);
    }
    this.client.channels.cache.set(newThread.id, newThread);

    this.client.emit(EventNames.ThreadUpdate, oldThread, newThread, shard);
  }
}
