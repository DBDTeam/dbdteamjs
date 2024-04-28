import { type Client } from "../client/Client";
import { TextBasedChannel } from "./TextBasedChannel";
/** @extends {TextBasedChannel} */
declare class TextChannel extends TextBasedChannel {
    #private;
    /**
     * Represents a Text Channel
     * @param {*} data
     * @param {Client} client
     */
    constructor(data: any, client: Client);
}
export { TextChannel };
