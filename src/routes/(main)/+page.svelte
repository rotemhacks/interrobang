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
	<div class="card w-full overflow-hidden shadow-md">
		<img src={data.page.url} alt={data.page.title} class="w-full" />
	</div>
{/if}

<div class="join mt-3 grid w-full grid-cols-4">
	<a class="btn join-item btn-outline" href={resolve(`/comic/${data.first?.slug}`)}>First</a>
	<a class="btn join-item btn-outline" href={resolve(`/comic/${data.previous?.slug}`)}>Previous</a>
	<button class="btn join-item btn-outline" disabled>Next</button>
	<button class="btn join-item btn-outline" disabled>Last</button>
</div>

{#if data.page?.comment}
	<div class="my-6 w-full">
		<h3 class="mb-1 text-xl font-semibold">{data.page?.title}</h3>
		<div class="prose max-w-none">
			<Markdown {carta} value={data.page?.comment} />
		</div>
	</div>
{/if}

{#if data.blog}
	<div class="divider w-full"></div>
	<div class="card w-full bg-base-200 shadow-sm">
		<div class="card-body gap-1 p-5">
			<div class="mb-2 flex items-center gap-2">
				<span class="badge badge-sm badge-primary">News</span>
				<span class="text-xs text-base-content/50">
					{new Date(data.blog.createdAt!).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</span>
			</div>
			<h3 class="card-title text-lg">{data.blog.title}</h3>
			<div class="prose max-w-none">
				<Markdown {carta} value={data.blog?.text} />
			</div>
		</div>
	</div>
{/if}

<style>
</style>
