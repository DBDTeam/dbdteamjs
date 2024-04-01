declare const Channel: any;
/** @extends {Channel} */
declare class TextChannel extends Channel {
    #private;
    /**
     * Represents a Text Channel
     * @param {object} data
     * @param {?} client
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
     * @returns {Promise<Message | object>}
     */
    createMessage(obj: any): Promise<any>;
}
export { TextChannel };
