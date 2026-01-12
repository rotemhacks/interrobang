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

{#if data.page?.comment}
	<Markdown {carta} value={data.page?.comment} />
{/if}

<div class="join mt-2 grid grid-cols-4 md:w-4/5">
	<button class="btn join-item btn-outline">First</button>
	<a class="btn join-item btn-outline" href={resolve(`/comic/${data.previous?.slug}`)}>Previous</a>
	<button class="btn join-item btn-outline" disabled>Next</button>
	<button class="btn join-item btn-outline" disabled>Last</button>
</div>

{#if data.blog}
	<div class="my-8">
		<h2 class="text-2xl">{data.blog.title}</h2>
		<small>{data.blog.createdAt}</small>
		<Markdown {carta} value={data.blog?.text} />
	</div>
{/if}

<style>
</style>
