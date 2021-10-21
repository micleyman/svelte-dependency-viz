<h1 align="center">Svelte dependency visualizer ✨</h1>

This package is inspired heavily by [Exercism](https://exercism.org)'s syllabus aka concept map. I needed something like it in an upcoming project and decided to publish it as a separate package.

In essence, a skill tree or progression map is just a graph in which each transitive dependency is only connected to it's direct parent.


## Use


```bash
npm install --save-dev svelte-dependency-viz
```

Because this is just a graph, the component takes a `nodes` and `edges` prop, where:

```ts
type NodeId = number | string;

interface Node {
  id: NodeId;
  name: string;
}

interface Edge {
  source: NodeId;
  target: NodeId;
}
```


## Developing

```bash
npm install && npm run dev
```

## To do

(PRs welcome)

- [ ] Allow edge/path customization
- [ ] Optimize resize calculations by debouncing
- [ ] Build to web component so it can be used with any framework
