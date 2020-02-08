<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';

    // Parent events need to be passed down to allow component to be dragged. 
    export let events = {
        move: e => {},
        start: e => {},
        stop: e => {},
    }

    export let title = "";

    let container;
    let dragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    var selected = false;

    onMount(() => events.start = e => handleClick(e, container));
    onDestroy(() => events.start = e => {});
    
    function handleClick(e, container) {
        var rect = container.getBoundingClientRect();
        
        // When clicking, the mouse needs to be within the containers bounds to be selected.
        var withinBounds = e.clientX >= rect.left && e.clientX <= rect.right &&
                           e.clientY >= rect.top && e.clientY <= rect.bottom;
        
        if (withinBounds) selected = true;
        else selected = false;
    }
    
    // Initial function for initiating drag
    function dragStart(event) {
        // event can be either touchstart or mousedown
        if (event.type === "touchstart") {
            initialX = event.touches[0].clientX - xOffset;
            initialY = event.touches[0].clientY - yOffset;
        } else {
            initialX = event.clientX - xOffset;
            initialY = event.clientY - yOffset;
        }

        events.move = e => drag(e, container);
        events.stop = e => dragEnd(e, container);

        dragging = true;

        // We register events to the window to give the mouse full control over the dragging.
        
    }

    function dragEnd(event, container) {
        initialX = currentX;
        initialY = currentY;

        dragging = false;

        // When the drag ends, remove the event listeners.
        events.move = e => drag(e, container);
        events.stop = e => dragEnd(e, container);
    }

    function drag(e, container) {
        if (!dragging) return;

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        // Apply translate transform to the container.
        container.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0)";
    }

</script>

<div class="drag"
    class:selected
    bind:this={container}>
    <div class="selector"
        on:touchstart={dragStart}
        on:mousedown={dragStart}>
        <label>{title}</label>
    </div>
    <slot/>
</div>

<style>
    .selector {
        width: 100%;
        height: 20px;
        border-bottom: 1px solid black;
    }

    label {
        color: #dddddd;
        font-size: small;
        display: block;
        text-align: center;
    }

    .drag {
        position: absolute;
        border: 0.5px solid;
        border-radius: 7px;
        background-color: #3a393a;
        margin: 0.5px;
        min-width: 100px;
        min-height: 50px;
    }

    .drag:hover {
        border-color: #adacac;
    }

    .selected:hover {
        border-color: #96b2ce;
        border-width: 1px;
        margin: 0px;
    }

    .selected {
        border-color: #8ca6c0;
        z-index: 1;
    }
</style>