const { setObj } = require("../Utils/utils")

class CDN {
    constructor() {
        this.BASE_URL = (arg) => `https://cdn.discordapp.com${arg}`
        this.default_options = OPTIONS
    }
    //USERS & MEMBERS

    user_avatar(user,opts = {}) {
        var data = getInfo(opts, EXTENSIONS.GLOBAL, user?.avatar)
        
        return this.BASE_URL(`/avatars/${user?.id}/${user?.avatar}.${data.extension}?size=${data.size}`)
    }
    default_user_avatar(user) {
        const index = user?.discriminator === '0' ? Number(BigInt(user?.id) >> 22n) % 6 : user?.discriminator % 5

        return this.BASE_URL(`/embed/avatars/${index}.png`)
    }

    user_banner(user, opts) {
        var data = getInfo(opts, EXTENSIONS.GLOBAL, user?.banner)
        
        return this.BASE_URL(`/banners/${user?.id}/${user?.banner}.${data.extension}?size=${data.size}`)
    }
    
    user_avatar_decoration(user, opts) {
        var data = getInfo(opts, EXTENSIONS.NOTGIF, user?.avatarDecoration)

        return this.BASE_URL(`/avatars-decoration/${user?.id}/${user?.avatarDecoration}.${data.extension}?size=${data.size}`)
    }

    guild_member_avatar(member, opts) {
        var data = getInfo(opts, EXTENSIONS.GLOBAL, member?.avatar)

        return this.BASE_URL(`/guilds/${member?.guildId || member?.guild?.id}/users/${member?.id || member?.user?.id}/avatars/${member?.avatar}.${data.extension}?size=${data.size}`)
    }

    guild_member_banner(member, opts) {
        var data = getInfo(opts, EXTENSIONS.GLOBAL, member?.avatar)

        return this.BASE_URL(`/guilds/${member?.guildId || member?.guild?.id}/users/${member?.id || member?.user?.id}/banners/${member?.avatar}.${data.extension}?size=${data.size}`)
    }
 
    //EMOJIS

    custom_emoji(emoId, opts) {
        var data = getInfo(opts, EXTENSIONS.GLOBAL, emoji?.id)

        return this.BASE_URL(`/emojis/${emoId?.id || emoId}.${data.extension}?size=${data.size}`)
    }

    //GUILDS

    guild_icon(guild, opts) {
        var data = getInfo(opts, EXTENSIONS.GLOBAL, guild?.icon)
        
        return this.BASE_URL(`/icons/${guild?.id}/${guild?.icon}.${data.extension}`)
    }
    
    guild_splash(guild, opts) {
        var data = getInfo(opts, EXTENSIONS.NOTGIF, guild?.splash)

        return this.BASE_URL(`/splashs/${guild?.id}/${guild?.splash}.${data.extension}?size=${data.size}`)
    }
    
    guild_discovery(guild, opts) {
        var data = getInfo(opts, EXTENSIONS.NOTGIF, guild?.discoverySplash)

        return this.BASE_URL(`/discovery-splashes/${guild?.id}/${guild?.discoverySplash}.${data.extension}?size=${data.size}`)
    }
    
    guild_banner(guild, opts) {
        var data = getInfo(opts, EXTENSIONS.GLOBAL, guild?.banner)

        return this.BASE_URL(`/banners/${guild?.id}/${guild?.banner}.${data.extension}?size=${data.size}`)
    }
    
    sticker(stickerId, opts) {
        var data = getInfo(opts, EXTENSIONS.LOTTIE, stickerId)

        return this.BASE_URL(`/stickers/${stickerId}/${guild?.splash}.${data.extension}?size=${data.size}`)
    }
    
    roleIcon(role, opts) {
        var data = getInfo(opts, EXTENSIONS.NOTGIF, role.icon)

        return this.BASE_URL(`/role-icons/${role.id}/${role.icon}.${data.extension}?size=${data.size}`)
    }
}

module.exports = { CDN }

const OPTIONS = {
    size: 64,
    extension: "jpg",
    dynamic: false
}

const EXTENSIONS = {
    GLOBAL: ["jpg", "gif", "webp", "png"],
    DEFAULT: ["png"],
    NOTGIF: ["jpg", "webp", "png"],
    LOTTIE: ["png", "gif", "json"]
}

function validSize(n) {
    if (n <= 1) return 1;
    const p = Math.ceil(Math.log2(n));
    return Math.min(Math.pow(2, p), 4096);
}

function isAnimated(url) {
    return url.startsWith("a_")
}

function getInfo(opts, exten, d) {
    if(typeof opts !== "object" || !opts) { opts = {} } 

    var _opts = setObj(OPTIONS, opts)

    _opts.size = validSize(_opts.size)

    var extensions = exten
    _opts.extension = (_opts.dynamic === true ? "gif" : _opts?.extension?.replace(".", "")) || "png"
    
    if(!extensions.includes(_opts.extension?.toLowerCase())){
        _opts.extension = _opts.dynamic == true ? (isAnimated(d) == true ? "gif" : "png") : "png"
    } else {
        _opts.extension = _opts.extension == "gif" ? (_opts.dynamic == true ? (isAnimated(d) == true ? "gif" : "png") : "png") : _opts.extension
    }

    return _opts
}