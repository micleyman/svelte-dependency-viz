<script>
  export let name;
  export let id;

  // rest is an object containing all the other properties defined on a node
  export let rest;

  $: console.log(name, id, rest);
</script>

<article>{name}</article>

<style>
  article {
    padding: 20px;
    background-color: salmon;
  }
</style>
