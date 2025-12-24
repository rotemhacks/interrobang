<script lang="ts">
	import { createSlug } from '$lib/utils/stringUtils';

	let title = $state('');
	let slug = $derived(createSlug(title));
</script>

<h1>Interrobang Creator Dashboard</h1>

<form method="POST" enctype="multipart/form-data" class="flex w-lg flex-col gap-2">
	<label>
		<span>Page file:</span>
		<input type="file" name="file" class="file-input file-input-ghost" />
	</label>

	<label>
		<span>Title:</span>
		<input type="text" name="title" class="input" bind:value={title} />
	</label>

	<label>
		<span>Slug:</span>
		<input type="text" name="slug" class="input" bind:value={slug} />
	</label>

	<button class="btn btn-neutral">Upload</button>
</form>
