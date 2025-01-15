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
import { ChannelPermissionManager } from "./Managers";
export declare class GuildChannel extends Channel {
    /**
     * The guild id where the channel is located.
     * @type {string}
     */
    /**
     * If the channel is nsfw
     * @type {Nullable<boolean>}
     */
    nsfw: Nullable<boolean>;
    parent_id: Nullable<string>;
    permission_overwrites: Nullable<APIOverwrite[]>;
    position?: number;
    permissions?: ChannelPermissionManager;
    guildId: string;
    constructor(data: APIGuildChannel<any>, client: Client);
    /**
     * The guild where the channel is located.
     * @type {Guild}
     */
    get guild(): Guild;
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
    clone(reason?: string): Promise<Nullable<ThreadChannel | VoiceChannel | Channel | TextChannel | CategoryChannel | RESTResponse>>;
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
    edit(data: RESTPatchAPIChannelJSONBody, reason?: string): Promise<Nullable<ThreadChannel | VoiceChannel | Channel | TextChannel | CategoryChannel | RESTResponse>>;
    /**
     * Deletes the Channel
     * @param {string} reason - The reason
     * @returns {Promise<boolean>}
     */
    delete(reason?: string): Promise<boolean>;
}
