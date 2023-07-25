<script lang="ts">
	import { fade } from 'svelte/transition';
	import headerStore, { type HeaderStoreTypes } from './headerStore';
	import Search from './Search.svelte';
	import { page } from '$app/stores';

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
				<button on:click={onCancel} class="h-full px-4 hover:bg-white/10 active:bg-white/30">
					CANCEL
				</button>
			{:else}
				<Search bind:open={searchOpen} bind:value={$headerStore.search} />
			{/if}
		{:else if $headerStore.route === 'chrono'}
			<a
				href="/edit/{$page.params.id}"
				class="flex items-center justify-center h-full px-4 hover:bg-white/10 active:bg-white/30"
			>
				EDIT
			</a>
		{:else if $headerStore.route === 'edit'}
			<button
				on:click={() => headerStore.sendAction('add-loop')}
				class="h-full px-4 hover:bg-white/10 active:bg-white/30"
			>
				Add loop
			</button>
			<button
				on:click={() => headerStore.sendAction('add-chrono')}
				class="h-full px-4 hover:bg-white/10 active:bg-white/30"
			>
				Add chrono
			</button>
			<a
				href="/chrono/{$page.params.id}?play=1"
				class="flex items-center justify-center h-full px-4 hover:bg-white/10 active:bg-white/30"
			>
				Start
			</a>
		{/if}
	</div>
</div>
