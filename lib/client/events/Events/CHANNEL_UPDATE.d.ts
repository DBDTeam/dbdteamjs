import { GatewayChannelUpdateDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { Event } from "../Event";
export default class ChannelUpdate extends Event<GatewayChannelUpdateDispatchData> {
    handle(data: GatewayChannelUpdateDispatchData, shard: Shard): void;
}
