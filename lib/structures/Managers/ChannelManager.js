"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelManager = void 0;
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Collection_1 = require("../../utils/Collection");
const utils_1 = require("../../utils/utils");
class ChannelManager {
    #client;
    cache;
    /**
     * Constructs a new ChannelManager instance.
     * @param {Client} client - The client instance to interact with the Discord API.
     */
    constructor(client) {
        this.#client = client;
        this.cache = new Collection_1.Collection();
    }
    /**
     * Fetches a specific channel by its ID.
     * @param {string} id - The ID of the channel to fetch.
     * @returns {Promise<Channel | null>} - The fetched channel or null if an error occurs.
     */
    async fetch(id) {
        const response = await this.#client.rest.request("GET", Endpoints.Channel(id), true);
        if (!response || response.status !== 200)
            return response;
        return await (0, utils_1.typeChannel)(response.data, this.#client);
    }
}
exports.ChannelManager = ChannelManager;
