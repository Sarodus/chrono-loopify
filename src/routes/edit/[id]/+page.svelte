<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Edit from '$lib/Edit.svelte';
	import headerStore from '$lib/headerStore';
	import chronoStore, { type ChronoRecord } from '$lib/store';

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
	<Edit bind:chrono />
{/if}
