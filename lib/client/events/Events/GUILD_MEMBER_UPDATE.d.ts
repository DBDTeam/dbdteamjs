import { GatewayGuildMemberUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildMemberUpdate extends Event<GatewayGuildMemberUpdateDispatchData> {
    handle(data: GatewayGuildMemberUpdateDispatchData, shard: Shard): void;
}
