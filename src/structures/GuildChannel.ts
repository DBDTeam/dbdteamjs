import { APIGuildChannel, APIOverwrite, RESTPatchAPIChannelJSONBody } from "discord-api-types/v10";
import { Client } from "../client";
import { Guild } from "./Guild";
import { Channel } from "./BaseChannel";
import { Nullable } from "../common";
import { ThreadChannel } from "./ThreadChannel";
import { VoiceChannel } from "./VoiceChannel";
import { TextChannel } from "./TextChannel";
import { CategoryChannel } from "./CategoryChannel";
import { RESTResponse } from "../rest/requestHandler";
import { ClientTypeError } from "../client/errors/ClientError";
import { ErrorNames } from "../client/errors/ErrorList";
import * as Endpoints from "../rest/Endpoints"
import { Utilities } from "../utils";
import { ChannelPermissionManager } from "./Managers";

export class GuildChannel extends Channel {
    /**
     * The guild id where the channel is located.
     * @type {string}
     */
    /**
     * If the channel is nsfw
     * @type {Nullable<boolean>}
     */
    nsfw: Nullable<boolean>;
    parent_id: Nullable<string>
    permission_overwrites: Nullable<APIOverwrite[]>
    position?: number
    permissions?: ChannelPermissionManager;
    guildId: string
    constructor(data: APIGuildChannel<any>, client: Client) {
        super(data, client)
        this.guildId = data.guild_id as string;
        this.nsfw = data.nsfw;
        this.parent_id = data.parent_id;
        this.permission_overwrites = data.permission_overwrites;
        this.position = data.position;
        this.permissions = new ChannelPermissionManager(this.id, this.client)
    }

    /**
     * The guild where the channel is located.
     * @type {Guild}
     */
    get guild(): Guild {
        return this.client.guilds.cache.get(this.guildId) as Guild
    }

    /**
     * Clones the channel
     * @returns {Promise<Nullable<ThreadChannel | VoiceChannel | Channel | TextChannel | CategoryChannel | RESTResponse>> }
     * @async
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     * channel.clone().then((result) => {
     *  if(result?.error){
     *      console.log(`Error :(`)
     *  } else {
     *      console.log(`Channel cloned successfully`)
     *  }
     * })
     */

    async clone(
        reason?: string
    ): Promise<
        Nullable<
            | ThreadChannel
            | VoiceChannel
            | Channel
            | TextChannel
            | CategoryChannel
            | RESTResponse
        >
    > {
        const data = this

        if (reason && typeof reason !== "string")
            throw new ClientTypeError(
                ErrorNames.InvalidType,
                "string",
                "reason"
            );

        var result = await this.client.rest.request<APIGuildChannel<typeof this.type>>(
            "POST",
            Endpoints.GuildChannels(this.guildId),
            true,
            data,
            reason
        );

        if (!result || !result?.error) return null;

        return result?.error
            ? (result as RESTResponse)
            : Utilities.typeChannel(result, this.client);
    }

    /**
     *
     * @param {object} obj - The Channel Edit payload
     * @returns {Promise<DefaultChannel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel>}
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     * channel.edit({ name: "hello" }).then((result) => {
     *  if(result?.error){
     *      console.log(`Error :()`)
     *  } else {
     *      console.log(`Channel edited successfully`)
     *  }
     * })
     * @async
     */

    async edit(
        data: RESTPatchAPIChannelJSONBody,
        reason?: string
    ): Promise<
        Nullable<
            | ThreadChannel
            | VoiceChannel
            | Channel
            | TextChannel
            | CategoryChannel
            | RESTResponse
        >
    > {
        if (!data || typeof data !== "object")
            throw new ClientTypeError(ErrorNames.InvalidType, "object", "data");

        var result = await this.client.rest.request<APIGuildChannel<typeof this.type>>(
            "PATCH",
            Endpoints.Channel(this.id),
            true,
            data,
            reason
        );

        if (!result || !result?.error) return null;

        return result?.error
            ? (result as RESTResponse)
            : Utilities.typeChannel(result, this.client);
    }

    /**
     * Deletes the Channel
     * @param {string} reason - The reason
     * @returns {Promise<boolean>}
     */

    async delete(reason?: string): Promise<boolean> {
        if (reason && typeof reason !== "string")
            throw new ClientTypeError(
                ErrorNames.InvalidType,
                "string",
                "reason"
            );

        var result = await this.client.rest.request(
            "DELETE",
            Endpoints.Channel(this.id),
            true,
            {},
            reason?.trim() || null
        );

        return result?.error ? false : true;
    }

    /**
     * Returns the mention of the channel
     * @returns {string}
     * @example
     * const channel = client.channels.cache.get("1234567890123456")
     * channel.send(`Im sending this message in ${channel.toString()}`)
     */
}