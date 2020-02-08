<script>
    import Draggable from './Draggable.svelte';
    import Socket from './Socket.svelte';

    export let node;
    
    node.events = {};
</script>

<Draggable title={node.name} events={node.events}>
    <div class="audioNode">
        {#if node.inputs.length > 0}
        <div class="inputs">
            <label>Inputs</label>
            <ul class="sockets">
            {#each node.inputs as { position, label }}
                <li><Socket bind:position /><span>{label}</span></li>
            {/each}
            </ul>
        </div>
        {/if}
        {#if node.outputs.length > 0}
        <div class="outputs">
            <label>Outputs</label>
            <ul class="sockets">
            {#each node.outputs as { position, label }}
                <li><span>{label}</span><Socket bind:position/></li>
            {/each}
            </ul>
        </div>
        {/if}
    </div>
</Draggable>

<style>
	.audioNode {
        width: 100%;
        position: relative;
        display: flex;
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