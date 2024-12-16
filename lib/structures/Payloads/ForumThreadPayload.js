"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForumThreadPayload = void 0;
class ForumThreadPayload {
    name;
    auto_archieve_duration;
    rate_limit_per_user;
    message;
    applied_tags;
    files;
    constructor(object, files) {
        this.name = object.name;
        this.auto_archieve_duration = object.auto_archive_duration ?? 0;
        this.rate_limit_per_user = object.rate_limit_per_user ?? 0;
        this.message = object.message;
        this.files = files || [];
        this.applied_tags = object.applied_tags || [];
    }
    payload() {
        return this;
    }
}
exports.ForumThreadPayload = ForumThreadPayload;
