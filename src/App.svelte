<script lang="ts">
  import { createLevels } from './graph';
  import type { Node, Edge, NodeId } from './graph';
  import Path from './Path.svelte';

  export let nodes: Node[];
  export let edges: Edge[];

  interface MapOfNodes {
    [key: NodeId]: HTMLElement;
  }
  let nodeElements: MapOfNodes = {};

  let container: HTMLElement;

  $: levelsOfNodes = createLevels(nodes, edges);
</script>

<div class="dgv-container" bind:this={container}>
  {#each levelsOfNodes as level}
    <div class="dgv-level">
      {#each level as node}
        <article data-id="dgv-node" bind:this={nodeElements[node.id]}>
          {node.name}
        </article>
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
  .dgv-container {
    position: relative;
  }

  .dgv-container .dgv-level {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .dgv-level {
    display: flex;
    flex-wrap: wrap;
  }

  .dgv-level article {
    --dgv-node-margin: 60px;
    padding: 20px;
    border: 2px solid #000;
    margin: var(--dgv-node-margin);
    background-color: #fff;
  }
</style>
