const { Collection } = require("../utils/Collection");
const { Channel } = require("./DefaultChannel");

/**
 * @typedef {import('./TextChannel.js').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel.js').VoiceChannel} VoiceChannel
 * @typedef {import('./ThreadChannel.js').ThreadChannel} ThreadChannel
 * @typedef {import('./Guild.js').Guild} Guild
 */

/** Represents a CategoryChannel
 * @extends {Channel}
 */
class CategoryChannel extends Channel {
  constructor(data, client) {
    super(data, client);
  }

  /**
   * Returns the channels that are in the cache.
   * @type {Map<string, TextChannel | VoiceChannel | Channel | ThreadChannel>}
   */
  get channels() {
    const categoryChannels = new Collection();
    for (const channel of this.guild.channels.cache.values()) {
      if (channel.parentId === this.id) {
        categoryChannels.set(channel.id, channel);
      }
    }
    return categoryChannels;
  }
}

export { CategoryChannel };