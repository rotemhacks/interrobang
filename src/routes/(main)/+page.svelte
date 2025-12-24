<script lang="ts">
	const { data } = $props();
</script>

{#if data.page?.url}
	<img src={data.page.url} alt={data.page.title} class="w-full max-w-7xl" />
{/if}