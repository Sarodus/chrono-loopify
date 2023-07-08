<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getSequentialTimeNodeFromChronoNode } from '$lib/utils';
	import chronoStore, { type TimeNode } from '$lib/store';
	import headerStore from '$lib/headerStore';

	headerStore.set({ size: 'sm', route: 'chrono', search: '', selected: [] });

	onMount(() => {
		const chrono = $chronoStore.find((chrono) => chrono.id === $page.params.id);
		if (!chrono) {
			goto('/');
		} else {
			nodes = getSequentialTimeNodeFromChronoNode(chrono.nodes);
		}
	});

	let nodes: TimeNode[] = [];
	let currentIndex = 0;
	let currentTime = 0;
	$: currentNode = nodes[currentIndex];

	$: console.log(nodes);

	function handleOnClick() {
		console.log('handleOnClick');
	}
</script>

{#if currentNode}
	<button on:click={handleOnClick} class="w-full h-full bg-red-600">
		<div class="text-5xl text-center">
			<h4>{currentNode.title}</h4>
			{#if currentNode.parentTitle}
				<h5 class="text-3xl">{currentNode.parentTitle}</h5>
			{/if}
		</div>
		<div class="text-6xl text-center top-[40%]">
			{currentNode.duration}
		</div>
	</button>
{/if}
