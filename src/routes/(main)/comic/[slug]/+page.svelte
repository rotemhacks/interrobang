<script lang="ts">
	const { data } = $props();
</script>

{#if data.page?.url}
	<img src={data.page.url} alt={data.page.title} class="w-full max-w-7xl" />
{/if}

<div class="join grid grid-cols-4 md:w-4/5 mt-2">
	<button class="join-item btn btn-outline" disabled={!data.previous} >First</button>
	<button class="join-item btn btn-outline" disabled={!data.previous} ><a href={`/comic/${data.previous?.slug}`} >Previous</a></button>
	<button class="join-item btn btn-outline" disabled={!data.page.next}><a href={`/comic/${data.page.next}`}>Next</a></button>
	<button class="join-item btn btn-outline">Last</button>
</div>