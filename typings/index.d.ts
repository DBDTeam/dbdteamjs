import type { Message } from "../src/package";

export declare global {
  type StringValues<T> = {
    [K in keyof T]: T[K] extends string ? T[K] : never;
  }[keyof T];

  type NumberValues<T> = {
    [K in keyof T]: T[K] extends number ? T[K] : never;
  }[keyof T];

  /**
   * Usage : type EnumValues = EnumAsUnion<typeof anEnum>
   */
  type EnumAsUnion<T> = `${StringValues<T>}` | NumberValues<T>;

  type ProbablyPromise<V = unknown> = Promise<V> | V;
}

export interface ClientEvents {
  debug: (...args: unknown[]) => unknown;
  messageCreate: (message: Message) => unknown;
  interactionCreate: (interaction: BaseInteraction) => unknown;
  ready: () => unknown;
}

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
