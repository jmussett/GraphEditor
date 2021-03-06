class Layout {
    constructor(graph) {
        this.graph = graph;
        this.horizontalDepth = 0.5;
        this.veritcalDepth = 0.5;
    }
    initializeNode(index)
    {
        index = index || 0;

        // Set the position of this node based on the current depth.
        this.graph.nodes[index].position.x = this.horizontalDepth * 300;
        this.graph.nodes[index].position.y = this.veritcalDepth * 100;

        // We're entering a new node, increase the horizontal depth.
        this.horizontalDepth++;

        // find
        let currentRelations =  this.graph.relations.filter(r => r.sourceNodeIndex == index);

        // Foreach output, find child relations.
        for(let i = 0; i < this.graph.nodes[index].outputs.length; i++) {
            let outputRelations = currentRelations.filter(r => r.sourceSocketIndex == i);

            // if no output relations were found for current index, move to next.
            if(outputRelations.length == 0)
                continue;

            // We've found a target node, initialize it.
            this.initializeNode(outputRelations[0].targetNodeIndex);

            // When moving onto the next relation, increase the vertical depth.
            if (i != this.graph.nodes[index].outputs.length - 1)
                this.veritcalDepth++;
        }

        // We're leaving a node, reduce the horizontal depth.
        this.horizontalDepth--;
    }
}

export var initializeLayout = graph => new Layout(graph).initializeNode();
