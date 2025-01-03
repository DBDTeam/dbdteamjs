"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utilities = void 0;
const v10_1 = require("discord-api-types/v10");
const Base_1 = require("../structures/Base");
const BaseChannel_1 = require("../structures/BaseChannel");
const CategoryChannel_1 = require("../structures/CategoryChannel");
const ButtonInteraction_1 = require("../structures/Interactions/ButtonInteraction");
const InteractionModal_1 = require("../structures/Interactions/InteractionModal");
const MessageInteraction_1 = require("../structures/Interactions/MessageInteraction");
const SelectMenuInteraction_1 = require("../structures/Interactions/SelectMenuInteraction");
const SlashInteraction_1 = require("../structures/Interactions/SlashInteraction");
const UserInteraction_1 = require("../structures/Interactions/UserInteraction");
const TextChannel_1 = require("../structures/TextChannel");
const ThreadChannel_1 = require("../structures/ThreadChannel");
const VoiceChannel_1 = require("../structures/VoiceChannel");
const DMChannel_1 = require("../structures/DMChannel");
const structures_1 = require("../structures");
const ThreadForumChannel_1 = require("../structures/ThreadForumChannel");
class Utilities {
    // Método estático para construir cualquier URL con parámetros opcionales
    static buildUrl(baseUrl, target, options) {
        let url = baseUrl;
        if (target) {
            url += `/${target}`; // Si hay un 'target', lo agregamos a la URL
        }
        const params = [];
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
    static getId(t) {
        return t
            .replace(/<|>|#|!|@|&|:/g, "")
            .replace("a", "")
            .replace("_", "");
    }
    // Función para determinar el tipo de canal
    static typeChannel(channelData, client) {
        let parent;
        switch (channelData.type) {
            case v10_1.ChannelType.GuildText:
                return new TextChannel_1.TextChannel(channelData, client);
            case v10_1.ChannelType.DM:
                return new DMChannel_1.DMChannel(channelData, client);
            case v10_1.ChannelType.GuildVoice:
                return new VoiceChannel_1.VoiceChannel(channelData, client);
            case v10_1.ChannelType.GuildCategory:
                return new CategoryChannel_1.CategoryChannel(channelData, client);
            case v10_1.ChannelType.PrivateThread:
                parent = client.channels.cache.get(channelData?.parent_id);
                if (parent?.type === v10_1.ChannelType.GuildForum) {
                    return new ThreadForumChannel_1.ForumThreadChannel(channelData, client);
                }
                else {
                    return new ThreadChannel_1.ThreadChannel(channelData, client);
                }
            case v10_1.ChannelType.PublicThread:
                parent = client.channels.cache.get(channelData?.parent_id);
                if (parent?.type === v10_1.ChannelType.GuildForum) {
                    return new ThreadForumChannel_1.ForumThreadChannel(channelData, client);
                }
                else {
                    return new ThreadChannel_1.ThreadChannel(channelData, client);
                }
            case v10_1.ChannelType.GuildForum:
                return new structures_1.ForumChannel(channelData, client);
            default:
                return new BaseChannel_1.Channel(channelData, client);
        }
    }
    // Función para determinar el tipo de interacción
    static async interactionType(data, client) {
        if (data.data.type === v10_1.ApplicationCommandType.ChatInput &&
            !data.data.component_type) {
            return await new SlashInteraction_1.SlashInteraction(data, client);
        }
        else if (data.data.type === v10_1.ApplicationCommandType.Message &&
            !data.data.component_type) {
            return await new MessageInteraction_1.MessageInteraction(data, client);
        }
        else if (data.data.type === v10_1.ApplicationCommandType.User &&
            !data.data.component_type) {
            return await new UserInteraction_1.UserInteraction(data, client);
        }
        else if (data.type === v10_1.InteractionType.ModalSubmit) {
            return await new InteractionModal_1.InteractionModal(data, client);
        }
        else if (data.data.component_type === v10_1.ComponentType.Button) {
            return await new ButtonInteraction_1.ButtonInteraction(data, client);
        }
        else if ([
            v10_1.ComponentType.StringSelect,
            v10_1.ComponentType.UserSelect,
            v10_1.ComponentType.RoleSelect,
            v10_1.ComponentType.MentionableSelect,
            v10_1.ComponentType.ChannelSelect,
        ].includes(data.data?.component_type)) {
            return await new SelectMenuInteraction_1.SelectMenuInteraction(data, client);
        }
    }
    // Función para establecer un objeto basado en otro, con mapeo opcional
    static setObj(baseObj, actualObj, mappings = {}, includeUndefined = false) {
        const newObj = {};
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
        const latest = {};
        for (var [key, value] of Object.entries(newObj)) {
            if ((value !== undefined && value !== null) || includeUndefined) {
                latest[key] = value;
            }
        }
        return latest;
    }
    // Función para obtener la clave de un valor en un objeto
    static getKeyByValue(object, value) {
        var f = null;
        for (var [key, val] of Object.entries(object)) {
            if (val instanceof Array) {
                if (val.includes(value) || key == value) {
                    f = key;
                }
            }
            else {
                if (key === value || val === value) {
                    f = key;
                }
            }
        }
        return f;
    }
    // Interfaz para obtener información de un Snowflake
    static getAllStamps(c) {
        if (!c)
            return null;
        const stamp = c instanceof Base_1.Base
            ? new Date(Number(c.___getEpoch) + Number(c.___getBinary))
            : new Date(c);
        return {
            stamp: stamp.getTime(),
            unix: Math.floor(stamp.getTime() / 1000),
            date: stamp,
        };
    }
}
exports.Utilities = Utilities;
