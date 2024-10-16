"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const structures_1 = require("../../structures");
const Member_1 = require("../../structures/Member");
const Message_1 = require("../../structures/Message");
const User_1 = require("../../structures/User");
const utils_1 = require("../../utils/utils");
class Event {
    client;
    constructor(client) {
        this.client = client;
        this.client = client;
    }
    async getMessage(data) {
        const message = new Message_1.Message(data, this.client);
        await message.___patch();
        if (message.channel && "messages" in message.channel) {
            message?.channel?.messages?.cache?.set(data.id, message);
        }
        if (message.guild &&
            data.member &&
            !message.guild?.members?.cache.get(data.author.id)) {
            const member = new Member_1.Member({ ...data.member, id: data.author.id }, message.guild, this.client);
            message?.guild?.members?.cache.set(data.author.id, member);
            this.client.users.cache.set(data.author.id, member.user);
        }
        return message;
    }
    getChannel(data) {
        const channel = (0, utils_1.typeChannel)(data, this.client);
        channel.guild?.channels?.cache?.set(channel.id, channel);
        this.client?.channels?.cache?.set(channel.id, channel);
        return channel;
    }
    getUser(data) {
        const user = new User_1.User(data, this.client);
        this.client?.users?.cache?.set(user.id, user);
        return user;
    }
    getMember(data, guildId) {
        const member = new Member_1.Member({ ...data, id: data.user.id }, guildId, this.client);
        if ("user" in member) {
            this.client.users.cache.set(member.id, member.user);
        }
        member.guild.members?.cache.set(member.id, member);
        return member;
    }
    getGuild(data) {
        const guild = new structures_1.Guild(data, this.client);
        this.client.guilds.cache.set(guild.id, guild);
        return guild;
    }
    getRole(data, guildId) {
        const guild = this.client.guilds.cache.get(guildId);
        if (!guild)
            return;
        const role = new structures_1.GuildRole(data, guild, this.client);
        guild.roles?.cache.set(role.id, role);
        return role;
    }
}
exports.Event = Event;
