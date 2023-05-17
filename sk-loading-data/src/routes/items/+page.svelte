<script>
  export let data;
  const items = data.items;
</script>

<h1>items {data.title}</h1>

{#each items as product}
  <div>
    <h2>{product.title}</h2>
    <p>{product.description}</p>
    <hr />
  </div>
{/each}