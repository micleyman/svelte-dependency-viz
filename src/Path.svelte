<script lang="ts">
  import { computePathProperties } from './path';
  import type { PathProperties } from './path/types';

  export let from: HTMLElement;
  export let to: HTMLElement;

  let pathProps: PathProperties = null;
  $: if (from && to) {
    pathProps = { ...computePathProperties(from, to) };
  }
</script>

{#if pathProps}
  <svg
    viewBox={`0 0 ${pathProps.width} ${pathProps.height}`}
    style="--dgv-path-width: {pathProps.width}px; --dgv-path-height: {pathProps.height}px; transform: translate({pathProps.translateX}px, {pathProps.translateY}px);"
  >
    <g>
      <circle cx={pathProps.pathStart.x} cy={pathProps.pathStart.y} r={pathProps.pathEndRadius} />
      <path d={pathProps.curve} stroke="#000" />
      <circle cx={pathProps.pathEnd.x} cy={pathProps.pathEnd.y} r={pathProps.pathEndRadius} />
    </g>
  </svg>
{/if}

<style>
  svg {
    width: var(--dgv-path-width);
    height: var(--dgv-path-height);
    position: absolute;
    z-index: -2;
    top: 0;
    left: 0;
    touch-action: none;
    fill: none;
    stroke-width: 2;
  }
</style>
