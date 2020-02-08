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

	let move = e => graph.nodes.forEach(n => n.events && n.events.move && n.events.move(e));
	let start = e => graph.nodes.forEach(n => n.events &&  n.events.start && n.events.start(e));
	let stop = e => graph.nodes.forEach(n => n.events &&  n.events.stop && n.events.stop(e));
</script>

<div
	on:mousemove={e => move(e)}
	on:mousedown={e => start(e)}
	on:mouseup={e => stop(e)}
	on:touchmove={e => move(e)}
	on:touchstart={e => start(e)}
	on:touchend={e => stop(e)}
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