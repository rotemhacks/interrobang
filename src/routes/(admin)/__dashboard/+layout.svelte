<script lang="ts">
	import '../../layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<h1>Interrobang Creator Dashboard</h1>

<div class="flex flex-row gap-4 w-full">
	<nav>
		<ul>
			<li>
				<a href="/__dashboard">Dashboard</a>
			</li>
			<li>
				<a href="/__dashboard/updates">Updates</a>
			</li>
			<li>
				<a href="/__dashboard/chapters">Chapters</a>
			</li>
			<li>
				<a href="/__dashboard/volumes">Volumes</a>
			</li>
		</ul>
	</nav>
	<div>
		{@render children()}
	</div>
</div>
