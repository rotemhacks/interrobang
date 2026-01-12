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
	<a class="btn join-item btn-outline" href={resolve(`/comic/${data.previous?.slug}`)}>Previous</a>
	<button class="btn join-item btn-outline" disabled>Next</button>
	<button class="btn join-item btn-outline" disabled>Last</button>
</div>

{#if data.page?.comment}
	<div class="my-8 w-full">
		<h3 class="text-2xl">{data.page?.title}</h3>
		<Markdown {carta} value={data.page?.comment} />
	</div>
{/if}

{#if data.blog}
	<h2 class="w-full rounded-lg bg-primary p-2 text-2xl">News & Announcements:</h2>
	<div class="my-4 w-full">
		<h3 class="text-2xl">{data.blog.title}</h3>
		<small>{data.blog.createdAt}</small>
		<Markdown {carta} value={data.blog?.text} />
	</div>
{/if}

<style>
</style>
