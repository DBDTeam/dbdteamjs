// Structures
const { Client } = require("./structures/Client/Client");
const { ClientPresence } = require("./structures/Client/ClientPresence");
const { ClientUser } = require("./structures/Client/ClientUser");
const { ShardManager, Shard } = require("./structures/Sharding");
const { Base } = require("./structures/Base");
const { User } = require("./structures/User");
const { Member } = require("./structures/Member");
const { Guild } = require("./structures/Guild");
const { Channel } = require("./structures/DefaultChannel");
const { CategoryChannel } = require("./structures/CategoryChannel");
const { ThreadChannel } = require("./structures/ThreadChannel");
const { TextChannel } = require("./structures/TextChannel");
const { ThreadMember } = require("./structures/ThreadMember");
const { VoiceChannel } = require("./structures/VoiceChannel");

//Types
const { IntentBitFields } = require("./structures/Flags/Intents.js")
const { SlashTypes, InteractionTypes, ComponentTypes, ButtonStyles } = require("./Types/Interactions.js")
const { Presence } = require("./Types/PresenceInfo")
const { ChannelTypes } = require("./Types/ChannelTypes")

// Utils
const Collection = require("./Utils/Collection");
const { resolveImage } = require("./Utils/ImageResolver.js")

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
  IntentBitFields,
  SlashTypes,
  InteractionTypes,
  ComponentTypes,
  ButtonStyles,
  Presence,
  ChannelTypes,
  Collection,
  resolveImage
};