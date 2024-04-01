declare const Channel: any;
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
    constructor(data: any, client: any);
    /**
     * Returns the channels that are in the cache.
     * @type {Map<string, TextChannel | VoiceChannel | Channel | ThreadChannel>}
     */
    get channels(): any;
}
export { CategoryChannel };
