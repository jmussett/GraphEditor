export default class EventBroker {
    constructor() {
        this.events = {}
    }
    unsubscribe(name) {
        delete this.events[name];
    }
    subscribe(name, callback) {
        if (callback instanceof Function)
            this.events[name] = callback;
        else
            throw new Error(`'${name}' callback is not a functions`)
    }
    dispatch(name, params) {
        if (this.events[name] instanceof Function)
            this.events[name](params);
    }
}