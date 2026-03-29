<script lang="ts">
	import { resolve } from '$app/paths';
	import PagesForm from '$lib/components/PagesForm.svelte';
	import {
		addNewPage,
		editPage,
		getAllChapters,
		getAllPagesWithDetails,
		getLatestPage
	} from '$lib/remote/comic.remote.js';

	import { Pencil, Eye } from '@lucide/svelte';

	// remote functions!!
	const pages = await getAllPagesWithDetails(); // for table
	const chapters = await getAllChapters(); // for form
	const [latestPage] = await getLatestPage(); // for latest page number

	// add page modal
	let dialog: HTMLDialogElement;

	// edit page modal
	let editDialog: HTMLDialogElement;
	let editingPage = $state<(typeof pages)[number]['page'] | null>(null);

	// pagination for comic pages table
	let rowsPerPage = $state(10);
	const maxVisiblePages = 10;
	let currentPage = $state(1);
	const totalPages = $derived(Math.ceil(pages.length / rowsPerPage));

	const paginatedData = $derived(
		pages.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
	);
	const startPage = $derived(Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1);
	const endPage = $derived(Math.min(startPage + maxVisiblePages - 1, totalPages));
</script>

<h2 class="mb-4 text-xl">Manage Pages</h2>

<!-- You can open the modal using ID.showModal() method -->
<button class="btn" onclick={() => dialog.showModal()}>Add a Page</button>
<dialog bind:this={dialog} class="modal">
	<div class="modal-box w-3/4 max-w-3xl">
		<form method="dialog">
			<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">✕</button>
		</form>
		<h3 class="text-lg font-bold">Add a Page</h3>
		<PagesForm
			{chapters}
			pagenum={latestPage?.pagenum ? latestPage?.pagenum + 1 : 1}
			action={addNewPage}
		/>
	</div>
</dialog>

<dialog bind:this={editDialog} class="modal">
	<div class="modal-box w-3/4 max-w-3xl">
		<form method="dialog">
			<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">✕</button>
		</form>
		<h3 class="text-lg font-bold">Edit Page</h3>
		<PagesForm
			{chapters}
			pagenum={editingPage?.pagenum ?? 1}
			action={editPage}
			page={editingPage}
		/>
	</div>
</dialog>

<label class="my-8 flex flex-row items-baseline gap-4">
	<span>Rows to show:</span>
	<select name="rows" bind:value={rowsPerPage} class="select">
		<option value={25}>25</option>
		<option value={10} selected>10</option>
		<option value={5}>5</option>
	</select>
</label>

<div class="mb-8 w-4/5 overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				<th>#</th>
				<th>Thumb</th>
				<th>Title</th>
				<th>Chapter</th>
				<th>Volume</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each paginatedData as obj (obj.page.id)}
				<tr>
					<td>{obj.page.pagenum}</td>
					<td>
						<img src={obj.page.thumb} alt={obj.page.title} width="100px" />
					</td>
					<td>{obj.page.title}</td>
					<td>Chapter {obj.chapter.chapnum}</td>
					<td>Volume {obj.volume.volnum}</td>
					<td>
						<div class="flex h-full flex-row gap-2">
							<button
								class="btn btn-square btn-ghost"
								onclick={() => {
									editingPage = obj.page;
									editDialog.showModal();
								}}
							>
								<Pencil />
							</button>
							<a href={resolve(`/comic/${obj.page.slug}`)} class="btn btn-square btn-ghost">
								<Eye />
							</a>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<nav class="pagination">
		{#if startPage > 1}
			<button onclick={() => (currentPage = startPage - 1)} class="btn"> ← </button>
		{/if}

		{#each Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i) as page (page)}
			<button class:active={page === currentPage} onclick={() => (currentPage = page)} class="btn">
				{page}
			</button>
		{/each}

		{#if endPage < totalPages}
			<button onclick={() => (currentPage = endPage + 1)} class="btn"> → </button>
		{/if}
	</nav>
</div>
