<script lang="ts">
	import '../../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let { children } = $props();

	const highlightedNav = 'rounded-md bg-white text-black';
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<h1 class="mx-3 my-4 text-3xl font-bold">Interrobang Creator Dashboard</h1>

<div class="flex w-full flex-row gap-4">
	<nav class="mr-10 ml-4">
		<ul class="flex flex-col gap-4">
			<li class={page.url.pathname === '/__dashboard' ? highlightedNav : ''}>
				<a href={resolve('/__dashboard')}>Dashboard</a>
			</li>
			<li class={page.url.pathname === '/__dashboard/updates' ? highlightedNav : ''}>
				<a href={resolve('/__dashboard/updates')}>Updates</a>
			</li>
			<li class={page.url.pathname === '/__dashboard/chapters' ? highlightedNav : ''}>
				<a href={resolve('/__dashboard/chapters')}>Chapters</a>
			</li>
			<li class={page.url.pathname === '/__dashboard/volumes' ? highlightedNav : ''}>
				<a href={resolve('/__dashboard/volumes')}>Volumes</a>
			</li>
		</ul>
	</nav>
	<div>
		{@render children()}
	</div>
</div>

<style>
	li {
		padding: 0.5rem 1rem;
	}
</style>
