<script lang="ts">
	import '../../layout.css';
	let { children } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-base-200 p-4">
	<div class="w-full max-w-sm">
		<div class="mb-6 text-center">
			<h1 class="text-2xl font-bold tracking-tight">Interrobang</h1>
			<p class="mt-1 text-sm text-base-content/50">Creator Dashboard</p>
		</div>
		{@render children()}
	</div>
</div>
