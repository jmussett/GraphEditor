import EventBroker from "./EventBroker";
import ReactivePosition from "./ReactivePosition";

export default class Draggable extends EventBroker {
    constructor(absolute) {
        super();

        this.position = new ReactivePosition();
        
        this.initialX = 0;
        this.initialY = 0;

        this.dragging = false;
        this.absolute = absolute || false;
    }

    dragStart(event) {
        event.preventDefault();

        // event can be either touchstart or mousedown
        if (event.type === "touchstart") {
            this.initialX = event.touches[0].clientX - this.position.x;
            this.initialY = event.touches[0].clientY - this.position.y;
        } else {
            this.initialX = event.clientX - this.position.x;
            this.initialY = event.clientY - this.position.y;
        }

        this.subscribe("move", e => this.drag(e));
        this.subscribe("stop", e => this.dragEnd(e));

        this.dragging = true;
    }

    dragEnd() {
        this.initialX = this.x;
        this.initialY = this.y;

        this.dragging = false;

        // When the drag ends, remove the events.
        this.unsubscribe("move");
        this.unsubscribe("stop");

        this.dispatch("dragEnd");
    }

    drag(event) {
        if (!this.dragging) return;

        event.preventDefault();

        let x, y;

        if (event.type === "touchmove") {
            x = event.touches[0].clientX;
            y = event.touches[0].clientY;
        } else {
            x = event.clientX;
            y = event.clientY;
        }

        if (this.absolute) {
            this.position.x = x;
            this.position.y = y;
        } else {
            this.position.x = x - this.initialX;
            this.position.y = y - this.initialY;
        }
    }
}