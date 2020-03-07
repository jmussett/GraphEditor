<script context="module">
    import { writable } from 'svelte/store';

    export class Relation {
        constructor(relation, graph) {
            this.sourceNodeIndex = relation.sourceNodeIndex;
            this.sourceSocketIndex = relation.sourceSocketIndex;
            this.targetNodeIndex = relation.targetNodeIndex;
            this.targetSocketIndex = relation.targetSocketIndex;

            this.sourceSocket = graph.nodes[relation.sourceNodeIndex].outputs[relation.sourceSocketIndex];
            this.targetSocket = graph.nodes[relation.targetNodeIndex].inputs[relation.targetSocketIndex];
            
            this.curve = writable();
        }

        update() {
            let targetX = this.targetSocket.x;
            let sourceX = this.sourceSocket.x;
            let targetY = this.targetSocket.y;
            let sourceY = this.sourceSocket.y;

            if(!targetX || !targetY || !sourceX || !sourceY || !this.curvature)
                return;

            // We're using horizontal Cubic Bezier curves
            // So we need to define 2 target points and 2 control points.

            // Control points are half way from target
            let cx1 = targetX - (targetX - sourceX) / 2;
            let cx2 = sourceX + (targetX - sourceX) / 2;

            // We make sure the control points dont go beyond the target nodes
            // We also add extra space to increase the curvature.
            cx1 = Math.max(cx1, sourceX + this.curvature);
            cx2 = Math.min(cx1, targetX - this.curvature);

            // Y cordinate are inline with the nodes.
            let cy1 = sourceY;
            let cy2 = targetY;

            this.curve.set(`M${sourceX},${sourceY} C${cx1}, ${cy1} ${cx2},${cy2} ${targetX},${targetY}`);
        }
    }
</script>

<script>
    export let relation;
    export let curvature = 100;

    relation.curvature = curvature;

    let curve;

    $: {
        relation.update();
        curve = relation.curve;
    } 
</script>

<div class="node-relation">
    <svg>
        <filter id="highlight" filterUnits="userSpaceOnUse" >
            <feGaussianBlur stdDeviation="5" in="SourceGraphic"/>
        </filter>
        <g>
            <path class="curve-selector" d={$curve} />
        </g>
        <g>
            <path class="curve" d={$curve} />
        </g>
    </svg>
</div>

<style>
    .node-relation {
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    svg {
        width: 100%;
        height: 100%;
    }

    .curve-selector {
        filter: url(#highlight);
        fill: none;
        pointer-events: all;
        stroke-opacity: 0;
        stroke-linecap: round;
        stroke-width: 10px;
        stroke: #8ca6c0;
    }

    .curve-selector:hover {
        
        stroke-opacity: 0.5;
    }
    
    .curve {
        stroke: #8ca6c0;
        stroke-width: 1;
        stroke-linecap: round;
        fill: none;
    }
</style>