import { GatewayMessageUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class MessageUpdate extends Event<GatewayMessageUpdateDispatchData> {
    handle(data: GatewayMessageUpdateDispatchData, shard: Shard): Promise<void>;
}
