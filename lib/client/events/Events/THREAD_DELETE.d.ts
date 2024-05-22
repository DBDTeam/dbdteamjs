import { GatewayThreadDeleteDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class ThreadDelete extends Event<GatewayThreadDeleteDispatchData> {
    handle(data: GatewayThreadDeleteDispatchData, shard: Shard): void;
}
