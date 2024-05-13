import { GatewayMessageCreateDispatchData } from "discord-api-types/v10";
import { Shard } from "../../../structures/Sharding";
import { Event } from "../Event";
export default class MessageCreate extends Event<GatewayMessageCreateDispatchData> {
    handle(data: GatewayMessageCreateDispatchData, shard: Shard): Promise<{
        message: import("../../../structures").Message;
    }>;
}
