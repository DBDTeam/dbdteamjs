"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCollector = exports.CollectorDefaultCodes = void 0;
const Collection_1 = require("../../utils/Collection");
const typed_emitter_1 = require("../../utils/typed-emitter");
var CollectorDefaultCodes;
(function (CollectorDefaultCodes) {
    CollectorDefaultCodes[CollectorDefaultCodes["TIME_EXPIRED"] = 1001] = "TIME_EXPIRED";
    CollectorDefaultCodes[CollectorDefaultCodes["LIMIT_REACHED"] = 1000] = "LIMIT_REACHED";
})(CollectorDefaultCodes || (exports.CollectorDefaultCodes = CollectorDefaultCodes = {}));
class BaseCollector extends typed_emitter_1.TypedEmitter {
    filter;
    items;
    options;
    stopped;
    client;
    timeoutId;
    eventName;
    listener;
    constructor(client, filter, options = {}, eventName) {
        super();
        this.filter = filter;
        this.options = options;
        this.items = new Collection_1.Collection();
        this.stopped = false;
        this.client = client;
        this.eventName = eventName;
        this.initializeTimeout();
    }
    initializeTimeout() {
        if (this.options.time) {
            this.timeoutId = setTimeout(() => {
                this.stop(CollectorDefaultCodes.TIME_EXPIRED);
            }, this.options.time);
        }
    }
    get count() {
        return this.items.size;
    }
    stop(code) {
        if (this.stopped)
            return;
        this.cleanup();
        this.stopped = true;
        this.emit("end", code);
    }
    cleanup() {
        this.client.off(this.eventName, this.listener);
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    }
}
exports.BaseCollector = BaseCollector;
