<script lang="ts">
	import { fade } from 'svelte/transition';
	import { nodesToTimeText } from '$lib/utils';
	import chronoStore from '$lib/store';
	import headerStore from '$lib/headerStore';
	import { goto } from '$app/navigation';
	import longPress from '$lib/actions/longPress';

	headerStore.set({ size: 'md', route: 'main', search: '', selected: [] });

	$: selectMode = !!$headerStore.selected.length;

	function addChrono() {
		const id = chronoStore.createEmptyChrono();
		goto(`/edit/${id}`);
	}

	function toggleSelected(chronoId: string) {
		console.log('TOGGLE?');
		if ($headerStore.selected.includes(chronoId)) {
			$headerStore.selected = $headerStore.selected.filter((id) => id !== chronoId);
		} else {
			$headerStore.selected = [...$headerStore.selected, chronoId];
		}
	}

	function onClick(chronoId: string) {
		if (selectMode) {
			toggleSelected(chronoId);
		} else {
			goto(`/chrono/${chronoId}`);
		}
	}
</script>

<div class="container grid gap-4 px-4 mx-auto mt-10">
	{#each $chronoStore as chrono (chrono.id)}
		{#if !$headerStore.search || chrono.title.includes($headerStore.search) || chrono.description.includes($headerStore.search)}
			<button
				transition:fade={{ duration: 100 }}
				use:longPress={{
					click: () => onClick(chrono.id),
					longPress: () => toggleSelected(chrono.id)
				}}
				class="flex gap-4 p-2 transition-colors rounded bg-slate-700 hover:bg-slate-600"
				class:!bg-orange-700={$headerStore.selected.includes(chrono.id)}
			>
				<div class="text-left grow">
					<div class="text-2xl">
						{chrono.title}
					</div>
					<div>
						{chrono.description}
					</div>
				</div>

				<div class="flex items-center justify-center">
					<div class="text-2xl">
						{nodesToTimeText(chrono.nodes)}
					</div>
				</div>

				<a
					href="/chrono/{chrono.id}?play=1"
					class="p-2.5 rounded-full hover:bg-white/10 aspect-square w-14 active:bg-white/30"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="100%"
						width="100%"
						class="ml-0.5 fill-white"
						id="play"
						x="0"
						y="0"
						version="1.1"
						viewBox="0 0 29 29"
						xml:space="preserve"
					>
						<path
							d="M6.568 27.002c-.49 0-.98-.127-1.429-.383a2.857 2.857 0 0 1-1.461-2.512V4.892c0-1.053.546-1.992 1.461-2.512.914-.521 2-.51 2.905.029l16.142 9.608c.883.526 1.411 1.454 1.411 2.483s-.528 1.957-1.411 2.483L8.045 26.591a2.884 2.884 0 0 1-1.477.411zM6.572 4a.922.922 0 0 0-.445.119.873.873 0 0 0-.45.773v19.216c0 .467.314.696.45.773a.873.873 0 0 0 .895-.009l16.141-9.608c.392-.233.435-.612.435-.764s-.042-.531-.435-.764L7.021 4.128A.858.858 0 0 0 6.572 4z"
						/>
					</svg>
				</a>
			</button>
		{/if}
	{/each}

	<button type="button" on:click={addChrono} class="h-full p-4 bg-slate-800">Add chrono</button>
</div>
