"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedEmitter = void 0;
const Collection_1 = require("./Collection");
class TypedEmitter {
    listeners = new Collection_1.Collection();
    on(event, listener) {
        const existing = this.listeners.get(event) || [];
        this.listeners.set(event, [...existing, listener]);
        return this;
    }
    once(event, listener) {
        const onceWrapper = ((...args) => {
            this.off(event, onceWrapper);
            listener(...args);
        });
        this.on(event, onceWrapper);
        return this;
    }
    off(event, listener) {
        const existing = this.listeners.get(event) || [];
        this.listeners.set(event, existing.filter((l) => l !== listener));
        return this;
    }
    removeAllListeners(event) {
        if (event) {
            this.listeners.delete(event);
        }
        else {
            this.listeners.clear();
        }
        return this;
    }
    emit(event, ...args) {
        const listeners = this.listeners.get(event);
        if (!listeners || listeners.length === 0)
            return false;
        listeners.forEach((listener) => {
            listener(...args);
        });
        return true;
    }
    listenerCount(event) {
        const listeners = this.listeners.get(event);
        return listeners ? listeners.length : 0;
    }
    eventNames() {
        return Array.from(this.listeners.keys());
    }
}
exports.TypedEmitter = TypedEmitter;
