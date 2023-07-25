<script lang="ts">
	import { tick } from 'svelte';
	import { slide } from 'svelte/transition';

	export let value = '';
	export let open = false;
	let inputEl: HTMLInputElement;

	async function onOpen() {
		open = true;
		await tick();
		inputEl.focus();
	}

	function onBlur() {
		if (!value) {
			open = false;
		}
	}
</script>

<div class="flex items-center h-full">
	<button class="h-full p-4 hover:bg-white/10" on:click={onOpen}>
		<svg
			height="100%"
			width="100%"
			class="fill-white"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			id="search"
		>
			<path
				d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"
			/>
		</svg>
	</button>

	{#if open}
		<input
			transition:slide={{ axis: 'x' }}
			bind:this={inputEl}
			on:blur={onBlur}
			bind:value
			class="p-2 mr-4 bg-transparent border border-white border-solid rounded"
			type="search"
		/>
	{/if}
</div>

<style>
	[type='search']::-webkit-search-cancel-button {
		-webkit-appearance: none;
		background-color: white;
		-webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23777'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/></svg>");
		background-size: 20px 20px;
		height: 20px;
		width: 20px;
	}
</style>
