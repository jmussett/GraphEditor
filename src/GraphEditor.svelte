<script context="module">
	import EventBroker from "./EventBroker";
	import ReactiveObject from "./ReactiveObject";
	import { Node } from "./NodeComponent.svelte";
	import { Relation } from "./RelationComponent.svelte";
	
	export class Graph {
		constructor(graph) {
			this.nodes = graph.nodes.map((n, i) => new Node(n, i));
			this.relations = new ReactiveObject(graph.relations.map((r, i) => new Relation(r, i, this)));
		}

		dispatchToChildren(name, props) {
			this.nodes.forEach(n => n.dispatch(name, props))
			this.relations.forEach(n => n.dispatch(name, props))
		}

		update() {
			this.nodes.forEach(n => n.update())
			this.relations.forEach(r => r.update())
		}

		removeRelation(socket) {
			let predicate = socket.type == "input"
				? r =>
					r.targetNodeIndex == socket.nodeIndex &&
					r.targetSocketIndex == socket.index
				: r =>
					r.sourceNodeIndex == socket.nodeIndex &&
					r.sourceSocketIndex == socket.index;

			let index = this.relations.findIndex(predicate);

			if (index >= 0) {
				this.relations.splice(index, 1);
				this.relations.dirty();
			}
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

	virtualGraph.nodes.forEach(node =>
		node.subscribe("socketDown", (e, socket) => {
			virtualGraph.removeRelation(socket)
		}));

	let relations = virtualGraph.relations.reactive;

	$: virtualGraph.update();
</script>

<div class="graph"
	on:touchstart={e => virtualGraph.dispatchToChildren("click", e)}
	on:mousedown={e => virtualGraph.dispatchToChildren("click", e)}
	on:touchmove={e => virtualGraph.dispatchToChildren("move", e)}
	on:mousemove={e => virtualGraph.dispatchToChildren("move", e)}
	on:touchend={e => virtualGraph.dispatchToChildren("stop", e)}
	on:mouseup={e => virtualGraph.dispatchToChildren("stop", e)}
>
	{#each virtualGraph.nodes as node, i}
		<NodeComponent bind:node={virtualGraph.nodes[i]} />
	{/each}
	{#each $relations as relation, i (relation.index)}
		<RelationComponent bind:relation={$relations[i]}/>
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