<script lang="ts">
	const { data } = $props();

	let title = $state('');
	let volnum = $derived(data.volumes[0] ? Number(data.volumes[0]?.volnum) + 1 : 1);
</script>

<h2 class="mb-4 text-xl">Manage Volumes</h2>

<form method="POST" enctype="multipart/form-data" class="flex w-lg flex-col gap-2">
	<label>
		<span>Volume Number:</span>
		<input type="number" name="volnum" class="input" bind:value={volnum} required />
	</label>

	<label>
		<span>Title:</span>
		<input type="text" name="title" class="input" bind:value={title} required />
	</label>
	<button class="btn btn-neutral">Create</button>
</form>
