declare const Channel: any;
/**
 * @typedef {import('./TextChannel').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel').VoiceChannel} VoiceChannel
 * @typedef {import('./ForumChannel')} ForumChannel
 * @typedef {import('./Guild').Guild} Guild
 * @typedef {import('../client/Client').Client} Client
 */
/** @extends {Channel} */
declare class ThreadChannel extends Channel {
    #private;
    /**
     * Represents a ThreadChannel
     * @param {Object} data - The ThreadChannel payload
     * @param {Client} client - The Client
     */
    constructor(data: any, client: any);
    /**
     * Edits the ThreadChannel
     * @param {object} obj - The new ThreadChannel Object
     * @returns {Promise<ThreadChannel>}
     * @async
     */
    edit(obj: any): Promise<any>;
    leave(): Promise<any>;
    archivedThreads(config: any): Promise<void>;
    /**
     * Creates a message in the Text Channel
     * @param {MessagePayload} obj - The message send payload
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     *
     * channel.createMessage(`Hello world!`).then((response) => {
     *  if(response.error){
     *      return console.log(response)
     *  } else {
     *      console.log(`Message sended successfully!`)
     *  }
     * })
     * @returns {Promise<Message | object>}
     */
    createMessage(obj: any): Promise<any>;
}
export { ThreadChannel };
