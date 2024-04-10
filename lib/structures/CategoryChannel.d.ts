import { type Client } from "../client/Client";
import { Collection } from "../utils/Collection";
import { Channel } from "./BaseChannel";
/**
 * @typedef {import('./TextChannel.js').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel.js').VoiceChannel} VoiceChannel
 * @typedef {import('./ThreadChannel.js').ThreadChannel} ThreadChannel
 * @typedef {import('./Guild.js').Guild} Guild
 */
/** Represents a CategoryChannel
 * @extends {Channel}
 */
declare class CategoryChannel extends Channel {
    constructor(data: any, client: Client);
    /**
     * Returns the channels that are in the cache.
     * @type {Collection<string, TextChannel | VoiceChannel | Channel | ThreadChannel>}
     */
    get channels(): Collection<unknown, unknown>;
}
export { CategoryChannel };
