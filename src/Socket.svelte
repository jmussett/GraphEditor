<script>
export let socket = null;

let self;

$: if (self) {
    // Performance of this isn't great, need to look at alternative.
    socket.update = () => socket.position = self.getBoundingClientRect();
    socket.update();
}

</script>

<button bind:this={self}></button>

<style>
    button {
        outline: none;
        box-sizing: content-box;
        border-radius: 10px;
        padding: 3px;
        width: 4px;
        height: 4px;
        margin: 1px auto;
        background-color: black;
        flex-shrink: 0;
        border: 0.5px solid #b3d8fc;
    }

    button:active {
        background-clip: content-box;
        background-color: #b3d8fc;
    }
</style>