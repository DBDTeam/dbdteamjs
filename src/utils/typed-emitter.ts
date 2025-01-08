import { Collection } from "./Collection";

export type ListenerSignature<L> = {
    [Event in keyof L]: (...args: any[]) => void;
};

export type DefaultListener = {
    [event: string]: (...args: any[]) => void;
};

export class TypedEmitter<L extends ListenerSignature<L> = DefaultListener> {
    protected listeners: Collection<keyof L, Function[]> = new Collection();

    on<Event extends keyof L>(event: Event, listener: L[Event]): this {
        const existing = this.listeners.get(event) || [];
        this.listeners.set(event, [...existing, listener]);
        return this;
    }

    once<Event extends keyof L>(event: Event, listener: L[Event]): this {
        const onceWrapper: L[Event] = ((...args: Parameters<L[Event]>) => {
            this.off(event, onceWrapper);
            listener(...args);
        }) as L[Event];
        this.on(event, onceWrapper);
        return this;
    }

    off<Event extends keyof L>(event: Event, listener: L[Event]): this {
        const existing = this.listeners.get(event) || [];
        this.listeners.set(event, existing.filter((l) => l !== listener));
        return this;
    }

    removeAllListeners(event?: keyof L): this {
        if (event) {
            this.listeners.delete(event);
        } else {
            this.listeners.clear();
        }
        return this;
    }

    emit<Event extends keyof L>(event: Event, ...args: Parameters<L[Event]>): boolean {
        const listeners = this.listeners.get(event);
        if (!listeners || listeners.length === 0) return false;

        listeners.forEach((listener) => {
            listener(...args);
        });
        return true;
    }

    listenerCount(event: keyof L): number {
        const listeners = this.listeners.get(event);
        return listeners ? listeners.length : 0;
    }

    eventNames(): (keyof L)[] {
        return Array.from(this.listeners.keys());
    }
}
