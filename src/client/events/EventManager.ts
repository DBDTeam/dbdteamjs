import { type Client } from "../../client/Client";

import { Collection } from "../../utils/Collection";
import { Event } from "./Event";

export class EventManager {
  client: Client;
  events: Collection<string, Event<unknown>> = new Collection();

  constructor(client: Client) {
    this.client = client;

    this._r;
    // this._r("VOICE_STATE_UPDATE");
    // this._r("VOICE_SERVER_UPDATE");

    // //GUILDS 1 << 0

    // this._r("GUILD_CREATE");
    // this._r("GUILD_DELETE");
    // this._r("GUILD_UPDATE");
    // this._r("GUILD_ROLE_UPDATE");
    // this._r("GUILD_ROLE_CREATE");
    // this._r("GUILD_ROLE_DELETE");
    // this._r("CHANNEL_UPDATE");
    // this._r("CHANNEL_CREATE");
    // this._r("CHANNEL_DELETE");
    // this._r("THREAD_UPDATE");
    // this._r("THREAD_CREATE");

    // //GUILD MEMBERS 1 << 1

    // this._r("GUILD_MEMBER_ADD");
    // this._r("GUILD_MEMBER_REMOVE");
    // this._r("GUILD_MEMBER_UPDATE");
    // this._r("GUILD_MEMBER_CHUNK");

    // // GUILD MODERATION 1 << 2

    // this._r("GUILD_BAN_ADD");
    // this._r("GUILD_BAN_REMOVE");

    // // GUILD EMOJIS AND STICKERS 1 << 3

    // this._r("GUILD_EMOJIS_UPDATE");
    // this._r("GUILD_STICKERS_UPDATE");

    // // GUILD INTEGRATIONS 1 << 4

    // this._r("GUILD_INTEGRATION_UPDATE");

    // // GUILD PRESENCES 1 << 8
    // this._r("PRESENCE_UPDATE");

    // // GUILD MESSAGES 1 << 9

    this._r("MESSAGE_CREATE");
    // this._r("MESSAGE_UPDATE");
    // this._r("MESSAGE_DELETE");

    // //NON INTENTS RELATED
    this._r("INTERACTION_CREATE");
    this._r("READY");
  }

  _handle(event: string, d: any, shard: any) {
    if (this.events.get(event)) {
      this.events.get(event)?.handle(d, shard);
    }
  }

  _r(e: string) {
    const _event = require(`./Events/${e}`);
    this.events.set(e, new _event.default(this.client));
  }
}
