<h1 align="center">Svelte dependency visualizer ✨</h1>

This package is inspired heavily by [Exercism](https://exercism.org)'s syllabus aka concept map. I needed something like it in an upcoming project and decided to publish it as a separate package.

In essence, a skill tree or progression map is just a graph in which each transitive dependency is only connected to its direct parent.


## Use

```bash
npm install --save-dev svelte-dependency-viz
```

Because this is just a graph, the component takes a `nodes` and `edges` prop, with the following types:

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

You can use it in your Svelte app like this:

```svelte
<script lang="ts">
  import { Graph } from 'svelte-dependency-viz';

  const nodes = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 3, name: 'C' }
  ];

  const edges = [
    { source: 1, target: 2 },
    { source: 1, target: 3 }
  ];
</script>

<Graph {nodes} {edges} />

```

Result:


![image](https://user-images.githubusercontent.com/15386836/138325489-d38faf59-59d0-4ee6-807c-addfc7e74c3d.png)



**Note**: The resulting Graph does not use `window` or `document` values, and will base itself on the width of whatever parent container you define. Repositioning the paths on resize uses a [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver), so if you need IE11 support, you'll need to polyfill it.


### Customizing

You can supply a custom Node instead of the generic default node ([examples](https://github.com/MicLeey/svelte-dependency-viz/tree/main/examples))

Any additional data you have defined on the node object, will be passed in as `rest` to your custom component. With this you can do contextual styling, such as a green background when a certain node has been completed, animations, or hover styles and tooltips.

## Developing

```bash
npm install && npm run dev
```

## To do

(PRs welcome)

- [ ] Allow edge/path customization
- [ ] Optimize resize calculations by debouncing
- [ ] Build to web component so it can be used with any framework
