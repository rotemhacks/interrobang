<script lang="ts">
	import '../../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { LayoutDashboard, BookOpen, Bookmark, Library, Newspaper } from '@lucide/svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col">
	<!-- Top header bar -->
	<header class="bg-neutral text-neutral-content flex h-14 shrink-0 items-center px-6">
		<span class="text-lg font-bold tracking-tight">Interrobang</span>
		<span class="ml-3 text-sm font-light opacity-50">Creator Dashboard</span>
	</header>

	<!-- Body: sidebar + content -->
	<div class="flex flex-1 overflow-hidden">
		<!-- Sidebar -->
		<nav class="bg-base-200 flex w-56 shrink-0 flex-col overflow-y-auto">
			<!-- Dashboard -->
			<div class="px-3 pt-4 pb-1">
				<a
					href={resolve('/__dashboard')}
					class={[
						'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm',
						page.url.pathname === '/__dashboard'
							? 'bg-primary text-primary-content'
							: 'hover:bg-base-300'
					]}
				>
					<LayoutDashboard size={16} />
					Dashboard
				</a>
			</div>

			<!-- CONTENT section -->
			<p class="text-xs font-semibold tracking-widest opacity-50 px-3 pt-4 pb-1">CONTENT</p>
			<div class="flex flex-col gap-1 px-3">
				<a
					href={resolve('/__dashboard/pages')}
					class={[
						'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm',
						page.url.pathname === '/__dashboard/pages'
							? 'bg-primary text-primary-content'
							: 'hover:bg-base-300'
					]}
				>
					<BookOpen size={16} />
					Pages
				</a>
				<a
					href={resolve('/__dashboard/chapters')}
					class={[
						'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm',
						page.url.pathname === '/__dashboard/chapters'
							? 'bg-primary text-primary-content'
							: 'hover:bg-base-300'
					]}
				>
					<Bookmark size={16} />
					Chapters
				</a>
				<a
					href={resolve('/__dashboard/volumes')}
					class={[
						'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm',
						page.url.pathname === '/__dashboard/volumes'
							? 'bg-primary text-primary-content'
							: 'hover:bg-base-300'
					]}
				>
					<Library size={16} />
					Volumes
				</a>
			</div>

			<!-- PUBLISHING section -->
			<p class="text-xs font-semibold tracking-widest opacity-50 px-3 pt-4 pb-1">PUBLISHING</p>
			<div class="flex flex-col gap-1 px-3">
				<a
					href={resolve('/__dashboard/blog')}
					class={[
						'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm',
						page.url.pathname === '/__dashboard/blog'
							? 'bg-primary text-primary-content'
							: 'hover:bg-base-300'
					]}
				>
					<Newspaper size={16} />
					Blog
				</a>
			</div>
		</nav>

		<!-- Main content -->
		<main class="bg-base-100 flex-1 overflow-y-auto p-8">
			{@render children()}
		</main>
	</div>
</div>
