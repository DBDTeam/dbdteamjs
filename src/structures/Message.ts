import { APIChannelMention, APIMessage } from "discord-api-types/v10";
import { Client } from "../client/Client";
import { MessageBodyRequest, Nullable } from "../common";
import { MessagePayloadData } from "../interfaces/message/MessagePayload";
import * as Endpoints from "../rest/Endpoints";
import { Collection } from "../utils/Collection";
import { getAllStamps, typeChannel } from "../utils/utils";
import { Base } from "./Base";
import { Channel } from "./BaseChannel";
import { CategoryChannel } from "./CategoryChannel";
import { Guild } from "./Guild";
import { MessageReactions } from "./Managers/ReactionMessage";
import { Member } from "./Member";
import { EditMessagePayload } from "./Payloads/EditMessagePayload";
import { MessagePayload } from "./Payloads/MessagePayload";
import { TextChannel } from "./TextChannel";
import { ThreadChannel } from "./ThreadChannel";
import { User } from "./User";
import { VoiceChannel } from "./VoiceChannel";

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
   * @type {string | undefined}
   */
  guildId?: string;

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
  member?: Member;

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
  channel?:
    | Channel
    | VoiceChannel
    | TextChannel
    | ThreadChannel
    | CategoryChannel;

  /**
   * The guild where the message was sent.
   * @type {(Guild | undefined)}
   */
  guild?: Guild;

  /**
   * Reactions associated with the message.
   * @type {MessageReactions}
   */
  reactions: MessageReactions;

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
  constructor(public data: any, client: Client) {
    super(client);

    this.data = data;
    this.client = client;
    this.id = data.id;
    this.type = data.type || 0;
    this.channelId = data.channel_id;
    this.author = this._user;
    this.user = this._user;
    this.content = data.content;
    this.mentions = {
      users: new Collection(),
      roles: new Collection(),
      channels: new Collection(),
    };
    this.channel = this.client.channels.cache.get(this.channelId);
    this.guild =
      this.client.guilds.cache.get(this.guildId!) ||
      this.client.channels.cache.get(this.channelId)?.guild;
    this.member = this.guild?.members?.cache.get(this.user.id);
    this.reactions = new MessageReactions(
      this.client,
      this,
      data.reactions || []
    );
    this.tts = data.tts;
    this.flags = data.flags || 0;
    this.sended = getAllStamps(this);
    this.embeds = data.embeds || [];
    this.attachments = data.attachments || [];
    this.stickers = new Collection();
    this.nonce = data.nonce || 0;
    this.pinned = data.pinned;
    this.patch(data);
  }

  /**
   * Patches the message data.
   * @param {APIMessage} data - The data of the message.
   */
  private patch(data: APIMessage): void {
    if ("member" in data && data.member) {
      this.member = new Member(
        { ...data.member, id: this.user.id },
        this.guild!,
        this.client
      );
    }

    if ("guild_id" in data) {
      this.guildId =
        data.guild_id ||
        (this.guild && this.guild.id) ||
        this.client.channels.cache.get(this.channelId)?.guild?.id;
    }

    if ("webhook_id" in data) {
      this.webhookId = data.webhook_id;
    }

    for (const i of data?.mentions || []) {
      if ("member" in i) {
        this.mentions.users.set(i.id, new User(i.member, this.client));
      } else {
        this.mentions.users.set(i.id, new User(i, this.client));
      }
    }

    for (const i of (data as APIMessage)?.mention_roles || []) {
      this.mentions.roles.set(i, i);
    }

    if (data?.mention_channels) {
      for (const i of data.mention_channels) {
        this.mentions.channels.set(i.id, i);
      }
    }

    if (data?.sticker_items) {
      for (const i of data.sticker_items) {
        this.stickers.set(i.id, i);
      }
    }
  }

  /**
   * Replies to the message.
   * @param {MessagePayloadData | string} obj - The message payload or content.
   * @returns {Promise<Message | null>} A promise that resolves to the sent message, or null if failed.
   */
  async reply(obj: MessageBodyRequest | string): Promise<Message | null> {
    let message: MessagePayload;
    if (typeof obj === "string") {
      message = new MessagePayload(obj);
    } else {
      message = new MessagePayload(obj);
    }

    const result = await this.client.rest.request(
      "POST",
      Endpoints.ChannelMessages(this.channelId),
      true,
      { data: message.payload },
      null,
      message.files
    );

    if (!result) return null;

    if (!result.error && result.data) {
      const data: APIMessage | { guild?: Guild; member?: Member } = {
        ...result.data,
        guild: this.guild,
        member: this.guild?.members?.cache.get(result.data.author.id),
      };

      return new Message(data as APIMessage, this.client);
    } else {
      return null;
    }
  }

  /**
   * Edits the message.
   * @param {EditMessagePayload | string} obj - The edit message payload or content.
   * @returns {Promise<Message | undefined>} A promise that resolves to the edited message, or undefined if failed.
   */
  async edit(obj: EditMessagePayload | string): Promise<Message | undefined> {
    let message: EditMessagePayload;
    if (typeof obj === "string") {
      message = new EditMessagePayload(obj);
    } else {
      message = new EditMessagePayload(obj);
    }

    const result = await this.client.rest.request(
      "PATCH",
      Endpoints.ChannelMessage(this.channelId, this.id),
      true,
      { data: message.payload },
      null,
      message.files
    );

    if (!result) return;

    if (!result.error && result.data) {
      const data: APIMessage | { guild?: Guild; member?: Member } = {
        ...result.data,
        guild: this.guild,
        member: this.guild?.members?.cache.get(result.data.author.id),
      };

      return new Message(data as APIMessage, this.client);
    } else {
      return undefined;
    }
  }

  /**
   * Removes all embeds from the message.
   * @returns {Promise<Message | undefined>} A promise that resolves to the updated message, or undefined if failed.
   */
  async removeEmbeds(): Promise<Message | undefined> {
    const result = await this.client.rest.request(
      "PATCH",
      Endpoints.ChannelMessage(this.channelId, this.id),
      true,
      { data: { flags: 4 } }
    );

    if (!result) return;

    if (!result.error && result.data) {
      const data: APIMessage | { guild?: Guild; member?: Member } = {
        ...result.data,
        guild: this.guild,
        member: this.guild?.members?.cache.get(result.data.author.id),
      };

      return new Message(data as APIMessage, this.client);
    } else {
      return undefined;
    }
  }

  /**
   * Deletes the message.
   * @returns {Promise<void>} A promise that resolves once the message is deleted.
   */
  async delete(): Promise<void> {
    await this.client.rest.request(
      "DELETE",
      Endpoints.ChannelMessage(this.channelId, this.id),
      true
    );
  }

  /**
   * Gets the user associated with the message.
   * @returns {User} The user associated with the message.
   */
  get _user(): User {
    if (this.webhookId && "user" in this.data) {
      return this.data.user as User;
    } else {
      const x = new User(this.data.author, this.client);
      this.client.users.cache.set(x.id, x);
      return x;
    }
  }

  /**
   * Gets the channel by its ID.
   * @param {string} channelId - The ID of the channel.
   * @returns {Promise<Channel | null>} A promise that resolves to the channel, or null if not found.
   */
  async _getChannel(channelId: string): Promise<Channel | null> {
    const result = await this.client.rest.request(
      "GET",
      Endpoints.Channel(channelId),
      true
    );

    if (!result?.error || result) {
      let channel: any = result;

      if (this.guild) channel.guild = this.guild;

      channel = typeChannel(channel.data, this.client);

      this.client.channels.cache.set(channel.id, channel);
      this.guild?.channels.cache.set(channel.id, channel);

      return channel;
    } else {
      return null;
    }
  }
}

export { Message };
