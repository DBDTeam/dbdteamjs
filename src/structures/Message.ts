import {
  APIChannel,
  APIChannelMention,
  APIMessage,
  GatewayMessageCreateDispatchData,
} from "discord-api-types/v10";
import { Client } from "../client/Client";
import {
  MessageBodyRequest,
  MessageUpdateBodyRequest,
  Nullable,
} from "../common";
import * as Endpoints from "../rest/Endpoints";
import { Collection } from "../utils/Collection";
import { Base } from "./Base";
import { Channel } from "./BaseChannel";
import { Guild } from "./Guild";
import { MessageReactions } from "./Managers/MessageReactionManager";
import { Member } from "./Member";
import { EditMessagePayload } from "./Payloads/EditMessagePayload";
import { MessagePayload } from "./Payloads/MessagePayload";
import { User } from "./User";
import { ClientError, ClientTypeError } from "../client/errors/ClientError";
import { ErrorNames } from "../client/errors/ErrorList";
import { PermissionNames } from "../common/interfaces";
import { Utilities } from "../utils/utils";
import { RESTResponse } from "../rest/requestHandler";
import { GuildTextBasedChannel } from "./GuildTextBasedChannel";
import { TextBasedChannel } from "./TextBasedChannel";
import { GuildChannel } from "./GuildChannel";

/**
 * Represents a Discord message.
 */
class Message extends Base {
  /**
   * The client associated with the message.
   * @type {Client}
   */
  readonly client: Client;

  /**
   * The ID of the message.
   * @type {string}
   */
  id: string;

  /**
   * The ID of the guild where the message was sent.
   * @type {string}
   */
  guildId: string;

  /**
   * The author of the message.
   * @type {User}
   */
  author: User;

  /**
   * The user associated with the message.
   * @type {User}
   */
  user: User;

  /**
   * The member object associated with the message.
   * @type {Member | undefined}
   */
  member!: Member;

  /**
   * Mentions in the message.
   * @type {{
   *   roles: Collection<string, string>;
   *   channels: Collection<string, APIChannelMention>;
   *   users: Collection<string, Member | User>;
   * }}
   */
  mentions: {
    roles: Collection<string, string>;
    channels: Collection<string, APIChannelMention>;
    users: Collection<string, Member | User>;
  };

  /**
   * A nonce that can be used for optimistic message sending.
   * @type {unknown}
   */
  nonce: unknown;

  /**
   * The type of the message.
   * @type {number}
   */
  type: number;

  /**
   * The ID of the channel where the message was sent.
   * @type {string}
   */
  channelId: string;

  /**
   * The content of the message.
   * @type {string}
   */
  content: string;

  /**
   * The channel where the message was sent.
   * @type {(Channel | VoiceChannel | TextChannel | ThreadChannel | CategoryChannel | undefined)}
   */
  channel!: TextBasedChannel | GuildTextBasedChannel;

  /**
   * The guild where the message was sent.
   * @type {(Guild | undefined)}
   */
  guild!: Guild;

  /**
   * Reactions associated with the message.
   * @type {MessageReactions}
   */
  reactions!: MessageReactions;

  /**
   * Whether the message was text-to-speech.
   * @type {boolean}
   */
  tts: boolean;

  /**
   * Flags of the message.
   * @type {number}
   */
  flags: number;

  /**
   * Information about when the message was sent.
   * @type {{ stamp: number; unix: number; date: Date }}
   */
  sended: Nullable<{ stamp: any; unix: number; date: Date }>;

  /**
   * Embeds in the message.
   * @type {unknown[]}
   */
  embeds: unknown[];

  /**
   * Attachments in the message.
   * @type {unknown[]}
   */
  attachments: unknown[];

  /**
   * Stickers attached to the message.
   * @type {Collection<string, unknown>}
   */
  stickers: Collection<string, unknown>;

  /**
   * Whether the message is pinned.
   * @type {boolean}
   */
  pinned: boolean;

  /**
   * The ID of the webhook that sent the message.
   * @type {string | undefined}
   */
  webhookId?: string;

