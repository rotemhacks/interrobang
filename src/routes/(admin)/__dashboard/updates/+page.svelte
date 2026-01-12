<script lang="ts">
	import { createSlug } from '$lib/utils/stringUtils';
	import { Carta, MarkdownEditor } from 'carta-md';
	import 'carta-md/default.css'; /* Default theme */
	import DOMPurify from 'isomorphic-dompurify';

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	});
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
		<span>Page number:</span><span class="text-red-500">&nbsp;*</span>
		<input type="number" name="pagenum" class="input" bind:value={pagenum} required />
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
		<MarkdownEditor {carta} bind:value={comment} />
		<!-- hidden field mirrors editor content -->
		<input type="hidden" name="comment" value={comment} />
	</label>

	<button class="btn btn-neutral">Upload</button>
</form>
