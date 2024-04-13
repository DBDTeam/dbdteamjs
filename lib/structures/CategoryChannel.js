"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryChannel = void 0;
const Collection_1 = require("../utils/Collection");
const BaseChannel_1 = require("./BaseChannel");
/**
 * @typedef {import('./TextChannel.js').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel.js').VoiceChannel} VoiceChannel
 * @typedef {import('./ThreadChannel.js').ThreadChannel} ThreadChannel
 * @typedef {import('./Guild.js').Guild} Guild
 */
/** Represents a CategoryChannel
 * @extends {Channel}
 */
class CategoryChannel extends BaseChannel_1.Channel {
    constructor(data, client) {
        super(data, client);
    }
    /**
     * Returns the channels that are in the cache.
     * @type {Collection<string, TextChannel | VoiceChannel | Channel | ThreadChannel>}
     */
    get channels() {
        const categoryChannels = new Collection_1.Collection();
        if (this.guild?.channels)
            for (const channel of this.guild?.channels.cache.values()) {
                if (channel.parent_id === this.id) {
                    categoryChannels.set(channel.id, channel);
                }
            }
        return categoryChannels;
    }
}
exports.CategoryChannel = CategoryChannel;
