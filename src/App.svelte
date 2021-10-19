<script lang="ts">
  type NodeId = number | string;
  interface Node {
    id: NodeId;
    name: string;
  }

  interface Edge {
    source: NodeId;
    target: NodeId;
  }

  export let nodes: Node[];
  export let edges: Edge[];

  const findTargetsForNode = (nodeId: NodeId) =>
    edges.reduce((acc, e) => {
      if (e.source === nodeId) acc.push(nodes.find((n) => n.id === e.target));
      return acc;
    }, []);

  const addNodeLevel = (level: Node[], allLevels = []) => {
    const newLevel = level.reduce((acc, node) => {
      const targets = findTargetsForNode(node.id);
      return [...new Set(acc.concat(targets))];
    }, []);

    if (newLevel.length === 0) return allLevels;
    return addNodeLevel(newLevel, [...allLevels, newLevel]);
  };

  const nodeHasSource = (nodeId: NodeId) => !!edges.find((e) => e.target === nodeId);
  const createLevels = (): Node[][] => {
    const rootNodes = nodes.filter((node) => {
      // Any node that isn't a target of another node, must be a root node
      return !nodeHasSource(node.id);
    });

    const additionalLevels = addNodeLevel(rootNodes);
    return [rootNodes, ...additionalLevels];
  };

  $: levelsOfNodes = createLevels();
  $: console.log(levelsOfNodes);
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
    margin-bottom: 60px;
  }

  .sdv-level article {
    padding: 20px;
    border: 2px solid black;
  }
</style>
