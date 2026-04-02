<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import 'carta-md/default.css'; /* Default theme */
	import DOMPurify from 'isomorphic-dompurify';
	import { untrack } from 'svelte';

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize
	});

	const { chapters, pagenum, action, page = undefined, onSuccess = undefined } = $props();

	let comment = $state('');

	$effect(() => {
		const p = page;
		const pn = pagenum;
		untrack(() => {
			comment = p?.comment ?? '';
			action.fields.pagenum.set(p?.pagenum ?? pn);
			if (p) {
				action.fields.title.set(p.title);
				action.fields.chapterId.set(p.chapterId);
				action.fields.id.set(p.id);
			}
		});
	});

	$effect(() => {
		action.fields.comment.set(comment);
	});

	$effect(() => {
		if (action.result?.success === true) {
			onSuccess?.();
		}
	});
</script>

<form {...action} enctype="multipart/form-data" class="flex flex-col gap-4">
	{#if page}
		<input {...action.fields.id.as('number')} type="hidden" />
	{/if}

	<div class="flex flex-col gap-1">
		<p class="text-sm font-medium">
			Page file:{#if !page}
				<span class="text-error">*</span>{/if}
		</p>
		<input
			{...action.fields.file.as('file')}
			class="file-input w-full"
			accept="image/*"
			required={!page}
		/>
	</div>

	<div class="flex flex-col gap-1">
		<p class="text-sm font-medium">Title: <span class="text-error">*</span></p>
		<input {...action.fields.title.as('text')} class="input w-full" required />
	</div>

	<div class="grid grid-cols-2 gap-4">
		<div class="flex flex-col gap-1">
			<p class="text-sm font-medium">Page number: <span class="text-error">*</span></p>
			<input {...action.fields.pagenum.as('number')} class="input w-full" required />
		</div>

		<div class="flex flex-col gap-1">
			<p class="text-sm font-medium">Chapter: <span class="text-error">*</span></p>
			<select {...action.fields.chapterId.as('select')} class="select w-full" required>
				{#each chapters as chap (chap.id)}
					<option value={chap.id}>{chap.chapnum}: {chap.title}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="flex flex-col gap-1">
		<p class="text-sm font-medium">Comment:</p>
		<MarkdownEditor {carta} bind:value={comment} />
		<!-- hidden field mirrors editor content -->
		<input {...action.fields.comment.as('text')} type="hidden" />
	</div>

	<div class="flex justify-end pt-2">
		<button class="btn btn-neutral" type="submit">{page ? 'Save' : 'Create'}</button>
	</div>
</form>

<style>
	:global(.carta-theme__default) {
		--border-color: var(--color-base-300);
		--hover-color: var(--color-base-200);
		--caret-color: var(--color-base-content);
		--text-color: var(--color-base-content);
		--border-color-dark: var(--color-base-300);
		--hover-color-dark: var(--color-base-200);
		--caret-color-dark: var(--color-base-content);
		--text-color-dark: var(--color-base-content);
	}

	:global(.carta-theme__default.carta-editor) {
		border-radius: var(--radius-field, 0.5rem);
		background-color: var(--color-base-100);
	}

	:global(.carta-theme__default .carta-toolbar) {
		background-color: var(--color-base-200);
		border-color: var(--color-base-300);
	}

	:global(.carta-theme__default button) {
		color: var(--color-base-content);
	}

	:global(.carta-theme__default .carta-input),
	:global(.carta-theme__default .carta-renderer) {
		height: 15rem;
		background-color: var(--color-base-100);
		color: var(--color-base-content);
	}

	:global(.carta-theme__default .carta-input textarea) {
		color: var(--color-base-content);
	}
</style>