  /**
   * Information about the associated thread.
   * @type {any}
   */
  thread: any;
  /**
   * Creates an instance of Message.
   * @param {APIMessage} data - The data of the message.
   * @param {Client} client - The client.
   */
  constructor(private data: GatewayMessageCreateDispatchData, client: Client) {
    super(client);
    this.client = client;
    this.id = data.id;
    this.type = data.type || 0;
    this.channelId = data.channel_id;
    this.author = new User(
      this.data.author || this.data?.interaction?.user,
      this.client
    );
    this.user = this.author;
    this.content = data.content;
    this.mentions = {
      users: new Collection(),
      roles: new Collection(),
      channels: new Collection(),
    };
    this.channel = this.client.channels.cache.get(
      data.channel_id
    ) as TextBasedChannel | GuildTextBasedChannel;
    this.guildId = data.guild_id ?? (this.channel as GuildTextBasedChannel).guild?.id as string;
    this.guild =
      (this.channel as GuildTextBasedChannel)?.guild
    this.member = this.guild?.members?.cache.get(this.user.id) as Member;
    this.tts = data.tts;
    this.flags = data.flags || 0;
    this.sended = Utilities.getAllStamps(this);
    this.embeds = data.embeds || [];
    this.attachments = data.attachments || [];
    this.stickers = new Collection();
    this.nonce = data.nonce || 0;
    this.pinned = data.pinned;
    this.reactions = new MessageReactions(
      this.client,
      this,
      this.data.reactions || []
    );
  }

  /**
   * Patches the message data.
   * @param {APIMessage} data - The data of the message.
   */
  async ___patch(): Promise<void> {
    if (!this.channel) {
      this.channel = (await this.client.channels.fetch(
        this.channelId
      )) as TextBasedChannel;
    }

    if(!this.guild && (this.channel as GuildTextBasedChannel).guild) {
      this.channel = this.channel as GuildTextBasedChannel
      this.guild = this.channel.guild
      this.guildId = this.channel.guildId
    }

    if (!this.member) {
      this.member = (await this.guild?.members?.fetch(
        this.data.author.id
      )) as Member;
    }

    if ("webhook_id" in this.data) {
      this.webhookId = this.data.webhook_id;
    }

    for (const i of this.data?.mentions || []) {
      if ("member" in i) {
        if (!i.member) continue;
        this.mentions.users.set(
          i.id,
          new Member({ ...i, user: i }, this.guild as Guild, this.client)
        );
      } else {
        this.mentions.users.set(i.id, new User(i, this.client));
      }
    }

    for (const i of (this.data as APIMessage)?.mention_roles || []) {
      this.mentions.roles.set(i, i);
    }

    if (this.data?.mention_channels) {
      for (const i of this.data.mention_channels) {
        this.mentions.channels.set(i.id, i);
      }
    }

    if (this.data?.sticker_items) {
      for (const i of this.data.sticker_items) {
        this.stickers.set(i.id, i);
      }
    }
  }

  /**
   * Replies to the message.
   * @param {MessagePayloadData | string} obj - The message payload or content.
   * @returns {Promise<Message | null>} A promise that resolves to the sent message, or null if failed.
   */
  async reply(body: MessageBodyRequest | string): Promise<Message | RESTResponse | null> {
    if (typeof body === "string" || body instanceof String) {
      body = { content: body as string } as MessageBodyRequest;
    }

    if (!body && typeof body !== "object")
      throw new ClientError(ErrorNames.InvalidType, "object", "body");

    if (
      !body.content &&
      !body.files &&
      !body.embeds &&
      !body.poll &&
      !body.sticker_ids
    )
      throw new ClientError(ErrorNames.MissingRequiredProperties, "Message", [
        "content",
        "files",
        "embeds",
        "poll",
        "sticker_ids",
      ]);

    if (!body.message_reference) {
      body.message_reference = { message_id: this.id };
    }
    const message = new MessagePayload(body, body?.files);

    var data = message.payload;

    var result = await this.client.rest.request<APIMessage>(
      "POST",
      Endpoints.ChannelMessages(this.channelId),
      true,
      data,
      null,
      message.files
    );

    if (!result || !result?.error) return result as RESTResponse;

      const messageData: any = {
        ...result.data,
        guild: this.guild,
        member: this.guild?.members?.cache.get(result.data.author.id),
      }
      return new Message(messageData, this.client);
  }

