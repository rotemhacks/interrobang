<script lang="ts">
	const { data } = $props();
</script>

{#if data.page?.url}
	<img src={data.page.url} alt={data.page.title} class="w-full max-w-7xl" />
{/if}

<div class="join grid grid-cols-4 md:w-4/5 mt-2">
	<button class="join-item btn btn-outline">First</button>
	<a class="join-item btn btn-outline" href={`/comic/${data.previous?.slug}`} >Previous</a>
	<a class="join-item btn btn-outline" href={`/comic/${data.page.next}`} >Next</a>
	<button class="join-item btn btn-outline">Last</button>
</div>