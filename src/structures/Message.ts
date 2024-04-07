import { APIChannelMention, APIMessage, APIUser, GatewayMessageCreateDispatchData, RESTPostAPIWebhookWithTokenJSONBody } from "discord-api-types/v10";
import { type Client } from "../client/Client";
import * as Endpoints from "../rest/Endpoints.js";
import { Collection } from "../utils/Collection";
import { getAllStamps, typeChannel } from "../utils/utils";
import { Base } from "./Base";
import { Channel } from "./BaseChannel";
import { Guild } from "./Guild";
import { MessageReactions } from "./Managers/ReactionMessage";
import { Member } from "./Member.js";
import { EditMessagePayload } from "./Payloads/EditMessagePayload";
import { MessagePayload } from "./Payloads/MessagePayload";
import { TextChannel } from "./TextChannel";
import { ThreadChannel } from "./ThreadChannel";
import { User } from "./User";
import { VoiceChannel } from "./VoiceChannel";

export type MessageData = APIMessage | GatewayMessageCreateDispatchData & { justUser: APIUser }

/**
 * Represents a Discord message
 */
class Message extends Base {
  [x: string]: any;
  private client: Client;
  guildId: string | undefined;
  author: User;
  user: User;
  member: Member
  mentions: {
		roles: Collection<string, string>;
		channels: Collection<string, APIChannelMention>;
		users: Collection<string, Member | User>;
	};
  // channel: TextChannel | VoiceChannel | Channel | ThreadChannel;
  readonly nonce;

  constructor(data: MessageData, client: Client) {
    super(client);

    this.client = client;
    /**
     * @type {string}
     * Represents the ID of the Message
     */
    this.id = data.id;
    /**
     * The type of the message.
     * @type {string}
     */
    this.type = data.type;
    /**
     * The channel id of where the message was sent
     * @type {string}
     */
    this.channelId = data.channel_id;
    /**
     * The guild id of where the message was sent
     * @type {string}
     */
    this.guildId =
      data.guild_id ||
      data.guild?.id ||
      this.client.channels.cache.get(this.channelId).guild?.id;
    /**
     * The author of the message.
     * @type {User}
     */
    this.author = this._user;
    /**
     * The author of the message
     * @type {User}
     */
    this.user = this._user;
    /**
     * The content of the message.
     * @type {string}
     */
    this.content = data.content;
    /**
     * The mentions of the message.
     * @type {object|undefined}
     */
    this.mentions = {
      users: new Collection(),
      roles: new Collection(),
      channels: new Collection(),
    };
    /**
     * Represents the current channel
     * @type {TextChannel|VoiceChannel|ThreadChannel|DefaultChannel}
     */
    this.channel = this.client.channels.cache.get(this.channelId);
    /**
     * Represents the current guild
     * @type {Guild}
     */
    this.guild =
      this.client.guilds.cache.get(this.guildId) ||
      this.client.channels.cache.get(this.channelId)?.guild;
    /**
     * Represents the member
     * @type {Member}
     */
    this.member = this.guild.members?.cache.get(this.user.id);
    /**
     * Represents the reactions of the message
     * @type {MessageReactions}
     */
    this.reactions = new MessageReactions(
      this.client,
      this,
      data.reactions || []
    );
    /**
     * If the message was sended with TTS
     * @type {boolean}
     */
    this.tts = data.tts;
    /**
     * The message flags
     * @type {number}
     */
    this.flags = data.flags;
    /**
     * The Date, unix and timestamp of when the message was sent
     * @type {object}
     */
    this.sended = getAllStamps(this);
    /**
     * The embeds of the message (if any)
     * @type {object}
     */
    this.embeds = data.embeds;
    /**
     * The attachments of the message (if any)
     * @type {Collection}
     */
    this.attachments = data.attachments;
    /**
     * The stickers of the message (if any)
     * @type {Collection}
     */
    this.stickers = new Collection();
    /**
     * The nonce of the message
     * @type {number}
     * @readonly
     */
    this.nonce = data.nonce;
    /**
     * If the message is pinned
     * @type {boolean}
     */
    this.pinned = data.pinned;
    this.patch(data);
  }

