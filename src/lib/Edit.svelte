<script lang="ts">
	import { goto } from '$app/navigation';
	import Node from './Node.svelte';
	import headerStore from './headerStore';
	import type { ChronoRecord } from './store';
	import chronoStore from './store';

	export let chrono: ChronoRecord;

	headerStore.setHandler(handleHeaderAction);

	function handleHeaderAction(action: string) {
		switch (action) {
			case 'add-loop':
				chrono.nodes = [
					...chrono.nodes,
					{
						isLoop: true,
						nodes: [],
						title: '',
						loops: 1
					}
				];
				break;
			case 'add-chrono':
				chrono.nodes = [
					...chrono.nodes,
					{
						isLoop: false,
						color: '#000000',
						duration: 10,
						pauseOnFinish: false,
						skipRepetitions: [],
						title: ''
					}
				];
				console.log('add-chrono');
				break;
		}
	}

	function onSubmit() {
		chronoStore.saveChrono(chrono);
		goto('/');
	}
</script>

<div class="container grid gap-4 p-4 mx-auto">
	<div class="flex items-center justify-center">Total duration: XXX</div>

	<div class="grid">
		<label for="title">Title</label>
		<input
			id="title"
			bind:value={chrono.title}
			class="h-10 px-2 bg-transparent border border-white border-solid rounded"
			type="text"
			name="title"
		/>
	</div>

	<div class="grid">
		<label for="description">Description</label>
		<input
			id="description"
			bind:value={chrono.description}
			class="h-10 px-2 bg-transparent border border-white border-solid rounded"
			type="text"
			name="description"
		/>
	</div>

	<form on:submit|preventDefault={onSubmit} class="grid gap-2">
		{#each chrono.nodes as node}
			<Node bind:node />
		{/each}

		<button class="w-full h-10 mt-10 bg-slate-500" type="submit"> Save </button>
	</form>
</div>

<!-- <pre>{JSON.stringify(chrono, null, 4)}</pre> -->
