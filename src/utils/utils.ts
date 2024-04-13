import {
  ApplicationCommandType,
  ChannelType,
  ComponentType,
} from "discord-api-types/v10";
import { type Client } from "../client/Client";
import { Base } from "../structures/Base";

import { Channel } from "../structures/BaseChannel";
import { CategoryChannel } from "../structures/CategoryChannel";
import { ButtonInteraction } from "../structures/Interactions/ButtonInteraction";
import { InteractionModal } from "../structures/Interactions/InteractionModal";
import { MessageInteraction } from "../structures/Interactions/MessageInteraction";
import { SelectMenuInteraction } from "../structures/Interactions/SelectMenuInteraction";
import { SlashInteraction } from "../structures/Interactions/SlashInteraction";
import { UserInteraction } from "../structures/Interactions/UserInteraction";
import { TextChannel } from "../structures/TextChannel";
import { ThreadChannel } from "../structures/ThreadChannel";
import { VoiceChannel } from "../structures/VoiceChannel";

export const getId = (t: string) => {
  return t
    .replace(/<|>|#|!|@|&|:/g, "")
    .replace("a", "")
    .replace("_", "");
};

export function typeChannel(
  channelData: any,
  client: Client
): TextChannel | VoiceChannel | CategoryChannel | ThreadChannel | Channel {
  switch (channelData.type) {
    case ChannelType.GuildText:
      return new TextChannel(channelData, client);
    case ChannelType.GuildVoice:
      return new VoiceChannel(channelData, client);
    case ChannelType.GuildCategory:
      return new CategoryChannel(channelData, client);
    case ChannelType.PublicThread:
    case ChannelType.PrivateThread:
      return new ThreadChannel(channelData, client);
    default:
      return new Channel(channelData, client);
  }
}

export async function interactionType(data: any, client: any) {
  if (
    data.data.type === ApplicationCommandType.ChatInput &&
    !data.data.component_type
  ) {
    return await new SlashInteraction(data, client);
  } else if (
    data.data.type === ApplicationCommandType.Message &&
    !data.data.component_type
  ) {
    return await new MessageInteraction(data, client);
  } else if (
    data.data.type === ApplicationCommandType.User &&
    !data.data.component_type
  ) {
    return await new UserInteraction(data, client);
  } else if (data.type === 5) {
    return await new InteractionModal(data, client);
  } else if (data.data.custom_id) {
    if (data.data.component_type === ComponentType.Button) {
      return await new ButtonInteraction(data, client);
    } else if (
      [
        ComponentType.TextInput,
        ComponentType.UserSelect,
        ComponentType.RoleSelect,
        ComponentType.MentionableSelect,
        ComponentType.ChannelSelect,
      ].includes(data.data?.component_type)
    ) {
      return await new SelectMenuInteraction(data, client);
    }
  }
}

export function setObj<T>(
  baseObj: Record<any, any>,
  actualObj: T,
  mappings = {},
  includeUndefined = false
): T {
  const newObj: Record<any, any> = {};

  for (const key in actualObj) {
    const value = actualObj[key];
    const mappedKey = getKeyByValue(mappings, key) || key;
    if (mappedKey in baseObj) {
      newObj[mappedKey] = value;
    }
  }

  for (const key in baseObj) {
    if (!(key in newObj)) {
      newObj[key] = baseObj[key];
    }
  }
  const latest: Record<any, any> = {};
  for (var [key, value] of Object.entries(newObj)) {
    if ((value !== undefined && value !== null) || includeUndefined) {
      latest[key] = value;
    }
  }

  return latest;
}

export function getKeyByValue(object: object, value: any) {
  var f = null;
  for (var [key, val] of Object.entries(object)) {
    if (val instanceof Array) {
      if (val.includes(value) || key == value) {
        f = key;
      }
    } else {
      if (key === value || val === value) {
        f = key;
      }
    }
  }
  return f;
}

export function getAllStamps(c: Base) {
  if (!c) return null;

  const stamp = new Date(Number(c.getEpoch) + Number(c.getBinary));

  return {
    stamp: stamp.getTime(),
    unix: Math.floor(stamp.getTime() / 1000),
    date: stamp,
  };
}
