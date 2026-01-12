<script lang="ts">
	import { createSlug } from '$lib/utils/stringUtils';

	const { data } = $props();

	let title = $state('');
	let slug = $derived(createSlug(title));
	let pagenum = $derived(data.page?.pagenum ? data.page?.pagenum + 1 : 1);
	let comment = $state('');
	let chapterId = $state();
</script>

<h2 class="mb-4 text-xl">Manage Updates</h2>

<form method="POST" enctype="multipart/form-data" class="flex w-lg flex-col gap-2">
	<label>
		<span>Page file:</span><span class="text-red-500">&nbsp;*</span>
		<input type="file" name="file" class="file-input file-input-ghost" accept="image/*" required />
	</label>

	<label>
		<span>Title:</span><span class="text-red-500">&nbsp;*</span>
		<input type="text" name="title" class="input" bind:value={title} required />
	</label>

	<label>
		<span>Slug:</span><span class="text-red-500">&nbsp;*</span>
		<input type="text" name="slug" class="input" bind:value={slug} required />
	</label>

	<label>
		<span>Page number:</span>
		<input type="number" name="pagenum" class="input" bind:value={pagenum} />
	</label>

	<label>
		<span>Chapter:</span><span class="text-red-500">&nbsp;*</span>
		<select name="chapterId" class="select" bind:value={chapterId} required>
			{#each data.chapters as chap (chap.id)}
				<option value={chap.id}>{chap.chapnum}: {chap.title}</option>
			{/each}
		</select>
	</label>

	<label>
		<span>Comment:</span>
		<textarea name="comment" class="textarea" bind:value={comment}></textarea>
	</label>

	<button class="btn btn-neutral">Upload</button>
</form>
