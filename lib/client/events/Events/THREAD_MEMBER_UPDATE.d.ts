import { GatewayThreadMemberUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class ThreadMemberUpdate extends Event<GatewayThreadMemberUpdateDispatchData> {
    handle(data: GatewayThreadMemberUpdateDispatchData, shard: Shard): void;
}
