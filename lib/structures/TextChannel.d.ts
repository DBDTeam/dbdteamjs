import { type Client } from "../client/Client";
import { Nullable } from "../common";
import { GuildTextBasedChannel } from "./GuildTextBasedChannel";
/** @extends {TextBasedChannel} */
declare class TextChannel extends GuildTextBasedChannel {
    #private;
    topic: Nullable<string>;
    /**
     * Represents a Text Channel
     * @param {*} data
     * @param {Client} client
     */
    constructor(data: any, client: Client);
}
export { TextChannel };
