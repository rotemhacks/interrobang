<script lang="ts">
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="m-auto mb-8 flex w-full max-w-4xl flex-col items-center justify-center md:w-3/4">
	<div class="navbar bg-base-100 shadow-sm">
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h8m-8 6h16"
						/>
					</svg>
				</div>
				<ul
					tabindex="-1"
					class="dropdown-content menu z-1 mt-3 w-52 menu-sm rounded-box bg-base-100 p-2 shadow"
				>
					<li><a href={resolve('/archive')}>Archive</a></li>
					<!-- <li>
						<a>Parent</a>
						<ul class="p-2">
							<li><a>Submenu 1</a></li>
							<li><a>Submenu 2</a></li>
						</ul>
					</li> -->
					<li><a>Gallery</a></li>
					<li><a>Cast</a></li>
					<li><a>About</a></li>
				</ul>
			</div>
			<a class="btn text-xl btn-ghost" href={resolve('/')}>Interrobang</a>
		</div>
		<div class="navbar-end hidden lg:flex">
			<ul class="menu menu-horizontal px-1">
				<li><a href={resolve('/archive')}>Archive</a></li>
				<!-- <li>
					<details>
						<summary>Parent</summary>
						<ul class="p-2 bg-base-100 w-40 z-1">
							<li><a>Submenu 1</a></li>
							<li><a>Submenu 2</a></li>
						</ul>
					</details>
				</li> -->
				<li><a>Gallery</a></li>
				<li><a>Cast</a></li>
				<li><a>About</a></li>
			</ul>
		</div>
	</div>

	{@render children()}
</div>
