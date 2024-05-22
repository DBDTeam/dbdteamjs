import { GatewayThreadMemberUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard, ThreadChannel } from "../../../structures";
import { ThreadMember } from "../../../structures/ThreadMember";
import { EventNames } from "../../../common";

export default class ThreadMemberUpdate extends Event<GatewayThreadMemberUpdateDispatchData> {
    handle(data: GatewayThreadMemberUpdateDispatchData, shard: Shard) {
        let threadChannel = this.client.channels.cache.get(data.id as string) as ThreadChannel

        if(!threadChannel || !data.member) return;

        let threadMember = new ThreadMember(data, threadChannel.guild, this.client)

        threadChannel.members.cache.set(threadMember.id, threadMember)

        this.client.emit(EventNames.ThreadMemberUpdate, threadChannel, threadMember, shard)
    }
}