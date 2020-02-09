<script>
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
    
    // Parent events need to be passed down to allow component to be dragged. 
    export let events;

    export let title = "";

    let self;

    // The "draggable" container element can be passed in as a dependancy
    // if this component needs a wrapper.
    export let container = null;

    export let x = 0;
    export let y = 0;

    $: if (!container) container = self;
    $: if (container) container.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";

    let dragging = false;
    let initialX;
    let initialY;

    // Initial function for initiating drag
    function dragStart(e) {
        
        e.preventDefault();

        // event can be either touchstart or mousedown
        if (event.type === "touchstart") {
            initialX = e.touches[0].clientX - x;
            initialY = e.touches[0].clientY - y;
        } else {
            initialX = e.clientX - x;
            initialY = e.clientY - y;
        }

        events.move = drag;
        events.stop = dragEnd;

        dragging = true;
    }

    function dragEnd(event) {
        initialX = x;
        initialY = y;

        dragging = false;

        // When the drag ends, remove the events.
        events.move = e => {};
        events.stop = e => {};
    }

    function drag(e) {
        if (!dragging) return;

        e.preventDefault();

        if (e.type === "touchmove") {
            x = e.touches[0].clientX - initialX;
            y = e.touches[0].clientY - initialY;
        } else {
            x = e.clientX - initialX;
            y = e.clientY - initialY;
        }

        // Inform any listening nodes that the component is being dragged.
        dispatch('drag');
    }

</script>

<div class="drag" bind:this={self}>
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
        margin: 0.5px;
        min-width: 100px;
        min-height: 50px;
        user-select: none;
    }

    
</style>