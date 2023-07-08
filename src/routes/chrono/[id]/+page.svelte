<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount, tick } from 'svelte';
	import { getSequentialTimeNodeFromChronoNode } from '$lib/utils';
	import chronoStore, { type TimeNode } from '$lib/store';
	import { browser } from '$app/environment';
	import headerStore from '$lib/headerStore';

	headerStore.set({ size: 'sm', route: 'chrono', search: '', selected: [] });

	$: browser && init($page.params.id)

    async function init(id: string) {
        const chrono = $chronoStore.find((chrono) => chrono.id === id);
		if (!chrono) {
			return goto('/');
		}
        await tick()
        nodes = getSequentialTimeNodeFromChronoNode(chrono.nodes);
    }

	let nodes: TimeNode[] = [];
	let currentIndex = 0;
	let currentTime = 0;
    let currentNode;
	$: currentNode = nodes[currentIndex];

	function handleOnClick() {
		console.log('handleOnClick');
	}
</script>

<div class="w-full h-full transition-all duration-700" style:background-color={currentNode?.color ?? 'bg-slate-800'}>

    {#if currentNode}
        <button on:click={handleOnClick} class="w-full h-full">
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
</div>
