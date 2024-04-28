import { GatewayThreadCreateDispatch } from "discord-api-types/v10";
import { Shard } from "../../../structures";
import { Event } from "../Event";
export default class ThreadChannelCreate extends Event<GatewayThreadCreateDispatch> {
    handle(d: any, shard: Shard): void;
}
