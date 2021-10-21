import App from '../src/App.svelte';
import nodes from './nodes.json';
import edges from './edges.json';

const app = new App({
  target: document.body,
  props: {
    nodes,
    edges
  }
});

export default app;
