// export { Client } from "../src/package";

declare module "node:events" {
  class EventEmitter {
    // Add type overloads for client events.
    public static once<
      Emitter extends EventEmitter,
      Event extends keyof ClientEvents
    >(
      eventEmitter: Emitter,
      eventName: Emitter extends Client ? Event : string
    ): Promise<Emitter extends Client ? ClientEvents[Event] : any[]>;
    public static on<
      Emitter extends EventEmitter,
      Events extends keyof ClientEvents
    >(
      eventEmitter: Emitter,
      eventName: Emitter extends Client ? Events : string
    ): AsyncIterableIterator<
      Emitter extends Client ? ClientEvents[Events] : any
    >;
  }
}

export class Client<Ready extends boolean = boolean> {
  public on<Event extends keyof ClientEvents>(
    event: Event,
    listener: (...args: ClientEvents[Event]) => void
  ): this;
  public on<Event extends string | symbol>(
    event: Exclude<Event, keyof ClientEvents>,
    listener: (...args: any[]) => void
  ): this;

  public once<Event extends keyof ClientEvents>(
    event: Event,
    listener: (...args: ClientEvents[Event]) => void
  ): this;
  public once<Event extends string | symbol>(
    event: Exclude<Event, keyof ClientEvents>,
    listener: (...args: any[]) => void
  ): this;

  public emit<Event extends keyof ClientEvents>(
    event: Event,
    ...args: ClientEvents[Event]
  ): boolean;
  public emit<Event extends string | symbol>(
    event: Exclude<Event, keyof ClientEvents>,
    ...args: unknown[]
  ): boolean;

  public off<Event extends keyof ClientEvents>(
    event: Event,
    listener: (...args: ClientEvents[Event]) => void
  ): this;
  public off<Event extends string | symbol>(
    event: Exclude<Event, keyof ClientEvents>,
    listener: (...args: any[]) => void
  ): this;

  public removeAllListeners<Event extends keyof ClientEvents>(
    event?: Event
  ): this;
  public removeAllListeners<Event extends string | symbol>(
    event?: Exclude<Event, keyof ClientEvents>
  ): this;
}

export interface ClientEvents {
  // messageCreate: [message: Message];
}

// export class Message<InGuild extends boolean = boolean> extends Base {
//   public author: User;
// }

type MentionType = "users" | "roles" | "everyone";

interface MentionsData {
  parse: MentionType[];
  users: string[];
  roles: string[];
  messageReferenceId: string | null;
}

interface File {
  name: string;
  description: string;
  url: string | Buffer;
}

type Files = File[];

interface MessagePayloadData {
  content?: string;
  tts?: boolean;
  embeds?: Object[];
  mentions?: MentionsData;
  components?: Object[];
  stickers?: string[];
  flags?: number;
  files?: Files;
  nonce?: number;
  attachments?: Object[];
}

interface InteractionPayloadData {
  /**
   * The content of the Interaction response.
   */
  content?: string;
  /**
   * If the message will be sended using TTS.
   */
  tts?: boolean;
  /**
   * The embeds of the Interaction response.
   */
  embeds?: Object[];
  /**
   * The MentionsData of the Interaction response.
   */
  mentions?: MentionsData;
  /**
   * The allowed mentions of the Interaction response.
   */
  allowed_mentions?: MentionsData;
  /**
   * The components of the Interaction response.
   */
  components?: Object[];
  /**
   * The flags of the Interaction response. (is not needed to use 64, exists the option called 'ephemeral')
   */
  flags?: number;
  /**
   * The files of the Interaction response.
   */
  files?: Files;
  /**
   * The attachments of the Interaction response.
   */
  attachments?: Array<object>;
  /**
   * Yes, the Interaction response will be sent ephemerally.
   */
  ephemeral?: boolean;
}
