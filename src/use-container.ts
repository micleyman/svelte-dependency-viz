export default (
  node: HTMLElement,
  sizes: { [k: string]: number } = {
    'sec-small': 0,
    'sec-medium': 200,
    'sec-large': 400
  }
): { destroy: () => void } => {
  const ro = new ResizeObserver(() => {
    const nodeSize = node.getBoundingClientRect().width;
    let activeClass = '';
    for (const property in sizes) {
      if (nodeSize > sizes[property]) activeClass = property;
      node.classList.remove(property);
    }
    node.classList.add(activeClass);
  });

  ro.observe(node);

  return {
    destroy() {
      ro.disconnect();
    }
  };
};
