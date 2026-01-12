<script lang="ts">
	import { resolve } from '$app/paths';
	import { Carta, Markdown } from 'carta-md';
	import DOMPurify from 'isomorphic-dompurify';

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	});

	const { data } = $props();
</script>

{#if data.page?.url}
	<img src={data.page.url} alt={data.page.title} class="w-full max-w-7xl" />
{/if}

<div class="join mt-2 grid grid-cols-4 md:w-4/5">
	<a class="btn join-item btn-outline" href={resolve(`/comic/${data.first?.slug}`)}>First</a>
	<button class="btn join-item btn-outline" disabled={!data.previous}>
		<a href={resolve(`/comic/${data.previous?.slug}`)}>Previous</a>
	</button>
	<button class="btn join-item btn-outline" disabled={!data.page.next}>
		<a href={resolve(`/comic/${data.page.next}`)}>Next</a>
	</button>
	<button class="btn join-item btn-outline" disabled={!data.page.next}>
		<a href={resolve('/')}>Last</a>
	</button>
</div>

{#if data.page?.comment}
	<div class="my-8 w-full">
		<h3 class="text-2xl">{data.page?.title}</h3>
		<Markdown {carta} value={data.page?.comment} />
	</div>
{/if}
