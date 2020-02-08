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

    let selected = false;
    let isAbove = false;

    onMount(() => events.start = handleClick);
    onDestroy(() => events.start = e => {});

    function handleClick(e) {
        // When clicking, the mouse needs to be above the containers to be selected.
        if (isAbove) selected = true;
        else selected = false;
    }
    
    // Initial function for initiating drag
    function dragStart(e) {
        // event can be either touchstart or mousedown
        if (event.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        events.move = drag;
        events.stop = dragEnd;

        dragging = true;
    }

    function dragEnd(event) {
        initialX = currentX;
        initialY = currentY;

        dragging = false;

        // When the drag ends, remove the events.
        events.move = e => {};
        events.stop = e => {};
    }

    function drag(e) {
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
    bind:this={container}
    on:mouseenter={e => isAbove = true}
    on:mouseleave={e => isAbove = false}>
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