import { GatewayPresenceUpdate, GatewayPresenceUpdateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
import { Shard } from "../../../structures";
export default class PresenceUpdate extends Event<GatewayPresenceUpdateDispatchData> {
    handle(data: GatewayPresenceUpdate, shard: Shard): void;
}
