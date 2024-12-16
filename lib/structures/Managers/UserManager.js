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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const Endpoints = __importStar(require("../../rest/Endpoints"));
const Collection_1 = require("../../utils/Collection");
const User_1 = require("../User");
/**
 * Manages user-related operations such as fetching user data.
 */
class UserManager {
    #client;
    cache;
    /**
     * Constructs a new UserManager.
     * @param client - The client instance.
     */
    constructor(client) {
        this.#client = client;
        this.cache = new Collection_1.Collection();
    }
    /**
     * Fetches a user by their ID.
     * @param userId - The ID of the user to fetch.
     * @returns The fetched User instance or an error response.
     */
    async fetch(userId) {
        const result = await this.#client.rest.request("GET", Endpoints.User(userId), true);
        if (result?.error || !result || !result?.data) {
            return result;
        }
        else {
            var x = new User_1.User(result.data, this.#client);
            return x;
        }
    }
}
exports.UserManager = UserManager;
