// Structures
const { Client } = require("./client/Client");
const { ClientPresence } = require("./client/ClientPresence");
const { ClientUser } = require("./client/ClientUser");
const { ShardManager, Shard } = require("./structures/Sharding");
const { Base } = require("./structures/Base");
const { User } = require("./structures/User");
const { Member } = require("./structures/Member");
const { Guild } = require("./structures/Guild");
const { Message } = require("./structures/Message");
const { Channel } = require("./structures/DefaultChannel");
const { CategoryChannel } = require("./structures/CategoryChannel");
const { ThreadChannel } = require("./structures/ThreadChannel");
const { TextChannel } = require("./structures/TextChannel");
const { ThreadMember } = require("./structures/ThreadMember");
const { VoiceChannel } = require("./structures/VoiceChannel");

//Types
const { IntentsBitFields } = require("./structures/Flags/Intents.js");
const {
  Contexts,
  SlashTypes,
  InteractionTypes,
  ComponentTypes,
  ButtonStyles,
} = require("./types/Interactions.js");
const { Presence } = require("./types/PresenceInfo");
const { ChannelTypes } = require("./types/ChannelTypes");

// Utils
const Collection = require("./utils/Collection");
const { resolveImage } = require("./utils/ImageResolver.js");

module.exports = {
  Client,
  ClientPresence,
  ClientUser,
  ShardManager,
  Shard,
  Base,
  User,
  Member,
  Guild,
  Channel,
  CategoryChannel,
  ThreadChannel,
  TextChannel,
  ThreadMember,
  VoiceChannel,
  Message,
  IntentsBitFields,
  Contexts,
  SlashTypes,
  InteractionTypes,
  ComponentTypes,
  ButtonStyles,
  Presence,
  ChannelTypes,
  Collection,
  resolveImage,
};
