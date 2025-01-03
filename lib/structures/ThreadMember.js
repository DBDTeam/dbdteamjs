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
exports.ThreadMember = void 0;
const ClientError_1 = require("../client/errors/ClientError");
const ErrorList_1 = require("../client/errors/ErrorList");
const interfaces_1 = require("../common/interfaces");
const Endpoints = __importStar(require("../rest/Endpoints"));
const utils_1 = require("../utils/utils");
/**
 * @typedef {import('./TextChannel').TextChannel} TextChannel
 * @typedef {import('./VoiceChannel').VoiceChannel} VoiceChannel
 * @typedef {import('./ThreadChannel').ThreadChannel} ThreadChannel
 * @typedef {import('./Guild').Guild} Guild
 * @typedef {import('../client/Client').Client} Client
 */
class ThreadMember {
    #client;
    id;
    guild;
    flags;
    member;
    threadId;
    thread;
    joined;
    remove;
    /**
     * Represents a Thread Member
     * @param {object} data - The Thread Member payload
     * @param {Guild} guild - The Guild where the user is
     * @param {Client} client - The Client
     */
    constructor(data, guild, client) {
        this.thread = null;
        this.#client = client;
        /**
         * The thread user ID
         * @type {string}
         */
        this.id = data?.user_id;
        /**
         * The Guild this member is from
         * @type {Guild}
         */
        this.guild = guild;
        /**
         * The flags of the Thread Member
         * @type {number}
         */
        this.flags = data?.flags || 0;
        /**
         * The Member of the Thread User.
         * @type {Member}
         */
        this.member = this.guild?.members?.cache.get(this.id);
        /**
         * The ID of the Thread
         * @type {string}
         */
        this.threadId = data?.id;
        if (this.#client.channels.cache.get(data?.id)) {
            /**
             * The Thread Channel (if it can be finded in the cache)
             * @type {ThreadChannel}
             */
            this.thread = this.#client.channels.cache.get(data?.id);
        }
        /**
         * The time information when the user joined to the Thread
         */
        this.joined = utils_1.Utilities.getAllStamps(data?.joined_timestamp);
        /**
         * Removes the user (alias of {@link ThreadMember.kick})
         * @async
         * @readonly
         */
        this.remove = () => this.kick();
    }
    /**
     * Kick the ThreadMember from the ThreadChannel. Returns true when success, and a object when error.
     * @async
     * @returns {Promise<Object | boolean>}
     */
    async kick() {
        const me = this.guild.members.me;
        if (!me.permissions.has([interfaces_1.PermissionNames.ManageThreads]))
            throw new ClientError_1.ClientError(ErrorList_1.ErrorNames.MissingPermissions, "ManageThreads");
        const response = await this.#client.rest.request("DELETE", Endpoints.ChannelThreadMember(this.threadId, this.id), true);
        return response?.error ? response : true;
    }
    static type = "ThreadMember";
}
exports.ThreadMember = ThreadMember;
