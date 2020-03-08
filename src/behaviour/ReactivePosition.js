import { writable } from 'svelte/store';

export default class ReactivePosition {
    constructor(x, y) {
        this._x = x || 0;
        this._y = y || 0;

        this.reactiveX = writable(0);
        this.reactiveY = writable(0);
        this.reactiveX.subscribe(value => this._x = value);
        this.reactiveY.subscribe(value => this._y = value);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(value) {
        this.reactiveX.set(value);
    }

    set y(value) {
        this.reactiveY.set(value);
    }
}