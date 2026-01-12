<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import 'carta-md/default.css'; /* Default theme */
	import DOMPurify from 'isomorphic-dompurify';

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	});

	let title = $state('');
	let text = $state('');
</script>

<h2 class="mb-4 text-xl">Manage Blog Posts</h2>

<form method="POST" enctype="multipart/form-data" class="flex w-2xl flex-col gap-2">
	<label>
		<span>Title:</span><span class="text-red-500">&nbsp;*</span>
		<input type="text" name="title" class="input mt-1 mb-4 w-full" bind:value={title} required />
	</label>
	<label>
		<MarkdownEditor {carta} bind:value={text} />
		<!-- hidden field mirrors editor content -->
		<input type="hidden" name="text" value={text} />
	</label>
	<div>
		<button class="btn btn-neutral">Create</button>
	</div>
</form>

<style>
	/* Set your monospace font  */
	/* Required to have the editor working correctly! */
	:global(.carta-font-code) {
		font-family: '...', monospace;
		font-size: 1.1rem;
		line-height: 1.1rem;
		letter-spacing: normal;
	}
</style>
