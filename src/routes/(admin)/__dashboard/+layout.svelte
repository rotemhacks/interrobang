<script lang="ts">
	import '../../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import {
		LayoutDashboard,
		BookOpen,
		Bookmark,
		Library,
		Newspaper,
		Sun,
		Moon
	} from '@lucide/svelte';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let { children } = $props();

	function getInitialTheme(): 'light' | 'dark' {
		if (typeof localStorage === 'undefined') return 'dark';
		const stored = localStorage.getItem('theme');
		return stored === 'dark' ? 'dark' : 'light';
	}

	let theme = $state<'light' | 'dark'>(getInitialTheme());

	$effect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col">
	<!-- Top header bar -->
	<header class="flex h-14 shrink-0 items-center bg-neutral px-6 text-neutral-content">
		<span class="text-lg font-bold tracking-tight">Interrobang</span>
		<span class="ml-3 text-sm font-light opacity-50">Creator Dashboard</span>
		<button
			class="btn ml-auto btn-circle text-neutral-content btn-ghost btn-sm"
			onclick={toggleTheme}
		>
			{#if theme === 'light'}
				<Moon size={18} />
			{:else}
				<Sun size={18} />
			{/if}
		</button>
		<button
			class="btn ml-4 btn-ghost"
			onclick={async () => {
				await authClient.signOut({
					fetchOptions: {
						onSuccess: () => {
							goto(resolve('/auth/login')); // redirect to login page
						}
					}
				});
			}}
		>
			Sign Out
		</button>
	</header>

	<!-- Body: sidebar + content -->
	<div class="flex flex-1 overflow-hidden">
		<!-- Sidebar -->
		<nav class="flex w-56 shrink-0 flex-col overflow-y-auto bg-base-200">
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
			<p class="px-3 pt-4 pb-1 text-xs font-semibold tracking-widest opacity-50">CONTENT</p>
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
			<p class="px-3 pt-4 pb-1 text-xs font-semibold tracking-widest opacity-50">PUBLISHING</p>
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
		<main class="flex-1 overflow-y-auto bg-base-100 p-8">
			{@render children()}
		</main>
	</div>
</div>
