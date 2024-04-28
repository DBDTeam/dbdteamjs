import { GatewayGuildMemberRemoveDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class GuildMemberRemove extends Event<GatewayGuildMemberRemoveDispatchData> {
    handle(data: GatewayGuildMemberRemoveDispatchData, shard: Shard): void;
}