  /**
   * Edits the message.
   * @param {MessageBodyRequest | string} obj - The edit message payload or content.
   * @returns {Promise<Message | ErrorResponseFromApi>} A promise that resolves to the edited message, or ErrorResponseFromAPI if failed.
   */
  async edit(
    newMessage: MessageUpdateBodyRequest | string
  ): Promise<Message | RESTResponse | null> {
    if (
      !newMessage ||
      (typeof newMessage !== "string" && typeof newMessage !== "object")
    ) {
      throw new ClientTypeError(
        ErrorNames.InvalidType,
        "string or object",
        "newMessage"
      );
    }

    const editedMessage = new EditMessagePayload(
      typeof newMessage === "string" ? { content: newMessage } : newMessage
    );

    const data = editedMessage.payload;
    const files = editedMessage.files;

    if (!files && !data.content && !data.embeds)
      throw new ClientError(ErrorNames.MissingRequiredProperties, "Message", [
        "content",
        "files",
        "embeds",
      ]);

    const result = await this.client.rest.request<APIMessage>(
      "PATCH",
      Endpoints.ChannelMessage(this.channelId, this.id),
      true,
      data,
      null,
      files
    );

    if (!result || !result.hasData()) return result;
    
      const messageData: APIMessage & { guild_id: string } = {
        ...result.data,
        guild_id: this.guild.id,
      };

      return new Message(messageData, this.client);
  }

  /**
   * Removes all embeds from the message.
   * @returns {Promise<Message | ErrorResponseFromApi>} A promise that resolves to the updated message, or undefined if failed.
   */
  async removeEmbeds(): Promise<Message | RESTResponse> {
    const me = this.guild.members.me;

    if (!me.permissions.has(PermissionNames.ManageMessages))
      throw new ClientError(ErrorNames.MissingPermissions, "ManageMessages");
    const result = await this.client.rest.request<APIMessage>(
      "PATCH",
      Endpoints.ChannelMessage(this.channelId, this.id),
      true,
      { flags: 4 }
    );

    if (result && !result.hasData) {
      return new Message(
        { ...result.data, guild_id: this.guildId },
        this.client
      );
    }

    return result as RESTResponse;
  }

  /**
   * Deletes the message.
   * @returns {Promise<boolean>} A promise that resolves once the message is deleted.
   */
  async delete(): Promise<boolean> {
    const me = this.guild.members.me;

    if (
      this.author.id !== this.client.user.id &&
      !me.permissions.has(PermissionNames.ManageMessages)
    )
      throw new ClientError(ErrorNames.MissingPermissions, "ManageMessages");

    const deleted = await this.client.rest.request(
      "DELETE",
      Endpoints.ChannelMessage(this.channelId, this.id),
      true
    );

    return deleted?.error ? true : false;
  }

  /**
   * Gets the channel by its ID.
   * @param {string} channelId - The ID of the channel.
   * @returns {Promise<Channel | null>} A promise that resolves to the channel, or null if not found.
   */
  async _getChannel(channelId: string): Promise<Channel | null> {
    const result = await this.client.rest.request<APIChannel>(
      "GET",
      Endpoints.Channel(channelId),
      true
    );

    if (!result?.error || result) { //@ts-ignore
      if (this.guild) result.guild_id = this.guild.id;
      
      var channel = Utilities.typeChannel(result, this.client);

      this.client.channels.cache.set(channel.id, channel);
      if(this.channel.isGuildChannel()) this.guild?.channels.cache.set(channel.id, channel as GuildChannel);

      return channel;
    } else {
      return result;
    }
  }
}

export { Message };
