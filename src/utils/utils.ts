import {
  ApplicationCommandType,
  ChannelType,
  ComponentType,
  InteractionType,
} from "discord-api-types/v10";
import { Client } from "../client/Client";
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
import { DMChannel } from "../structures/DMChannel";
import { ForumChannel } from "../structures";
import { ForumThreadChannel } from "../structures/ThreadForumChannel";
import {
  Methods,
  Nullable,
  SnowflakeInformation,
} from "../common";
import { RESTResponse } from "../rest/requestHandler";

export class Utilities {
  // Método estático para construir cualquier URL con parámetros opcionales
  static buildUrl(
    baseUrl: string,
    target?: string,
    options?: { [key: string]: any }
  ): string {
    let url = baseUrl;

    if (target) {
      url += `/${target}`; // Si hay un 'target', lo agregamos a la URL
    }

    const params: string[] = [];

    // Agregamos todos los parámetros a la URL
    if (options) {
      for (const [key, value] of Object.entries(options)) {
        if (value !== undefined && value !== null) {
          params.push(`${key}=${encodeURIComponent(value)}`);
        }
      }
    }

    // Si hay parámetros, los agregamos a la URL con el formato adecuado
    if (params.length > 0) {
      url += `?${params.join("&")}`;
    }

    return url; // Retornamos la URL final construida
  }

  // Función para obtener un ID limpio
  static getId(t: string): string {
    return t
      .replace(/<|>|#|!|@|&|:/g, "")
      .replace("a", "")
      .replace("_", "");
  }

  // Función para determinar el tipo de canal
  static typeChannel(channelData: any, client: Client): Channel {
    let parent;
    switch (channelData.type) {
      case ChannelType.GuildText:
        return new TextChannel(channelData, client);
      case ChannelType.DM:
        return new DMChannel(channelData, client);
      case ChannelType.GuildVoice:
        return new VoiceChannel(channelData, client);
      case ChannelType.GuildCategory:
        return new CategoryChannel(channelData, client);
      case ChannelType.PrivateThread:
        parent = client.channels.cache.get(channelData?.parent_id);

        if (parent?.type === ChannelType.GuildForum) {
          return new ForumThreadChannel(channelData, client);
        } else {
          return new ThreadChannel(channelData, client);
        }
      case ChannelType.PublicThread:
        parent = client.channels.cache.get(channelData?.parent_id);

        if (parent?.type === ChannelType.GuildForum) {
          return new ForumThreadChannel(channelData, client);
        } else {
          return new ThreadChannel(channelData, client);
        }
      case ChannelType.GuildForum:
        return new ForumChannel(channelData, client);
      default:
        return new Channel(channelData, client);
    }
  }

  // Función para determinar el tipo de interacción
  static async interactionType(data: any, client: any) {
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
    } else if (data.type === InteractionType.ModalSubmit) {
      return await new InteractionModal(data, client);
    } else if (data.data.component_type === ComponentType.Button) {
      return await new ButtonInteraction(data, client);
    } else if (
      [
        ComponentType.StringSelect,
        ComponentType.UserSelect,
        ComponentType.RoleSelect,
        ComponentType.MentionableSelect,
        ComponentType.ChannelSelect,
      ].includes(data.data?.component_type)
    ) {
      return await new SelectMenuInteraction(data, client);
    }
  }

  // Función para establecer un objeto basado en otro, con mapeo opcional
  static setObj<T>(
    baseObj: Record<any, any>,
    actualObj: T,
    mappings = {},
    includeUndefined = false
  ): T {
    const newObj: Record<any, any> = {};

    for (const key in actualObj) {
      const value = actualObj[key];
      const mappedKey = Utilities.getKeyByValue(mappings, key) || key;
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

  // Función para obtener la clave de un valor en un objeto
  static getKeyByValue(object: object, value: any) {
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

  // Interfaz para obtener información de un Snowflake
  static getAllStamps(c: Base | Date): Nullable<SnowflakeInformation> {
    if (!c) return null;

    const stamp: Date =
      c instanceof Base
        ? new Date(Number(c.___getEpoch) + Number(c.___getBinary))
        : new Date(c);

    return {
      stamp: stamp.getTime(),
      unix: Math.floor(stamp.getTime() / 1000),
      date: stamp,
    };
  }
}