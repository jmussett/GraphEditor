<script>
    import Draggable from './Draggable.svelte';
    import Selectable from './Selectable.svelte';
    import Socket from './Socket.svelte';

    export let node;

    // The top level container needs to be shared with the Draggable
    // component to allow it to be dragged.
    let container;

    node.events = {};

    // We every time the node is dragged,
    // we want to update the position of all child sockets.
    function drag() {
        node.inputs.forEach(i => i.update && i.update());
        node.outputs.forEach(o => o.update && o.update());
    }
</script>

<Selectable bind:events={node.events} bind:container={container} absolute={true} >
    <Draggable bind:events={node.events} bind:x={node.x} bind:y={node.y} on:drag={drag} container={container} title={node.name}>
        <div class="node">
            {#if node.inputs.length > 0}
                <div class="inputs">
                    <label>Inputs</label>
                    <ul class="sockets">
                    {#each node.inputs as { label }, i}
                        <li>
                            <Socket bind:socket={node.inputs[i]} />
                            <span>{label}</span>
                        </li>
                    {/each}
                    </ul>
                </div>
            {/if}
            {#if node.outputs.length > 0}
                <div class="outputs">
                    <label>Outputs</label>
                    <ul class="sockets">
                    {#each node.outputs as { label }, i}
                        <li>
                            <span>{label}</span>
                            <Socket bind:socket={node.outputs[i]} />
                        </li>
                    {/each}
                    </ul>
                </div>
            {/if}
        </div>
    </Draggable>
</Selectable>

<style>
	.node {
        width: 100%;
        position: relative;
        display: flex;
        user-select: none;
    }

    .inputs, .outputs {
        width: 100%;
        padding: 0 3px;
    }

    label {
        color: #dddddd;
        font-size: x-small;
        display: block;
        text-align: center;
    }

    .sockets {
        margin: 0;
        padding: 0;
        list-style: none;
        width: 100%;
    }
    
    .sockets li {
        display: inline-flex;
        width: 100%;
        height: 20px;
        line-height: 10px;
        align-items: center;
    }

    .sockets li span {
        width: 100%;
        color: #c0bfbf;
        font-size: x-small;
        padding: 0 5px;
    }

    .inputs {
        border-right: 0.5px solid black;
    }

    .outputs {
        border-left: 0.5px solid black;
    }

    .inputs, .inputs .sockets, .inputs li {
        float: left;
        text-align: left;
    }

    .outputs, .outputs .sockets, .outputs li {
        float: right;
        text-align: right;
    }
</style>