"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextChannel = void 0;
const TextBasedChannel_1 = require("./TextBasedChannel");
/** @extends {TextBasedChannel} */
class TextChannel extends TextBasedChannel_1.TextBasedChannel {
    #client;
    /**
     * Represents a Text Channel
     * @param {*} data
     * @param {Client} client
     */
    constructor(data, client) {
        super(data, client);
        this.#client = this.client;
        /**
         * The Text Channel position
         * @type {number}
         */
        this.position = data.position;
        /**
         * The Text Channel permissions overwrites
         * @type {object}
         */
        this.permission_overwrites = data.permission_overwrites;
        /**
         * The Text Channel topic
         * @type {string | undefined}
         */
        this.topic = data.topic;
        /**
         * If the Text Channel has enabled the NSFW option
         * @type {boolean}
         */
        this.nsfw = data.nsfw;
    }
}
exports.TextChannel = TextChannel;
