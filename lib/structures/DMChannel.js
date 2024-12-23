"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMChannel = void 0;
const TextBasedChannel_1 = require("./TextBasedChannel");
// this is literally TextChannel but, renamed to DMChannel
/** @extends {TextBasedChannel} */
class DMChannel extends TextBasedChannel_1.TextBasedChannel {
    /**
     * Represents a Text Channel
     * @param {*} data
     * @param {Client} client
     */
    constructor(data, client) {
        super(data, client);
    }
}
exports.DMChannel = DMChannel;
