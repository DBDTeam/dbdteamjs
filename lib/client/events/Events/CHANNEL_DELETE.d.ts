import { GatewayChannelDeleteDispatchData } from "discord-api-types/v10";
import { type Shard } from "../../../structures/Sharding";
import { Event } from "../Event";
export default class ChannelDelete extends Event<GatewayChannelDeleteDispatchData> {
    handle(data: GatewayChannelDeleteDispatchData, shard: Shard): Promise<void>;
}
