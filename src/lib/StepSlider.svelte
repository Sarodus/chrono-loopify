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

	$: css = cssColors(steps, width, max);

	function cssColors(steps: Step[], width: number, max: number) {
		const shadows = [];
		for (let i = 0; i < width; i++) {
			const step = steps.find((step) => step.to > (i * max) / width);
			if (!step) continue;
			shadows.push(`-${i}px 0 0 1px ${step.color}`);
		}
		return `<style>.slider input[type='range']::-webkit-slider-thumb { box-shadow: ${shadows.join(
			', '
		)};}</style>`;
	}
</script>

<svelte:window on:resize={getWidth} />
<svelte:head>
	{@html css}
</svelte:head>

<div class="relative flex items-center justify-center gap-2 px-4 text-black slider">
	<input
		class="h-full max-w-lg bg-transparent"
		style="direction: rtl"
		type="range"
		list="steps"
		{max}
		{value}
        on:input
		bind:this={inputEl}
	/>
	<!-- <datalist id="steps">
		{#each steps as step}
			<option value={max - step.from} />
		{/each}
	</datalist> -->
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

		/* box-shadow: -20px 0 0 20px purple, -40px 0 0 1000px orange; */

		/* box-shadow: 0 0 0 purple, -40px 0 0 orange,
			-85px 0 0 cyan, -130px 0 0 hotpink,
			-175px 0 0 var(--thumb-behind-color), -220px 0 0 var(--thumb-behind-color),
			-265px 0 0 var(--thumb-behind-color), -310px 0 0 var(--thumb-behind-color),
			-350px 0 0 var(--thumb-behind-color), -390px 0 0 var(--thumb-behind-color),
			-409px 0 0 var(--thumb-behind-color);  */
		background: var(--thumb-color);
	}

	datalist {
		display: flex;
		justify-content: space-between;

		/* box-shadow: 0 0 0 purple, 50px 0 0 orange, 100px 0 0 cyan; */
	}

	datalist option {
		position: relative;
		background: white;
		top: 18px;
		border-left: 1px solid black;
		border-right: 1px solid black;
		min-height: 13px;
	}

	datalist option:first-of-type {
		visibility: hidden;
	}

	datalist option:last-of-type {
		border-right: 0;
	}
</style>
