<script>
	const { data } = $props();
</script>

<div class="mt-4 flex w-full flex-col gap-4 self-start">
	<p>Start reading from:</p>
	{#each data.volumes as vol (vol.id)}
		<div class="bg-primary"><span>{vol.volnum}: {vol.title}</span></div>
	{/each}
</div>
