"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bucket = void 0;
class Bucket {
    limit;
    remaining;
    resetTime;
    queue;
    processing;
    constructor(limit) {
        this.limit = limit;
        this.remaining = limit;
        this.resetTime = Date.now() + 1000;
        this.queue = [];
        this.processing = false;
    }
    addRequest(fn) {
        this.queue.push(fn);
        this.processQueue();
    }
    async processQueue() {
        if (this.processing)
            return;
        this.processing = true;
        while (this.queue.length > 0) {
            if (this.remaining <= 0) {
                await this.waitUntilReset();
            }
            const nextRequest = this.queue.shift();
            if (nextRequest) {
                this.remaining--;
                nextRequest();
            }
        }
        this.processing = false;
    }
    waitUntilReset() {
        const delay = this.resetTime - Date.now();
        return new Promise((resolve) => {
            setTimeout(() => {
                this.reset();
                resolve();
            }, Math.max(delay, 0));
        });
    }
    reset() {
        this.remaining = this.limit;
        this.resetTime = Date.now() + 1000;
    }
}
exports.Bucket = Bucket;
