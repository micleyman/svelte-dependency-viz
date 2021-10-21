<script lang="ts">
  import { createLevels } from './graph';
  import type { Node, Edge, NodeId } from './graph';
  import Path from './Path.svelte';
  import NodeElement from './Node.svelte';

  export let nodes: Node[];
  export let edges: Edge[];

  interface MapOfNodes {
    [key: NodeId]: HTMLElement;
  }
  let nodeElements: MapOfNodes = {};

  let container: HTMLElement;
  $: levelsOfNodes = createLevels(nodes, edges);
</script>

<div class="sdv-container" bind:this={container}>
  {#each levelsOfNodes as level}
    <div class="sdv-level">
      {#each level as node}
        <div class="sdv-node" bind:this={nodeElements[node.id]}>
          {#if $$slots.default}
            <slot nodeId={node.id} nodeName={node.name} rest={{ ...node }} />
          {:else}
            <NodeElement nodeName={node.name} />
          {/if}
        </div>
      {/each}
    </div>
  {/each}

  {#if container}
    {#each edges as edge}
      <Path from={nodeElements[edge.source]} to={nodeElements[edge.target]} {container} />
    {/each}
  {/if}
</div>

<style>
  .sdv-container {
    position: relative;
  }

  .sdv-container .sdv-level {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .sdv-level {
    display: flex;
    flex-wrap: wrap;
  }

  .sdv-node {
    --dgv-node-margin: 60px;
    margin: var(--dgv-node-margin);
  }
</style>
