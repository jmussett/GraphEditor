import EventBroker from "./EventBroker";
import { writable } from 'svelte/store';

export default class Draggable extends EventBroker {
    constructor() {
        super();
        this.reactiveX = writable(0);
        this.reactiveY = writable(0);
        this.reactiveX.subscribe(value => this._x = value);
        this.reactiveY.subscribe(value => this._y = value);

        this.initialX = 0;
        this.initialY = 0;
    }

    dragStart(event, container) {
        event.preventDefault();

        this.container = container;

        // event can be either touchstart or mousedown
        if (event.type === "touchstart") {
            this.initialX = event.touches[0].clientX - this.x;
            this.initialY = event.touches[0].clientY - this.y;
        } else {
            this.initialX = event.clientX - this.x;
            this.initialY = event.clientY - this.y;
        }

        this.subscribe("move", e => this.drag(e));
        this.subscribe("stop", e => this.dragEnd(e));

        this.dragging = true;
    }

    dragEnd() {
        this.initialX = this.x;
        this.initialY = this.y;

        this.dragging = false;
        this.container = null;

        // When the drag ends, remove the events.
        this.unsubscribe("move");
        this.unsubscribe("stop");
    }

    drag(event) {
        if (!this.dragging) return;

        event.preventDefault();

        if (event.type === "touchmove") {
            this.x = event.touches[0].clientX - this.initialX;
            this.y = event.touches[0].clientY - this.initialY;
        } else {
            this.x = event.clientX - this.initialX;
            this.y = event.clientY - this.initialY;
        }
    }

    // since x and y are reactive, we define explicit setters and getters.

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