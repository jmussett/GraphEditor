<script context="module">
	import { Node } from "./NodeComponent.svelte";
	import { Relation } from "./RelationComponent.svelte";
	
	export class Graph {
		constructor(graph) {
			this.nodes = graph.nodes.map(n => new Node(n));
			this.relations = graph.relations.map(r => new Relation(r, this));
		}

		dispatch(name, props) {
			this.nodes.forEach(n => n.dispatch(name, props))
		}

		update() {
			this.nodes.forEach(n => n.update())
			this.relations.forEach(r => r.update())
		}
	}
</script>

<script>
 	import { onMount } from 'svelte';

	import NodeComponent from "./NodeComponent.svelte";
	import RelationComponent from "./RelationComponent.svelte";
	import { initializeLayout } from "./Layout.js";

	export let graph;

	let virtualGraph = new Graph(graph);

	onMount(() => initializeLayout(virtualGraph));

	$: virtualGraph.update();
</script>

<div class="graph"
	on:touchstart={e => virtualGraph.dispatch("click", e)}
	on:mousedown={e => virtualGraph.dispatch("click", e)}
	on:touchmove={e => virtualGraph.dispatch("move", e)}
	on:mousemove={e => virtualGraph.dispatch("move", e)}
	on:touchend={e => virtualGraph.dispatch("stop", e)}
	on:mouseup={e => virtualGraph.dispatch("stop", e)}
>
	{#each virtualGraph.nodes as node, i}
		<NodeComponent bind:node={virtualGraph.nodes[i]} />
	{/each}
	{#each virtualGraph.relations as relation, i}
		<RelationComponent bind:relation={virtualGraph.relations[i]}/>
	{/each}
</div>

<style>
	.graph {
		position: relative;
		background-color: #201f20;
		width: 5000px;
		height: 5000px;
	}
</style>