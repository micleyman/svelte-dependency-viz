type NodeId = number | string;

export interface Node {
  id: NodeId;
  name: string;
}

export interface Edge {
  source: NodeId;
  target: NodeId;
}

const findTargetsForNode = (nodeId: NodeId, nodes, edges) =>
  edges.reduce((acc, e) => {
    if (e.source === nodeId) acc.push(nodes.find((n) => n.id === e.target));
    return acc;
  }, []);

// This will recursively construct levels until the last level of nodes has no more
// edges for which those nodes are not the source
const addNodeLevel = (level: Node[], nodes: Node[], edges: Edge[], allLevels = []) => {
  const newLevel = level.reduce((acc, node) => {
    const targets = findTargetsForNode(node.id, nodes, edges);

    return [...acc.concat(targets)];
  }, []);

  if (newLevel.length === 0) return allLevels;
  // A node can have multiple source nodes, which may cause duplicates when
  // getting all targets for a node - so we need to deduplicate the level
  return addNodeLevel(newLevel, nodes, edges, [...allLevels, [...new Set(newLevel)]]);
};

const nodeHasSource = (nodeId: NodeId, edges: Edge[]) => !!edges.find((e) => e.target === nodeId);
export const createLevels = (nodes: Node[], edges: Edge[]): Node[][] => {
  const rootNodes = nodes.filter((node) => {
    // Any node that isn't a target of another node, must be a root node
    return !nodeHasSource(node.id, edges);
  });

  const additionalLevels = addNodeLevel(rootNodes, nodes, edges);
  return [rootNodes, ...additionalLevels];
};
