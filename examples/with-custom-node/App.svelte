<script>
  import Graph from '../../src/App.svelte';
  import Node from './Node.svelte';

  export let nodes;
  export let edges;
</script>

<Graph {nodes} {edges} let:nodeName let:nodeId let:rest>
  <Node name={nodeName} id={nodeId} {rest} />
</Graph>
