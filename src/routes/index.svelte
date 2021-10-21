<script lang="ts">
  import edges from '../../examples/edges.json';
  import nodes from '../../examples/nodes.json';

  import Graph from '$lib/Graph.svelte';
</script>

<Graph {nodes} {edges} />
