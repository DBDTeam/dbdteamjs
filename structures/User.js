const { readOnly } = require("../Utils/utils");
const { Base } = require("./Base");

class User extends Base {
    #client;
    constructor(data, client){
        super(data.id);
        this.#client = client;
        this.id = data.id;
        this.bot = null;
        this.system = null;
        this.flags = null;

        readOnly(this, "displayAvatarUrl", this.avatarUrl);
        readOnly(this, "displayDefaultAvatarUrl", this.defaultAvatarUrl);
        readOnly(this, "displayBannerUrl", this.bannerUrl);
        this._patch(data)
    }
    _patch(data) {
        if ('username' in data) {
            this.username = data.username;
        }
        
        if ('global_name' in data) {
            this.globalName = data.global_name;
        }
        
        if ('bot' in data) {
            this.bot = !!data.bot;
        } else if (!this.partial && typeof this.bot !== 'boolean') {
            this.bot = false;
        }
        
        if ('discriminator' in data) {
            this.discriminator = data.discriminator;
        }

        if ('avatar' in data) {
            this.avatar = data.avatar;
        }
        
        if ('banner' in data) {
            this.banner = data.banner;
        }
        
        if ('avatar' in data) {
            this.avatar = data.avatar;
        }
        
        if ('accent_color' in data) {
            this.accentColor = data.accent_color;
        }
        
        if ('system' in data) {
            this.system = !!data.system;
        } else if (!this.partial && typeof this.system !== 'boolean') {
            this.system = false;
        }
        
        if ('public_flags' in data) {
            this.flags = data.public_flags;
        }
        
        if ('avatar_decoration' in data) {
            this.avatarDecoration = data.avatar_decoration;
        }
    }

    get partial() {
        return typeof this.username !== 'string';
  	}

    avatarUrl(opts) {
        if (!this.id) return;
        return this.#client.rest.cdn.user_avatar(this, opts);
    }

    defaultAvatarUrl() {
        if (!this.id) return;
        return this.#client.rest.cdn.default_user_avatar(this);
    }

    bannerUrl(opts) {
        if (!this.id) return;
        return this.#client.rest.cdn.user_banner(this, opts);
    }
}

module.exports = { User }