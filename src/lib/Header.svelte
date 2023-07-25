<script lang="ts">
	import { fade } from 'svelte/transition';
	import headerStore, { type HeaderStoreTypes } from './headerStore';
	import Search from './Search.svelte';

	let searchOpen = false;

	const SIZE_MAP: Record<HeaderStoreTypes['size'], string> = {
		sm: 'h-12',
		md: 'h-20'
	};

	function onCancel() {
		$headerStore.selected = [];
	}
</script>

<div
	class="flex items-center justify-between transition-all bg-slate-800
	{SIZE_MAP[$headerStore.size]}"
	class:!bg-orange-700={$headerStore.selected.length > 0}
>
	{#if !$headerStore.selected.length && !searchOpen}
		<a
			in:fade={{ delay: 100 }}
			href="/"
			class="flex items-center justify-center h-full px-4 text-2xl hover:bg-white/10"
		>
			Chrono Loopify
		</a>
	{:else}
		<div />
	{/if}
	<div class="flex items-center h-full">
		{#if $headerStore.route === 'main'}
			{#if $headerStore.selected.length > 0}
				{#if $headerStore.selected.length === 1}
					<a
						href="/edit/{$headerStore.selected[0]}"
						class="flex items-center justify-center h-full px-4 hover:bg-white/10 active:bg-white/30"
					>
						EDIT
					</a>
				{/if}
				<button class="h-full px-4 hover:bg-white/10 active:bg-white/30">OTHER OPTIONS</button>
				<button on:click={onCancel} class="h-full px-4 hover:bg-white/10 active:bg-white/30">
					CANCEL
				</button>
			{:else}
				<Search bind:open={searchOpen} bind:value={$headerStore.search} />
			{/if}
		{:else if $headerStore.route === 'chrono'}
			<button class="h-full px-4 hover:bg-white/10 active:bg-white/30">OTHER OPTIONS</button>
		{:else if $headerStore.route === 'edit'}
			<button class="h-full px-4 hover:bg-white/10 active:bg-white/30">OTHER OPTIONS</button>
		{/if}
	</div>
</div>
