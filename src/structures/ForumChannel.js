const { readOnly, getAllStamps, setObj } = require("../utils/utils");
const { Channel } = require("./DefaultChannel");
const Endpoints = require("../rest/Endpoints");
const { Message } = require("./Message");
const { MessagePayload } = require("./Payloads/MessagePayload");
const { ChannelMessageManager } = require("./Managers/ChannelMessageManager");
const { ThreadChannel } = require("./ThreadChannel");

// class ForumChannel extends ThreadChannel {
//   #client;
//   constructor(data, client) {
//     super(data, client);
//   }
// }

// module.exports = { ForumChannel };
