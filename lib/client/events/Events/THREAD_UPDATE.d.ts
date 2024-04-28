import { GatewayThreadUpdateDispatch } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class ThreadUpdate extends Event<GatewayThreadUpdateDispatch> {
    handle(data: any, shard: Shard): void;
}
