"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { readOnly, getAllStamps, setObj } = require("../utils/utils");
const { Channel } = require("./BaseChannel");
const Endpoints = require("../rest/Endpoints");
const { Message } = require("./Message");
const { MessagePayload } = require("./Payloads/MessagePayload");
const { ChannelMessageManager } = require("./Managers/ChannelMessageManager");
const { ThreadChannel } = require("./ThreadChannel");
// TODO
// class ForumChannel extends ThreadChannel {
//   #client;
//   constructor(data, client) {
//     super(data, client);
//   }
// }
// module.exports = { ForumChannel };
