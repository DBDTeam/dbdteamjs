import { GatewayGuildMembersChunkDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildMemberChunk extends Event<GatewayGuildMembersChunkDispatchData> {
    handle(data: GatewayGuildMembersChunkDispatchData, shard: Shard): void;
}
