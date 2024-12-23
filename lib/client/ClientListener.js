"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenerManager = exports.Listener = void 0;
const Collection_1 = require("../utils/Collection");
class Listener {
    code;
    once;
    constructor(code, once = false) {
        this.code = code;
        this.once = once;
    }
}
exports.Listener = Listener;
class ListenerManager {
    listeners;
    constructor() {
        this.listeners = new Collection_1.Collection();
    }
    addListener(eventName, listener) {
        const listeners = this.listeners.get(eventName) || [];
        listeners.push(listener);
        this.listeners.set(eventName, listeners);
    }
    on(eventName, listener) {
        this.addListener(eventName, new Listener(listener, false));
    }
    once(eventName, listener) {
        this.addListener(eventName, new Listener(listener, true));
    }
    emit(eventName, ...args) {
        const listeners = this.listeners.get(eventName) || [];
        for (const listener of listeners) {
            // @ts-ignore
            listener.code(...args);
            if (listener.once) {
                this.removeListener(eventName, listener);
            }
        }
    }
    removeListener(eventName, listener) {
        const listeners = this.listeners.get(eventName) || [];
        const filteredListeners = listeners.filter((l) => l !== listener);
        this.listeners.set(eventName, filteredListeners);
    }
    removeAllListeners(eventName) {
        this.listeners.delete(eventName);
        return this;
    }
    listenerCount(eventName) {
        return this.listeners.filter((_, key) => key === eventName).toJSON()
            .length;
    }
}
exports.ListenerManager = ListenerManager;
