<script lang="ts">
	import type { ChronoNode } from '$lib/store';
	export let node: ChronoNode;
</script>

{#if node.isLoop}
	<hr />
	{node.title} - {node.loops}
	{#each node.nodes as nodeItem}
		<svelte:self bind:node={nodeItem} />
	{/each}
{:else}
	<div>
		<input type="color" class="w-12 h-12" bind:value={node.color} />
		<input
			class="w-20 bg-transparent border border-white border-solid rounded"
			type="number"
			min={0}
			bind:value={node.duration}
		/>
		<div>title: {node.title}</div>
		<div>duration: {node.duration}</div>
		<div>pauseOnFinish: {node.pauseOnFinish}</div>
		<div>color: {node.color}</div>
		<div>skipRepetitions: {node.skipRepetitions}</div>
	</div>
{/if}
