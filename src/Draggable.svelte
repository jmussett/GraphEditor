<script>
    import { onMount, onDestroy } from 'svelte';

    export var title = "";

    var container;
    var dragging = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    var selected = false;

    // Event listeners need to be registered to the window when de-selecting the container.
    onMount(() => {
        window.addEventListener('mousedown', e => handleClick(e, container));
        window.addEventListener('touchstart', e => handleClick(e, container));
    });
    
    onDestroy(() => {
        window.removeEventListener('mousedown', e => handleClick(e, container));
        window.removeEventListener('touchstart', e => handleClick(e, container));
    });
    
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

            window.addEventListener("touchmove", e => drag(e, container));
            window.addEventListener("touchend", e => dragEnd(e, container));
        } else {
            initialX = event.clientX - xOffset;
            initialY = event.clientY - yOffset;

            window.addEventListener("mousemove", e => drag(e, container));
            window.addEventListener("mouseup", e => dragEnd(e, container));
        }

        dragging = true;

        // We register events to the window to give the mouse full control over the dragging.
        
    }

    function dragEnd(event, container) {
        initialX = currentX;
        initialY = currentY;

        dragging = false;

        // When the drag ends, remove the event listeners.
        window.removeEventListener("mousemove", e => drag(e, container));
        window.removeEventListener("mouseup", e => dragEnd(e, container));
        window.removeEventListener("touchmove", e => drag(e, container));
        window.removeEventListener("touchend", e => dragEnd(e, container));
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