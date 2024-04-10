import { type Client } from "../client/Client";
import { Collection } from "../utils/Collection";
import { Channel } from "./BaseChannel";
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
  constructor(data: any, client: Client) {
    super(data, client);
  }

  /**
   * Returns the channels that are in the cache.
   * @type {Collection<string, TextChannel | VoiceChannel | Channel | ThreadChannel>}
   */
  get channels() {
    const categoryChannels = new Collection();
    if (this.guild?.channels)
      for (const channel of this.guild?.channels.cache.values()) {
        if (channel.parent_id === this.id) {
          categoryChannels.set(channel.id, channel);
        }
      }
    return categoryChannels;
  }
}

export { CategoryChannel };
