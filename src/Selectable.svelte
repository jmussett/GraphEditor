<script>
    import { onMount, onDestroy } from 'svelte';

    export let events;
    export let absolute = false;
    export let container = null;

    let selected = false;
    let isAbove = false;

    onMount(() => events.subscribe("click", (e) => {
        // When clicking, the mouse needs to be above the containers to be selected.
        if (isAbove) selected = true;
        else selected = false;
    }));
    
    onDestroy(() => events.unsubscribe("click"));
</script>

<div class="selectable" class:selected class:absolute
    bind:this={container}
    on:mouseenter={e => isAbove = true}
    on:mouseleave={e => isAbove = false}>
    <slot />
</div>

<style>

    .absolute {
        position: absolute;
    }

    .selectable {
        border: 0.5px solid;
        border-radius: 7px;
        padding: 0.5px;
        background-color: #3a393a;
    }

    .selectable:hover {
        border-color: #adacac;
        z-index: 1;
    }

    .selected {
        border-color: #8ca6c0;
        z-index: 1;
    }

    .selected:hover {
        border-color: #96b2ce;
        border-width: 1px;
        padding: 0px;
        margin: 0px;
    }
</style>