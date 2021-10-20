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

  // This will recursively construct levels until the last level of nodes has no more
  // edges for which those nodes are not the source
  const addNodeLevel = (level: Node[], allLevels = []) => {
    const newLevel = level.reduce((acc, node) => {
      const targets = findTargetsForNode(node.id);

      return [...acc.concat(targets)];
    }, []);

    if (newLevel.length === 0) return allLevels;
    // A node can have multiple source nodes, which may cause duplicates when
    // getting all targets for a node - so we need to deduplicate the level
    return addNodeLevel(newLevel, [...allLevels, [...new Set(newLevel)]]);
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
    flex-wrap: wrap;
  }

  .sdv-level article {
    padding: 20px;
    border: 2px solid black;
    margin: 60px 40px;
  }
</style>
