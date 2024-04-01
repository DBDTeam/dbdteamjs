declare const Base: any;
/**
 * @typedef {import('./TextChannel.js').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel.js').VoiceChannel} VoiceChannel
 * @typedef {import('./ThreadChannel.js').ThreadChannel} ThreadChannel
 * @typedef {import('./CategoryChannel.js').CategoryChannel} CategoryChannel
 * @typedef {import('./Guild.js').Guild} Guild
 */
/**
 * Represents a BaseChannel (for a easier usage)
 * @extends {Base}
 */
declare class BaseChannel extends Base {
    #private;
    /**
     * Represents a BaseChannel (for a easier usage)
     * @param {object} data - The Channel payload
     * @param {import("./Interactions/BaseInteraction.js").Client} client - The Client
     */
    constructor(data: any, client: any);
    /**
     * Clones the channel
     * @returns {Promise<DefaultChannel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel>}
     * @async
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     * channel.clone().then((result) => {
     *  if(result?.error){
     *      console.log(`Error :()`)
     *  } else {
     *      console.log(`Channel cloned successfully`)
     *  }
     * })
     */
    clone(obj: any): Promise<any>;
    /**
     *
     * @param {object} obj - The Channel Edit payload
     * @returns {Promise<DefaultChannel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel>}
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     * channel.edit({ name: "hello" }).then((result) => {
     *  if(result?.error){
     *      console.log(`Error :()`)
     *  } else {
     *      console.log(`Channel edited successfully`)
     *  }
     * })
     * @async
     */
    edit(obj: any): Promise<any>;
    /**
     * Deletes the Channel
     * @param {string} reason - The reason
     * @returns {Promise<boolean>}
     */
    delete(reason: any): Promise<boolean>;
    /**
     * Returns the mention of the channel
     * @returns {string}
     * @example
     * const channel = client.channels.cache.get("1234567890123456")
     * channel.send(`Im sending this message in ${channel.toString()}`)
     */
    toString(): string;
}
export { BaseChannel as Channel };
