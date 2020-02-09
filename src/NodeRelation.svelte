<script>
    export let source;
    export let target;
    export let curvature = 100;

    let targetX, targetY, sourceX, sourceY;

    let cx1, cy1, cx2, cy2;
    let initialized =false;
    
    $: if (source && target) {
        // We're using horizontal Cubic Bezier curves
        // So we need to define 2 target points and 2 control points.

        // Determine the target points from the socket dimentions.
        targetX = target.left + target.width / 2;
        targetY = target.top + target.height / 2;
        sourceX = source.left + source.width / 2;
        sourceY = source.top + source.height / 2;

        // Control points are half way from target
        cx1 = targetX - (targetX - sourceX) / 2;
        cx2 = sourceX + (targetX - sourceX) / 2;

        // We make sure the control points dont go beyond the target nodes
        // We also add extra space to increase the curvature.
        cx1 = Math.max(cx1, sourceX + curvature);
        cx2 = Math.min(cx1, targetX - curvature);

        // Y cordinate are inline with the nodes.
        cy1 = sourceY;
        cy2 = targetY;

        initialized = true;
    }
</script>

{#if initialized}
    <div class="node-relation">
        <svg>
            <filter id="highlight" filterUnits="userSpaceOnUse" >
                <feGaussianBlur stdDeviation="5" in="SourceGraphic"/>
            </filter>
            <g>
                <path class="curve-selector" d="M{sourceX},{sourceY} C{cx1}, {cy1} {cx2},{cy2} {targetX},{targetY}" />
            </g>
            <g>
                <path class="curve" d="M{sourceX},{sourceY} C{cx1}, {cy1} {cx2},{cy2} {targetX},{targetY}" />
            </g>
        </svg>
    </div>
{/if}

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