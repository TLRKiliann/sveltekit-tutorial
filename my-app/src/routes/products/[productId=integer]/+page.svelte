<script>
    import { page } from '$app/stores';
    const productId = $page.params.productId;
    const reviewId = $page.params;
</script>

<a href="/">Home</a>

<h1>Product details by ID</h1>

<h2>{productId}</h2>

<a href={`/products/${productId}/reviews/1`}>review 1</a>
<a href={`/products/${productId}/reviews/2`}>review 2</a>
<a href={`/products/${productId}/reviews/3`}>review 3</a>
