function readOnly(t, n, v) {
  Object.defineProperty(t, n, {
    value: v,
    writable: false,
    configurable: false
  });
}


const getId = (t) => {
  return t.replace(/<|>|#|!|@|&|:/g, "").replace("a", "").replace("_", "");
};

function typeChannel(channelData, client) {
  const { ChannelTypes } = require("../Types/ChannelTypes")

  const { TextChannel } = require("../structures/TextChannel")
  const { Channel } = require("../structures/DefaultChannel")
  const { VoiceChannel } = require("../structures/VoiceChannel")
  const { CategoryChannel } = require("../structures/CategoryChannel");
  const { ThreadChannel } = require("../structures/ThreadChannel");


  switch (channelData.type) {
    case ChannelTypes.Text:
      return new TextChannel(channelData, client)
    case ChannelTypes.Voice:
      return new VoiceChannel(channelData, client)
    case ChannelTypes.Category:
      return new CategoryChannel(channelData, client)
    case ChannelTypes.PublicThread:
      return new ThreadChannel(channelData, client)
    case ChannelTypes.PrivateThread:
      return new ThreadChannel(channelData, client)
    default:
      return new Channel(channelData, client)
  }
}

function interactionType(data, client) {
  const { InteractionBase } = require("../structures/Interactions/BaseInteraction");

  switch(data.type) {
    default:
      return new InteractionBase(data, client)
  }
}

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
  var latest = {}
  for (var [key, value] of Object.entries(newObj)) {
    if (((value !== undefined && value !== null) || includeUndefined)) {
      latest[key] = value
    }
  }
  return latest;
}

function getKeyByValue(object, value) {
  var f = null
  for (var [key, val] of Object.entries(object)) {
    if (val instanceof Array) {
      if (val.includes(value) || key == value) {
        f = key
      }
    } else {
      if (key === value || val === value) {
        f = key
      }
    }
  }
  return f
}

function getAllStamps(stamp) {
  stamp = new Date(stamp)

  return { stamp: Date.parse(stamp), unix: Math.floor(Date.parse(stamp) / 1000), date: stamp }
}

module.exports = { readOnly, getId, typeChannel, setObj, getAllStamps, interactionType };