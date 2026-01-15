<script lang="ts">
	import '../../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let { children } = $props();

	const highlightedNav = 'bg-primary text-white';
	const basicNav = 'rounded-md px-3 py-2 hover:bg-base-300';
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<h1 class="mx-3 my-4 text-3xl font-bold">Interrobang Creator Dashboard</h1>

<div class="flex w-full flex-row gap-4">
	<nav class="mr-10 ml-4 flex flex-col gap-4">
		<a
			href={resolve('/__dashboard')}
			class={`${basicNav} ${page.url.pathname === '/__dashboard' ? highlightedNav : ''}`}
		>
			Dashboard
		</a>
		<hr />
		<a
			href={resolve('/__dashboard/updates')}
			class={`${basicNav} ${page.url.pathname === '/__dashboard/updates' ? highlightedNav : ''}`}
		>
			Updates
		</a>
		<a
			href={resolve('/__dashboard/chapters')}
			class={`${basicNav} ${page.url.pathname === '/__dashboard/chapters' ? highlightedNav : ''}`}
		>
			Chapters
		</a>
		<a
			href={resolve('/__dashboard/volumes')}
			class={`${basicNav} ${page.url.pathname === '/__dashboard/volumes' ? highlightedNav : ''}`}
		>
			Volumes
		</a>
		<hr />
		<a
			href={resolve('/__dashboard/blog')}
			class={`${basicNav} ${page.url.pathname === '/__dashboard/blog' ? highlightedNav : ''}`}
		>
			Blog
		</a>
	</nav>
	<div>
		{@render children()}
	</div>
</div>
