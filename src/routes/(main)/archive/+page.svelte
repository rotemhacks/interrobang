<script>
	import { resolve } from '$app/paths';

	const { data } = $props();
</script>

<div class="mt-4 flex w-full flex-col gap-4 self-start">
	<p>Start reading from:</p>
	{#each data.volumes as vol (vol.id)}
		<div class="rounded-lg bg-primary p-2"><span>{vol.volnum}: {vol.title}</span></div>
		{#each vol.chapters as chapter (chapter.id)}
			<div class="collapse-arrow collapse border border-base-300 bg-base-100">
				<input type="checkbox" name="comic-archive" />
				<div class="collapse-title bg-secondary p-2 font-semibold">
					<span>{chapter.chapnum}: {chapter.title}</span>
				</div>
				<div class="collapse-content text-sm">
					<div class="mt-4 flex flex-row gap-4">
						{#each chapter.pages as page (page.id)}
							<a href={resolve(`/comic/${page.slug}`)}><img src={page.thumb} alt={page.title} /></a>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	{/each}
</div>
