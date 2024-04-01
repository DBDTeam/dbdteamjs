declare const Channel: any;
/**
 * @typedef {import('./TextChannel').TextChannel} TextChannel
 * @typedef {import('./ForumChannel')} ForumChannel
 * @typedef {import('./Guild').Guild} Guild
 * @typedef {import('../client/Client').Client} Client
 */
/** @extends {Channel} */
declare class VoiceChannel extends Channel {
    /**
     * Represents a Voice Channel
     * @param {object} data - Voice Channel Payload
     * @param {Client} client
     */
    constructor(data: any, client: any);
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
     * @returns {Promise<Message | Object>}
     */
    createMessage(obj: any): Promise<any>;
}
export { VoiceChannel };
