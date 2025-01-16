import { type Client } from "../../client/Client";
import { Nullable } from "../../common";
import { RESTResponse } from "../../rest/requestHandler";
import { Collection } from "../../utils/Collection";
import { ChannnelCreatePayload } from "./ChannelManager";
import { GuildChannel } from "../GuildChannel";
declare class GuildChannelManager {
    #private;
    private guildId;
    cache: Collection<string, GuildChannel>;
    /**
     * Constructs a new GuildChannelManager instance.
     * @param {string} guildId - The ID of the guild to manage channels for.
     * @param {Client} client - The client instance to interact with the Discord API.
     */
    constructor(guildId: string, client: Client);
    /**
     * Fetches a specific channel by its ID.
     * @param {string} id - The ID of the channel to fetch.
     * @returns {Promise<Nullable<GuildChannel | Collection<string, any>> | RESTResponse>} - The fetched channel or null if not found.
     */
    fetch(id?: string): Promise<Nullable<GuildChannel | Collection<string, any>> | RESTResponse>;
    /**
     * Creates a new channel in the guild.
     * @param {ChannnelCreatePayload} channelObj - The channel creation payload.
     * @returns {Promise<Nullable<GuildChannel | RESTResponse>>} - The created channel or null if an error occurs.
     */
    create(channelObj: ChannnelCreatePayload): Promise<Nullable<GuildChannel | RESTResponse>>;
    /**
     * Deletes a channel from the guild.
     * @param {string} channelId - The ID of the channel to delete.
     * @param {string} [reason] - The reason for deleting the channel.
     * @returns {Promise<Nullable<GuildChannel | RESTResponse>>} - The deleted channel or null if an error occurs.
     */
    delete(channelId: string, reason?: string): Promise<Nullable<GuildChannel | RESTResponse>>;
}
export { GuildChannelManager };
