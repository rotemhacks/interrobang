<script lang="ts">
	import { resolve } from '$app/paths';

	const { data } = $props();
</script>

{#if data.page?.url}
	<img src={data.page.url} alt={data.page.title} class="w-full max-w-7xl" />
{/if}

{#if data.page?.comment}
	<p>{@html data.page.comment}</p>
{/if}

<div class="join mt-2 grid grid-cols-4 md:w-4/5">
	<button class="btn join-item btn-outline" disabled={!data.previous}>First</button>
	<button class="btn join-item btn-outline" disabled={!data.previous}>
		<a href={resolve(`/comic/${data.previous?.slug}`)}>Previous</a>
	</button>
	<button class="btn join-item btn-outline" disabled={!data.page.next}>
		<a href={resolve(`/comic/${data.page.next}`)}>Next</a>
	</button>
	<button class="btn join-item btn-outline"><a href={resolve('/')}>Last</a></button>
</div>
