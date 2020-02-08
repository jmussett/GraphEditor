<script>
	import AudioNode from "./AudioNode.svelte";

	var graph = {
		nodes: [
			{
				name: "Test1",
				inputs: [],
				outputs: [
					{
						index: 0,
						label: "Test"
					}
				]
			},
			{
				name: "Test2",
				inputs: [
					{
						"index": 0,
						"label": "Test"
					}
				],
				outputs: []
			}
		],
		relations: [
			{
				sourceNode: "Test1",
				sourceIndex: 0,
				targetNode: "Test2",
				targetIndex: 0
			}
		]
	};

	let click = e => graph.nodes.forEach(n => n.events &&  n.events.click && n.events.click(e));
	let move = e => graph.nodes.forEach(n => n.events && n.events.move && n.events.move(e));
	let stop = e => graph.nodes.forEach(n => n.events &&  n.events.stop && n.events.stop(e));
</script>

<div
	on:touchstart={e => click(e)}
	on:mousedown={e => click(e)}
	on:touchmove={e => move(e)}
	on:mousemove={e => move(e)}
	on:touchend={e => stop(e)}
	on:mouseup={e => stop(e)}
>
	{#each graph.nodes as node}
	<AudioNode node={node}></AudioNode>
	{/each}
</div>

<style>
	div {
		background-color: #201f20;
		width: 100%;
		height: 100%;
	}
</style>