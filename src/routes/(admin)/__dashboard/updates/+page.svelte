<script lang="ts">
	import { createSlug } from '$lib/utils/stringUtils';

	let title = $state('');
	let slug = $derived(createSlug(title));
	let pagenum = $state(); // get latest page number +1
	let comment = $state('');
</script>

<h2>Updates</h2>

<form method="POST" enctype="multipart/form-data" class="flex w-lg flex-col gap-2">
	<label>
		<span>Page file:</span>
		<input type="file" name="file" class="file-input file-input-ghost" accept="image/*" required />
	</label>

	<label>
		<span>Title:</span>
		<input type="text" name="title" class="input" bind:value={title} required />
	</label>

	<label>
		<span>Slug:</span>
		<input type="text" name="slug" class="input" bind:value={slug} required />
	</label>

	<label>
		<span>Page number:</span>
		<input type="number" name="pagenum" class="input" bind:value={pagenum} />
	</label>

	<label>
		<span>Comment:</span>
		<textarea name="comment" class="textarea" bind:value={comment}></textarea>
	</label>

	<button class="btn btn-neutral">Upload</button>
</form>
