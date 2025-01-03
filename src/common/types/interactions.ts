import {
  ApplicationCommandOptionType,
  InteractionType,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord-api-types/v10";
import {
  Channel,
  ForumChannel,
  ForumThreadChannel,
  GuildRole,
  TextChannel,
  ThreadChannel,
  User,
  VoiceChannel,
} from "../../structures";
import { Collection } from "../../utils/Collection";

/**
 * Represents the types of integrations for Discord commands.
 */
export enum IntegrationTypes {
  GUILD_INSTALL = 0,
  USER_INSTALL = 1,
}

/**
 * Represents the contexts in which a Discord command can be executed.
 */
export enum InteractionContexts {
  GUILD = 0,
  BOT_DM = 1,
  PRIVATE_CHANNEL = 2,
}

/**
 * Represents the body of a Discord command, including integrations and contexts.
 */
export type CommandsBody = RESTPostAPIChatInputApplicationCommandsJSONBody & {
  integrations_types?: IntegrationTypes[];
  contexts?: InteractionContexts[]
}

/**
 * Represents a value for a Discord interaction option.
 */
export type InteractionOptionValue = {
  /**
   * The name of the option
   */
  name: string;
  /**
   * The value of the option
   */
  value?: string;
  /**
   * The type of the option
   * @type { ApplicationCommandOptionType }
   */
  type: ApplicationCommandOptionType;
  /**
   * The options of the option (only if type is SubCommand or SubCommandGroup)
   */
  options?: Collection<string, InteractionOptionValue>;
};


export type InteractionResponseData = {
  name: string;
  id: string;
  type: InteractionType;
  user: User;
  userId: string;
};

export type SelectMenuResolvedValues = (
  | Channel
  | TextChannel
  | VoiceChannel
  | ThreadChannel
  | ForumChannel
  | ForumThreadChannel
  | GuildRole
  | User
)[];

export enum Contexts {
  Guild = 0,
  Channel = 2,
  DM = 1,
};
export enum InteractionTypes {
  Slash = 1,
  User = 2,
  Message = 3,
};

export enum SlashTypes {
  SubCommand = 1,
  SubCommandGroup = 2,
  String = 3,
  Integer = 4,
  Boolean = 5,
  User = 6,
  Channel = 7,
  Role = 8,
  Mentionable = 9,
  Number = 10,
  Attachment = 11,
};

export enum ComponentTypes {
  ActionRow = 1,
  Button = 2,
  String = 3,
  TextInput = 4,
  User = 5,
  Role = 6,
  Mentionable = 7,
  Channel = 8,
};

export enum ButtonStyles {
  Primary = 1,
  Secondary = 2,
  Success = 3,
  Danger = 4,
  Link = 5,
};
