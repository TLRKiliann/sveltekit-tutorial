<script>
  export let data;
  const products = data.products;
  const Component = data.Component;
</script>

<h1>Products {data.title}</h1>

{#each products as product}
  <div>
    <Component {product} />
  </div>
{/each}