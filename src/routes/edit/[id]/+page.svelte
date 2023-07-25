<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import headerStore from '$lib/headerStore';
	import chronoStore, { type ChronoRecord } from '$lib/store';
	import Node from './Node.svelte';

	headerStore.set({ size: 'sm', route: 'edit', search: '', selected: [] });

	$: browser && init($page.params.id);

	function init(id: string) {
		chrono = $chronoStore.find((chrono) => chrono.id === id);
		if (!chrono) {
			return goto('/');
		}
	}

	let chrono: ChronoRecord | undefined;
</script>

{#if chrono}
	<div class="grid gap-4 p-4">
		<div class="flex items-center justify-center">Total duration: XXX</div>

		<div>
			<label for="title">Title</label>
			<input
				id="title"
				class="w-full h-10 px-2 bg-transparent border border-white border-solid rounded"
				type="text"
				name="title"
			/>
		</div>

		<div>
			<label for="description">Description</label>
			<input
				id="description"
				class="w-full h-10 px-2 bg-transparent border border-white border-solid rounded"
				type="text"
				name="description"
			/>
		</div>

		<div>
			{#each chrono.nodes as node}
				<Node bind:node />
			{/each}
		</div>
	</div>

	<pre>{JSON.stringify(chrono, null, 4)}</pre>
{/if}
