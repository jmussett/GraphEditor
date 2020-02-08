<script>
	import AudioNode from "./AudioNode.svelte";

	let events = {
        move: e => {},
        start: e => {},
        stop: e => {}
    }

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
	
</script>

<div
	on:mousemove={e => events.move(e)}
	on:mousedown={e => events.start(e)}
	on:mouseup={e => events.stop(e)}
	on:touchmove={e => events.move(e)}
	on:touchstart={e => events.start(e)}
	on:touchend={e => events.stop(e)}
>
	{#each graph.nodes as node}
	<AudioNode node={node} events={events}></AudioNode>
	{/each}
</div>

<style>
	div {
		background-color: #201f20;
		width: 100%;
		height: 100%;
	}
</style>