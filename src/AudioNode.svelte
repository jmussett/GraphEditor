<script>
    import Draggable from './Draggable.svelte';
    import Socket from './Socket.svelte';
</script>

<Draggable>
    <div class="audioNode">
        <div class="inputs">
            <ul class="sockets">
                <li><Socket /><span>Test 1</span></li>
            </ul>
        </div>
        <div class="outputs">
            <ul class="sockets">
                <li><span>Test 2</span><Socket /></li>
                <li><span>Test 3</span><Socket /></li>
            </ul>
        </div>
    </div>
</Draggable>

<style>
	.audioNode {
        width: 100%;
        position: relative;
        display: flex;
    }

    .inputs, .outputs {
        width: 50%;
        padding: 5px 2px;
    }

    .sockets {
        margin: 0;
        padding: 0;
        list-style: none;
        white-space: nowrap;
        width: 100%;
        position: sticky;
    }
    
    .sockets li {
        display: inline-flex;
        width: 100%;
        height: 20px;
        line-height: 20px;
        align-items: center;
    }

    .sockets li span {
        width: 100% ;
        color: #c0bfbf;
        font-size: x-small;
        padding: 0 3%;
        overflow-x: hidden;
        text-overflow: ellipsis;
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