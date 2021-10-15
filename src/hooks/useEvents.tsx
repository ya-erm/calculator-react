export class EventEmitter {
    events: { [name: string]: Array<(value: any) => void> };

    constructor() {
        this.events = {};
    }

    subscribe<T>(name: string, callback: (value: T) => void) {
        if (!this.events[name]) {
            this.events[name] = [];
        }

        this.events[name].push(callback);

        return () => this.unsubscribe(name, callback);
    }

    unsubscribe<T>(name: string, callback: (value: T) => void) {
        this.events[name] = this.events[name]?.filter((cb: any) => cb !== callback);
    }

    emit<T>(name: string, data: T) {
        const callbacks = this.events[name];
        callbacks?.forEach((cb) => cb.call(null, data));
    }
}

export const EVENT_EMITTER = new EventEmitter();
