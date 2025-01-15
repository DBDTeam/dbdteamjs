"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const Base_1 = require("./Base");
const ChannelTypes_1 = require("../common/types/ChannelTypes");
/**
 * Represents a BaseChannel (for easier usage)
 * @param {object} data - The Channel payload
 * @param {Client} client - The Client
 *
 * @extends {Base}
 */
class Channel extends Base_1.Base {
    data;
    /**
     * The client associated with the channel.
     * @type {Client}
     */
    client;
    /**
     * The ID of the channel.
     * @type {Snowflake}
     */
    id;
    /**
     * The type of the channel.
     * @type {ChannelType}
     */
    type;
    /**
     * The name of the channel.
     * @type {Nullable<string>}
     */
    name;
    /**
     * The flags of the channel.
     * @type {number}
     */
    flags;
    /**
     * Creates an instance of BaseChannel.
     * @param {APIChannel} data - The channel payload.
     * @param {Client} client - The client.
     */
    constructor(data, client) {
        super(data.id);
        this.data = data;
        this.data = data;
        this.client = client;
        this.id = data.id;
        this.type = data.type;
        this.name = data.name;
    }
    toString() {
        return `<#${this.id}>`;
    }
    isTextBased() {
        return [
            ChannelTypes_1.ChannelTypes.Text,
            ChannelTypes_1.ChannelTypes.Voice,
            ChannelTypes_1.ChannelTypes.PublicThread,
            ChannelTypes_1.ChannelTypes.PrivateThread,
        ].includes(this.type);
    }
    isVoice() {
        return ChannelTypes_1.ChannelTypes.Voice === this.type;
    }
    isText() {
        return ChannelTypes_1.ChannelTypes.Text === this.type;
    }
    ;
    isThread() {
        return [ChannelTypes_1.ChannelTypes.PublicThread, ChannelTypes_1.ChannelTypes.PrivateThread].includes(this.type);
    }
    isForum() {
        return this.type === ChannelTypes_1.ChannelTypes.Forum;
    }
}
exports.Channel = Channel;
