<script>
    import { onMount, onDestroy } from 'svelte';

    var container;
    var dragging = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    var selected = false;

    // Event listeners need to be registered to the document when de-selecting the container.
    onMount(() =>
        document.addEventListener('mousedown', e => handleClick(e, container)));

    onDestroy(() =>
        document.removeEventListener('mousedown', e => handleClick(e, container)));
    
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

        dragging = true;

        // We register events to the document to give the mouse full control over the dragging.
        document.addEventListener("mousemove", e => drag(e, container))
        document.addEventListener("mouseup", e => dragEnd(e, container))
    }

    function dragEnd(event, container) {
        initialX = currentX;
        initialY = currentY;

        dragging = false;

        // When the drag ends, remove the event listeners.
        document.removeEventListener("mousemove", e => drag(e, container))
        document.removeEventListener("mouseup", e => dragEnd(e, container))
    }

    function drag(e, container) {
        if (!dragging) return;

        e.preventDefault();
      
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
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
    </div>
    <slot/>
</div>

<style>
    .selector {
        width: 100%;
        height: 20px;
        border-bottom: 1px solid black;
    }
    .drag {
        position: absolute;
        border: 0.5px solid;
        border-radius: 7px;
        background-color: #3a393a;
        margin: 0.5px;
    }

    .drag:hover {
        border-color: #adacac;;
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