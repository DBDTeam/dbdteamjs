import { ClientEvents } from "../common";
import { Collection } from "../utils/Collection";
type EventNames = keyof ClientEvents;

export class Listener<K extends EventNames> {
  public code: ClientEvents[K];
  public once: boolean;

  constructor(code: ClientEvents[K], once = false) {
    this.code = code;
    this.once = once;
  }
}

export class ListenerManager {
  listeners: Collection<EventNames, Array<Listener<EventNames>>>;

  constructor() {
    this.listeners = new Collection<EventNames, Array<Listener<EventNames>>>();
  }

  addListener<K extends EventNames>(eventName: K, listener: Listener<K>) {
    const listeners = this.listeners.get(eventName) || [];
    listeners.push(listener);
    this.listeners.set(eventName, listeners);
  }

  on<K extends EventNames>(eventName: K, listener: ClientEvents[K]) {
    this.addListener(eventName, new Listener<K>(listener, false));
  }

  once<K extends EventNames>(eventName: K, listener: ClientEvents[K]) {
    this.addListener(eventName, new Listener<K>(listener, true));
  }

  emit<K extends EventNames>(
    eventName: K,
    ...args: Parameters<ClientEvents[K]>
  ) {
    const listeners = this.listeners.get(eventName) || [];
    for (const listener of listeners) {
      // @ts-ignore
      listener.code(...args);
      if (listener.once) {
        this.removeListener(eventName, listener);
      }
    }
  }

  removeListener<K extends EventNames>(eventName: K, listener: Listener<K>) {
    const listeners = this.listeners.get(eventName) || [];
    const filteredListeners = listeners.filter((l) => l !== listener);
    this.listeners.set(eventName, filteredListeners);
  }

  removeAllListeners<K extends EventNames>(eventName: K) {
    this.listeners.delete(eventName);
    return this;
  }

  listenerCount<K extends EventNames>(eventName: K) {
    return this.listeners.filter((_, key) => key === eventName).toJSON()
      .length;
  }
}
