import { GatewayMessageDeleteDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class MessageDelete extends Event<GatewayMessageDeleteDispatchData> {
    handle(data: GatewayMessageDeleteDispatchData, shard: Shard): Promise<void>;
}
