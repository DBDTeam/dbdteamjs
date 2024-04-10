import { GatewayReadyDispatchData } from "discord-api-types/v10";
import { Shard } from "../../../package";
import { Event } from "../Event";
export default class MessageCreate extends Event<GatewayReadyDispatchData> {
    handle(data: GatewayReadyDispatchData, shard: Shard): Promise<void>;
}
