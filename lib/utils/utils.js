"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStamps = exports.getKeyByValue = exports.setObj = exports.interactionType = exports.typeChannel = exports.getId = void 0;
const v10_1 = require("discord-api-types/v10");
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
const getId = (t) => {
    return t
        .replace(/<|>|#|!|@|&|:/g, "")
        .replace("a", "")
        .replace("_", "");
};
exports.getId = getId;
function typeChannel(channelData, client) {
    switch (channelData.type) {
        case v10_1.ChannelType.GuildText:
            return new TextChannel_1.TextChannel(channelData, client);
        case v10_1.ChannelType.GuildVoice:
            return new VoiceChannel_1.VoiceChannel(channelData, client);
        case v10_1.ChannelType.GuildCategory:
            return new CategoryChannel_1.CategoryChannel(channelData, client);
        case v10_1.ChannelType.PublicThread:
        case v10_1.ChannelType.PrivateThread:
            return new ThreadChannel_1.ThreadChannel(channelData, client);
        default:
            return new BaseChannel_1.Channel(channelData, client);
    }
}
exports.typeChannel = typeChannel;
async function interactionType(data, client) {
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
    else if (data.type === 5) {
        return await new InteractionModal_1.InteractionModal(data, client);
    }
    else if (data.data.custom_id) {
        if (data.data.component_type === v10_1.ComponentType.Button) {
            return await new ButtonInteraction_1.ButtonInteraction(data, client);
        }
        else if ([
            v10_1.ComponentType.TextInput,
            v10_1.ComponentType.UserSelect,
            v10_1.ComponentType.RoleSelect,
            v10_1.ComponentType.MentionableSelect,
            v10_1.ComponentType.ChannelSelect,
        ].includes(data.data?.component_type)) {
            return await new SelectMenuInteraction_1.SelectMenuInteraction(data, client);
        }
    }
}
exports.interactionType = interactionType;
function setObj(baseObj, actualObj, mappings = {}, includeUndefined = false) {
    const newObj = {};
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
    const latest = {};
    for (var [key, value] of Object.entries(newObj)) {
        if ((value !== undefined && value !== null) || includeUndefined) {
            latest[key] = value;
        }
    }
    return latest;
}
exports.setObj = setObj;
function getKeyByValue(object, value) {
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
exports.getKeyByValue = getKeyByValue;
function getAllStamps(stamp) {
    stamp = new Date(stamp);
    return {
        stamp: Date.parse(stamp),
        unix: Math.floor(Date.parse(stamp) / 1000),
        date: stamp,
    };
}
exports.getAllStamps = getAllStamps;
