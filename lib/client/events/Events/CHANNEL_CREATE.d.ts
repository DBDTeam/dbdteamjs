import { GatewayChannelCreateDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { Event } from "../Event";
export default class ChannnelCreate extends Event<GatewayChannelCreateDispatchData> {
    handle(data: GatewayChannelCreateDispatchData, shard: Shard): void;
}
