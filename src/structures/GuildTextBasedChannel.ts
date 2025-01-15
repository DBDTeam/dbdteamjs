import { Client } from "../client";
import { ChannelMessageManager } from "./Managers/ChannelMessageManager";
import * as Endpoints from "../rest/Endpoints";
import { Message } from "./Message";
import { MessagePayload } from "./Payloads/MessagePayload";
import { MessageBodyRequest, Nullable, SnowflakeInformation } from "../common";
import { ClientError, ClientTypeError } from "../client/errors/ClientError";
import { ErrorNames } from "../client/errors/ErrorList";
import { Utilities } from "../utils/utils";
import { MessageCollector } from "./Collectors/MessageCollector";
import {
    APIChannel,
    APIGuildChannel,
    APIMessage,
    APITextBasedChannel,
} from "discord-api-types/v10";
import { GuildChannel } from "./GuildChannel";

export class GuildTextBasedChannel extends GuildChannel {
    /**
     * The Text Channel message manager
     */
    messages: ChannelMessageManager<
        GuildChannel
    >;
    /**
     * The last Text Channel message
     */
    last_message_id: Nullable<string>;
    /**
     * The rate limit per user of the channel.
     * @type {Nullable<number>}
     */
    rate_limit_per_user: Nullable<number>;
    /**
     * Creates a message in the Text Channel
     * @readonly
     * @function
     */
    readonly sendMessage = async (body: MessageBodyRequest | string) =>
        await this.createMessage(body);
    /**
     * Creates a message in the Text Channel
     * @readonly
     * @function
     */
    readonly send = async (body: MessageBodyRequest | string) =>
        await this.createMessage(body);
    /**
     * The Text Channel last pin time information
     */
    readonly last_pin!: SnowflakeInformation;
    constructor(data: APITextBasedChannel<any>, client: Client) {
        super(data as APIChannel as APIGuildChannel<any>, client);
        this.last_message_id = data.last_message_id;
        this.last_pin = Utilities.getAllStamps(
            new Date(data.last_pin_timestamp || 0)
        ) as SnowflakeInformation;
        this.rate_limit_per_user = data.rate_limit_per_user;
        this.messages = new ChannelMessageManager(this, this.client);
        this.sendMessage = async (body: MessageBodyRequest | string) =>
            await this.createMessage(body);
        this.send = async (body: MessageBodyRequest | string) =>
            await this.createMessage(body);
    }

    /**
     * Creates a message in the Text Channel
     * @param {MessagePayload} body - The message send payload
     * @example
     * const channel = client.channels.cache.get("766497696604487691")
     *
     * channel.createMessage(`Hello world!`).then((response) => {
     *  if(response.error){
     *      return console.log(response)
     *  } else {
     *      console.log(`Message sended successfully!`)
     *  }
     * })
     * @returns {Promise<Message | object>}
     */

    async createMessage(body: MessageBodyRequest | string) {
        if (typeof body === "string" || body instanceof String) {
            body = { content: body as string };
        }

        if (!body || typeof body !== "object")
            throw new ClientTypeError(ErrorNames.InvalidType, "object", "body");

        if (
            !body?.content &&
            !body.files &&
            !body.embeds &&
            !body.poll &&
            !body.sticker_ids
        )
            throw new ClientError(
                ErrorNames.MissingRequiredProperties,
                "Message",
                ["content", "files", "embeds", "poll", "sticker_ids"]
            );

        const message = new MessagePayload(body, body?.files);

        var result = await this.client.rest.request<APIMessage>(
            "POST",
            Endpoints.ChannelMessages(this.id),
            true,
            message.payload,
            null,
            message.files
        );

        if (!result) return null;

        if (!result.error) {
            const data = {
                ...result as APIMessage,
                member: this.guild.members.cache.get(result.author.id),
                guild_id: this.guildId
            }
            return new Message(data as APIMessage, this.client);
        } else {
            return result;
        }
    }

    createMessageCollector(
        filter: (message: Message) => any,
        options: Record<any, any>
    ) {
        const collector = new MessageCollector(this.client, filter, options);
        return collector;
    }
}
