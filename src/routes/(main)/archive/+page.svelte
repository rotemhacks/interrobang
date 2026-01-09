<script>
	import { resolve } from '$app/paths';

	const { data } = $props();
</script>

<div class="mt-4 flex w-full flex-col gap-4 self-start">
	<p>Start reading from:</p>
	{#each data.volumes as vol (vol.id)}
		<div class="bg-primary"><span>{vol.volnum}: {vol.title}</span></div>
		{#each vol.chapters as chapter (chapter.id)}
			<div class="bg-secondary"><span>{chapter.chapnum}: {chapter.title}</span></div>
			<div class="flex flex-row gap-4">
				{#each chapter.pages as page (page.id)}
					<a href={resolve(`/comic/${page.slug}`)}><img src={page.thumb} alt={page.title} /></a>
				{/each}
			</div>
		{/each}
	{/each}
</div>
