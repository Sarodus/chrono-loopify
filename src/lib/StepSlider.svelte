<script lang="ts">
	import type { Step } from './utils';

	export let steps: Step[] = [];
	export let max = 0;
	export let value = 0;

	let inputEl: HTMLInputElement;
	let width = 512;

	$: inputEl && getWidth();

	function getWidth() {
		width = inputEl?.getBoundingClientRect()?.width ?? 512;
	}
</script>

<div
	class="relative flex items-center justify-center max-w-lg gap-2 px-4 mx-auto text-black slider"
>
	<div class="absolute flex w-full h-5 px-4 py-1">
		{#each steps as step}
			<div
				class="h-full"
				style:width="{((step.to - step.from) / max) * 100}%"
				style:background-color={step.color}
			/>
		{/each}
	</div>

	<input
		class="z-10 w-full h-full bg-transparent"
		style="direction: rtl"
		type="range"
		list="steps"
		{max}
		{value}
		on:input
		bind:this={inputEl}
	/>

	<datalist id="steps">
		{#each steps as step, i}
			{#if i !== 0}
				<option value={step.from} />
			{/if}
			<option value={max} />
		{/each}
	</datalist>
</div>

<style>
	:root {
		--tracker-color: black;
	}

	.slider {
		--thumb-color: white;
		--thumb-behind-color: cyan;
		width: 100%;
	}

	input[type='range'] {
		-webkit-appearance: none;
		width: 100%;
	}

	input[type='range']:focus {
		outline: none;
	}

	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		cursor: pointer;
		border: 1px solid var(--tracker-color);
		overflow: hidden;
	}

	input[type='range']::-webkit-slider-thumb {
		height: 12px;
		width: 20px;
		cursor: pointer;
		-webkit-appearance: none;
		border-bottom: 1px solid var(--thumb-color);
		background: var(--thumb-color);
	}
</style>
