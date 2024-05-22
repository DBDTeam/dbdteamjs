import { GatewayThreadListSync, GatewayThreadListSyncDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class ThreadListSync extends Event<GatewayThreadListSyncDispatchData> {
    handle(data: GatewayThreadListSync, shard: Shard): void;
}
