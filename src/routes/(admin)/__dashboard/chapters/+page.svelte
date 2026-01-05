<script lang="ts">
	const { data } = $props();

	let title = $state('');
	let chapnum = $state();
	let volumeId = $derived(data.volumes[0] ? data.volumes[0]?.id : null);
</script>

<h2 class="mb-4 text-xl">Manage Chapters</h2>

<form method="POST" enctype="multipart/form-data" class="flex w-lg flex-col gap-2">
	<label>
		<span>Chapter Number:</span>
		<input type="number" name="chapnum" class="input" bind:value={chapnum} required />
	</label>

	<label>
		<span>Title:</span>
		<input type="text" name="title" class="input" bind:value={title} required />
	</label>

	<label>
		<span>Volume:</span>
		<select name="volumeId" class="select" bind:value={volumeId} required>
			{#each data.volumes as vol (vol.id)}
				<option value={vol.id}>{vol.volnum}: {vol.title}</option>
			{/each}
		</select>
	</label>

	<button class="btn btn-neutral">Create</button>
</form>
