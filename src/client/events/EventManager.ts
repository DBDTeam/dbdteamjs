import { type Client } from "../../client/Client";

import { Collection } from "../../utils/Collection";
import { Event } from "./Event";

export class EventManager {
  events: Collection<string, Event<unknown>> = new Collection();

  constructor(public client: Client) {
    // this._r("VOICE_STATE_UPDATE");
    // this._r("VOICE_SERVER_UPDATE");

    //GUILDS 1 << 0

    this.addEvent("GUILD_CREATE");
    this.addEvent("GUILD_DELETE");
    this.addEvent("GUILD_UPDATE");
    this.addEvent("GUILD_ROLE_UPDATE");
    this.addEvent("GUILD_ROLE_CREATE");
    this.addEvent("GUILD_ROLE_DELETE");
    this.addEvent("CHANNEL_UPDATE");
    this.addEvent("CHANNEL_CREATE");
    this.addEvent("CHANNEL_DELETE");
    this.addEvent("THREAD_UPDATE");
    this.addEvent("THREAD_CREATE");
    this.addEvent("THREAD_DELETE");
    this.addEvent("THREAD_LIST_SYNC");
    this.addEvent("THREAD_MEMBER_UPDATE");

    // //GUILD MEMBERS 1 << 1

    this.addEvent("GUILD_MEMBER_ADD");
    this.addEvent("GUILD_MEMBER_REMOVE");
    this.addEvent("GUILD_MEMBER_UPDATE");
    this.addEvent("GUILD_MEMBER_CHUNK");

    // // GUILD MODERATION 1 << 2

    this.addEvent("GUILD_BAN_ADD");
    this.addEvent("GUILD_BAN_REMOVE")

    // GUILD EMOJIS AND STICKERS 1 << 3

    this.addEvent("GUILD_EMOJIS_UPDATE");
    this.addEvent("GUILD_STICKERS_UPDATE");

    // GUILD PRESENCES 1 << 8
    this.addEvent("PRESENCE_UPDATE");

    // GUILD MESSAGES 1 << 9

    this.addEvent("MESSAGE_CREATE");
    this.addEvent("MESSAGE_UPDATE");
    this.addEvent("MESSAGE_DELETE");

    // //NON INTENTS RELATED
    this.addEvent("INTERACTION_CREATE");
    this.addEvent("READY");
  }

  async runEvent(event: string, d: any, shard: any) {
    if (this.events.get(event)) {
      await this.events.get(event)?.handle(d, shard);
    }
  }

  addEvent(e: string) {
    const eventClass = (require(`./Events/${e}`)).default;
    this.events.set(e, new eventClass(this.client));
  }
}
