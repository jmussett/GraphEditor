<script>
    // Parent events need to be passed down to allow component to be dragged. 
    export let events;

    export let title = "";

    let self;

    // The "draggable" container element can be passed in as a dependancy
    // if this component needs a wrapper.
    export let container = null;

    $: if(!container) container = self;

    let dragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

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
    }

    
</style>