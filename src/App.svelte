<script>
	import AudioNode from "./AudioNode.svelte";
	import NodeRelation from "./NodeRelation.svelte";

	export let graph;

	let display;

	$: {
		for (let i = 0; i < graph.relations.length; i++) {
			let relation = graph.relations[i];

			let sourceNode = graph.nodes[relation.sourceNodeIndex];
			let sourceSocket = sourceNode.outputs[relation.sourceSocketIndex];
			let targetNode = graph.nodes[relation.targetNodeIndex];
			let targetSocket = targetNode.inputs[relation.targetSocketIndex];

			graph.relations[i].sourcePosition = sourceSocket.position;
			graph.relations[i].targetPosition = targetSocket.position;
		}
	}

	let click = e => graph.nodes.forEach(n => n.events && n.events.click && n.events.click(e));
	let move = e => graph.nodes.forEach(n => n.events && n.events.move && n.events.move(e));
	let stop = e => graph.nodes.forEach(n => n.events &&  n.events.stop && n.events.stop(e));
</script>

<div class="graph"
	on:touchstart={e => click(e)}
	on:mousedown={e => click(e)}
	on:touchmove={e => move(e)}
	on:mousemove={e => move(e)}
	on:touchend={e => stop(e)}
	on:mouseup={e => stop(e)}
>
	{#each graph.nodes as node, i}
		<AudioNode bind:node={graph.nodes[i]} />
	{/each}
	
	{#each graph.relations as relation}
		<NodeRelation
			source={relation.sourcePosition}
			target={relation.targetPosition}/>
	{/each}
</div>

<style>
	.graph {
		position: relative;
		background-color: #201f20;
		width: 100%;
		height: 100%;
	}
</style>