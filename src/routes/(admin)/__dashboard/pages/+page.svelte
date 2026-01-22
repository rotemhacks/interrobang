<script lang="ts">
	import { resolve } from '$app/paths';
	import PagesForm from '$lib/components/PagesForm.svelte';

	import { Pencil, Eye } from '@lucide/svelte';

	const { data } = $props();
</script>

<h2 class="mb-4 text-xl">Manage Pages</h2>

<!-- You can open the modal using ID.showModal() method -->
<button class="btn" onclick={page_form.showModal()}>Add a Page</button>
<dialog id="page_form" class="modal">
	<div class="modal-box w-11/12 max-w-5xl">
		<form method="dialog">
			<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">✕</button>
		</form>
		<h3 class="text-lg font-bold">Add a Page</h3>
		<PagesForm chapters={data.chapters} page={data.page} />
	</div>
</dialog>

<!-- TODO: Add pagination -->
<h3 class="mt-10">All Updates</h3>
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
			{#each data.pages as obj (obj.page.id)}
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
							<button class="btn btn-square btn-ghost">
								<!-- TODO: Make this load the info in the modal -->
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
</div>
