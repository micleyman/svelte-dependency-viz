<script lang="ts">
  import { createLevels } from './graph';
  import type { Node, Edge } from './graph';

  export let nodes: Node[];
  export let edges: Edge[];

  $: levelsOfNodes = createLevels(nodes, edges);
</script>

<div class="sdv-container">
  {#each levelsOfNodes as level}
    <div class="sdv-level">
      {#each level as node}
        <article>
          {node.name}
        </article>
      {/each}
    </div>
  {/each}
</div>

<style>
  .sdv-container .sdv-level {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  .sdv-level {
    display: flex;
    flex-wrap: wrap;
  }

  .sdv-level article {
    padding: 20px;
    border: 2px solid black;
    margin: 60px 40px;
  }
</style>
