<script context="module">
    export class Socket  {
        constructor(socket) {
            this.label = socket.label;
        }

        update() {
            if (!this.element) return;

            let boundingBox = this.element.getBoundingClientRect();
            this.x = boundingBox.left + boundingBox.width / 2;
            this.y = boundingBox.top + boundingBox.height / 2;
        }
    }
</script>

<script>
    export let socket;
</script>

<button bind:this={socket.element}></button>

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