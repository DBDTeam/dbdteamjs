const { Base } = require("./Base")
const { GuildChannelManager } = require("./Managers/ChannelManager")
const { readOnly, getAllStamps } = require("../Utils/utils")
const { Collection } = require("../Utils/Collection");
const ENDPOINTS = require("../REST/Endpoints");
const { GuildMemberManager } = require("./Managers/UserManager");
const { GuildRolesManager } = require("./Managers/RolesManager");

class Guild extends Base {
    #client;
    constructor(data, client) {
        super(data.id)
        this.#client = client
        this.name = data.name
        this.id = data.id
        this.icon = data.icon
        this.permissions = data.permissions
        this.features = data.features
        this.approximateMemberCount = data.approximate_member_count
        this.approximatePresenceCount = data.approximate_presence_count
        this.roles = new GuildRolesManager(data, this.#client)
        this.emojis = new Collection()
        this.stickers = new Collection()
        this.channels = new GuildChannelManager(this.id, this.#client)
        this.voiceStates = new Collection()
        this.members = new GuildMemberManager(this.#client, data)
        this.created = getAllStamps(this.getCreatedAt)
        this._patch(data)
    }

    async _patch(data) {
        for(var i of data.voice_states){
            this.voiceStates.set(i.channel_id, i)
        }
        if(data.splash){ this.splash = data.splash }
        if(data.discovery_spash){ this.discoverySplash = data.discovery_spash }
        if(data.owner_id){ this.ownerId = data.owner_id }
        if(data.afk_channel_id){ this.afkChannel = data.afk_channel_id }
        if(data.afk_timeout){ this.afkTimeout = data.afk_timeout }
        if(data.widget_enable){ this.widget = data.widget_enable }
        if(data.widget_channel_id){ readOnly(this, "widgetChannelId", data.widget_channel_id) }
        if(data.verification_level){ this.verificationLevel = data.verification_level }
        if(data.default_message_notifications){ this.defaultMessageNotificationsLevel = data.default_message_notifications }
        if(data.explicit_content_filter) { this.explicitContentLevel = data.explicit_content_filter }
        if(data.roles?.[0]){ for(var i of data.roles){ this.roles.cache.set(i.id, i) } }
        if(data.emojis?.[0]){ for(var i of data.emojis){ this.emojis.set(i.id, i) } }
        if(data?.stickers?.[0]){ for(var i of data.stickers){ this.stickers.set(i.id, i) } }
        if(data.mfa_level){ this.mfaLevel = data.mfa_level }
        if(data.system_channel_id){ this.systemChannel = data.system_channel_id }
        if(this.systemChannel && data.system_channel_flags){ this.systemChannelFlags = data.system_channel_flags }
        if(data.rules_channel_id){ this.rulesChannel = this.rules_channel_id }
        if(data.max_members){ this.maxMembers = data.max_members }
        if(data.vanity_url_code){ this.vanityInvite = data.vanity_url_code }
        if(data.description){ this.descriptionn = data.description }
        if(data.banner){ this.banner = data.banner }
        if(data.premium_tier){ this.boostTier = data.premium_tier }
        if(data.premium_subscription_count){ this.boostCount = data.premium_subscription_count }
        if(data.preferred_locale){ this.preferredLocale = data.preferred_locale }
        if(data.public_updates_channel_id){ this.publicChnannelUpdates = this.public_updates_channel_id }
        if(data.welcome_screen){ this.welcomeScreen = data.welcome_screen }
        if(data.nsfw_level){ this.nsfwLevel = data.nsfw_level }
    }
}

module.exports = { Guild }