  private patch(data: MessageData) {
    if (!this.member) {
      this.member = new Member(
        { ...data.member, id: this.user.id },
        this.guild,
        this.client
      );
    }
    
    if ("webhook_id" in data) {
      /**
       * The webhook id of the message (if any)
       * @type {string|undefined}
       */
      this.webhookId = data.webhook_id;
    }

    if ("thread" in data) {
      /**
       * The thread where the message was sent. (if any)
       * @type {object|undefined}
       */
      this.thread = data.thread;
    }

    for (var i of data?.mentions) {
      this.mentions.users.set(i.id, new User(i, this.client));
    }
    for (var i of data?.mention_roles) {
      this.mentions.roles.set(i.id, i);
    }
    if ("mentions_channels" in data) {
      for (var i of data?.mention_channels) {
        this.mentions.channels.set(i.id, i);
      }
    }
    if ("stickers" in data) {
      for (var i of data?.stickers) {
        this.stickers.set(i.id, i);
      }
    }
  }
  /**
   *
   * @param {object} obj - Send a message in the channel
   * @example
   * <Message>.reply({
   *  content: `Hello!`,
   *  mentions: { repliedUser: false }
   * })
   * @returns {Promise<Message>}
   */
  async reply(obj: Omit<MessageCreateBodyRequest, 'message_reference'>) {
    var message;
    if (typeof obj === "string" || obj instanceof String) {
      const data = obj as string
      message = new MessagePayload(data);
    } else {
      const data = obj as MessageData
      message = new MessagePayload(data, data.files);
    }

    var result = await this.client.rest.request(
      "POST",
      Endpoints.ChannelMessages(this.channelId),
      true,
      { data: message.payload },
      null,
      message.files
    );

    if (!result) return null;

    if (!result.error && result.data) {
      result.data = {
        ...result.data,
        guild: this.guild,
        member: this.guild.members?.cache.get(result.data.author.id),
      };

      return new Message(result.data, this.client);
    } else {
      return result;
    }
  }
  /**
   *
   * @param {object} obj - Edits the message (Only if the message author is the client)
   * @example
   * <Message>.edit({
   *  content: "This is the content of the new message"
   * })
   * @returns {Promise<Message>}
   */
  async edit(obj: MessageEditPayload) {
    var message;
    if (typeof obj === "string" || obj instanceof String) {
      const data = obj as string
      message = new EditMessagePayload(data);
    } else {
      const data = obj as MessageEditPayload
      message = new EditMessagePayload(data, data.files);
    }

    var result = await this.client.rest.request(
      "PATCH",
      Endpoints.ChannelMessage(this.channelId, this.id),
      true,
      { data: message.payload },
      null,
      message.files
    );

    if (!result) return;

    if (!result.error && result.data) {
      result.data = {
        ...result.data,
        guild: this.guild,
        member: this.guild.members?.cache.get(result.data.author.id),
      };

      return new Message(result.data, this.client);
    } else {
      return result;
    }
  }
  /**
   * Remove the embeds of the message
   * @returns {Promise<Message>}
   */
  async removeEmbeds() {
    var result = await this.client.rest.request(
      "PATCH",
      Endpoints.ChannelMessage(this.channelId, this.id),
      true,
      { data: { flags: 4 } }
    );

    if (!result) return;

    if (!result.error && result.data) {
      result.data = {
        ...result.data,
        guild: this.guild,
        member: this.guild.members?.cache.get(result.data.author.id),
      };

      return new Message(result.data, this.client);
    } else {
      return result;
    }
  }
  /**
   * Deletes the message
   * @returns {Promise<Message>}
   */
  async delete() {
    var result = await this.client.rest.request(
      "DELETE",
      Endpoints.ChannelMessage(this.channelId, this.id),
      true
    );

    return result;
  }

  get _user(): User {
    if (this.webhookId) {
      return this.data.user;
    } else {
      var x = new User(this.author, this.client);
      this.client.users.cache.set(x.id, x);
      return x;
    }
  }

  async _getChannel(channelId: string) {
    const result = await this.client.rest.request(
      "GET",
      Endpoints.Channel(channelId),
      true
    );

    if (!result?.error || result) {
      var channel: Record<any, any> = result as Record<any, any>;
      channel.guild = this.guild;

      channel = typeChannel(channel.data, this.client);

      this.client.channels.cache.set(channel.id, channel);
      this.guild.channels.cache.set(channel.id, channel);

      return channel;
    } else {
      return null;
    }
  }
}

export { Message };
