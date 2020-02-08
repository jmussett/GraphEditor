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
	
</script>

<main>
	{#each graph.nodes as node}
	<AudioNode node={node}></AudioNode>
	{/each}
	
</main>

<style>
	main {
		background-color: #201f20;
		width: 100%;
		height: 100%;
	}
</style>