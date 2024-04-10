"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresencePlatforms = exports.PresenceTypes = exports.PresenceStatus = void 0;
var PresenceStatus;
(function (PresenceStatus) {
    PresenceStatus["Online"] = "online";
    PresenceStatus["Idle"] = "idle";
    PresenceStatus["DND"] = "dnd";
    PresenceStatus["Invisible"] = "invisible";
})(PresenceStatus || (exports.PresenceStatus = PresenceStatus = {}));
;
var PresenceTypes;
(function (PresenceTypes) {
    PresenceTypes[PresenceTypes["Game"] = 0] = "Game";
    PresenceTypes[PresenceTypes["Streaming"] = 1] = "Streaming";
    PresenceTypes[PresenceTypes["Listening"] = 2] = "Listening";
    PresenceTypes[PresenceTypes["Watching"] = 3] = "Watching";
    PresenceTypes[PresenceTypes["Custom"] = 4] = "Custom";
    PresenceTypes[PresenceTypes["Competing"] = 5] = "Competing";
})(PresenceTypes || (exports.PresenceTypes = PresenceTypes = {}));
;
var PresencePlatforms;
(function (PresencePlatforms) {
    PresencePlatforms["Desktop"] = "desktop";
    PresencePlatforms["Web"] = "web";
    PresencePlatforms["Mobile"] = "mobile";
})(PresencePlatforms || (exports.PresencePlatforms = PresencePlatforms = {}));
;
