import { GatewayMessageCreateDispatchData } from "discord-api-types/v10";
import { Event } from "../Event";
export default class MessageCreate extends Event {
    handle(data: GatewayMessageCreateDispatchData): {
        message: import("../../Message").Message;
    };
}
