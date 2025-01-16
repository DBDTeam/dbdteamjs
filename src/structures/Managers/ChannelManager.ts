import {
  APIChannel,
  APIChannelPatchOverwrite,
  APIGuildForumDefaultReactionEmoji,
  APIGuildForumTag,
  ChannelType,
  ForumLayoutType,
  SortOrderType,
  VideoQualityMode,
} from "discord-api-types/v10";
import { type Client } from "../../client/Client";
import * as Endpoints from "../../rest/Endpoints";
import { Collection } from "../../utils/Collection";
import { type Channel } from "../BaseChannel";
import { type VoiceChannel } from "../VoiceChannel";
import { type TextChannel } from "../TextChannel";
import { type ThreadChannel } from "../ThreadChannel";
import { type CategoryChannel } from "../CategoryChannel";
import { Utilities } from "../../utils/utils";

export interface ChannnelCreatePayload {
  name: string;
  type: ChannelType;
  topic?: string;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  position?: number;
  permission_overwrites?: APIChannelPatchOverwrite[];
  parent_id?: string;
  nsfw?: boolean;
  rtc_region?: string;
  video_quality_mode?: VideoQualityMode;
  default_auto_archive_duration?: number;
  default_reaction_emoji?: APIGuildForumDefaultReactionEmoji;
  available_tags?: APIGuildForumTag;
  default_sort_order?: SortOrderType;
  default_forum_layout?: ForumLayoutType;
  default_thread_rate_limit_per_user?: number;
  reason?: string;
}

class ChannelManager {
  #client: Client;
  public cache: Collection<
    string,
    Channel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel
  >;

  /**
   * Constructs a new ChannelManager instance.
   * @param {Client} client - The client instance to interact with the Discord API.
   */
  constructor(client: Client) {
    this.#client = client;
    this.cache = new Collection();
  }

  /**
   * Fetches a specific channel by its ID.
   * @param {string} id - The ID of the channel to fetch.
   * @returns {Promise<Channel | null>} - The fetched channel or null if an error occurs.
   */
  async fetch(id: string) {
    const response = await this.#client.rest.request<APIChannel>(
      "GET",
      Endpoints.Channel(id),
      true
    );

    if (!response || response.error) return response;

    const channel = await Utilities.typeChannel(response, this.#client);

    this.cache.set(channel.id, channel)
    return channel
  }
}


export { ChannelManager };
