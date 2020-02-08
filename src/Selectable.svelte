<script>
    import { onMount, onDestroy } from 'svelte';

    export let events;
    export let absolute = false;
    export let container = null;

    let selected = false;
    let isAbove = false;

    onMount(() => events.click = handleClick);
    onDestroy(() => events.click = e => {});

    function handleClick(e) {
        // When clicking, the mouse needs to be above the containers to be selected.
        if (isAbove) selected = true;
        else selected = false;
    }
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