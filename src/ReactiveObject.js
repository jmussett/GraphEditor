import { writable } from 'svelte/store';

export default class ReactiveObject {
    constructor(value) {
        this._value = value;
        this.reactive = writable(value);

        return new Proxy(this, {
            get: (target, property) => {
                if (property == "reactive")
                    return target.reactive;

                // If we're calling the 'dirty' function, mark object as dirty by setting it's reactive value
                if (property == "dirty") {
                    this.reactive.set(target._value);
                    return () => undefined;
                }
               
                // If the property is a function, we need to bind the correct 'this' value
                if (typeof target._value[property] == 'function')
                    
                    return target._value[property].bind(target._value);
                else
                    return target._value[property];
            },
            set: (target, property, value) => {
                target._value[property] = value;

                this.reactive.set(target._value);

                return true;
            }
        });
    }
}