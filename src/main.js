import GraphEditor from './Components/GraphEditor.svelte';

var graph = {
	nodes: [
		{
			name: "Test1",
			inputs: [],
			outputs: [
				{
					label: "Test1"
				},
				{
					label: "Test2"
				}
			]
		},
		{
			name: "Test2",
			inputs: [
				{
					label: "Test"
				}
			],
			outputs: []
		},
		{
			name: "Test3",
			inputs: [
				{
					label: "Test"
				}
			],
			outputs: [
				{
					label: "Test1"
				},
				{
					label: "Test2"
				},
				{
					label: "Test3"
				}
			]
		},
		{
			name: "Test4",
			inputs: [
				{
					label: "Test"
				}
			],
			outputs: []
		},
		{
			name: "Test5",
			inputs: [
				{
					label: "Test"
				}
			],
			outputs: []
		},
		{
			name: "Test6",
			inputs: [
				{
					label: "Test"
				}
			],
			outputs: []
		},
	],
	relations: [
		{
			sourceNodeIndex: 0,
			sourceSocketIndex: 0,
			targetNodeIndex: 1,
			targetSocketIndex: 0
		},
		{
			sourceNodeIndex: 0,
			sourceSocketIndex: 1,
			targetNodeIndex: 2,
			targetSocketIndex: 0
		},
		{
			sourceNodeIndex: 2,
			sourceSocketIndex: 0,
			targetNodeIndex: 3,
			targetSocketIndex: 0
		},
		{
			sourceNodeIndex: 2,
			sourceSocketIndex: 1,
			targetNodeIndex: 4,
			targetSocketIndex: 0
		},
		{
			sourceNodeIndex: 2,
			sourceSocketIndex: 2,
			targetNodeIndex: 5,
			targetSocketIndex: 0
		},
	]
};

const graphEditor = new GraphEditor({
	target: document.body,
	props: {
		graph: graph
	}
});

export default graphEditor;