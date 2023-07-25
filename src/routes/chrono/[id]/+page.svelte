<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import StepSlider from '$lib/StepSlider.svelte';
	import headerStore from '$lib/headerStore';
	import chronoStore, { type TimeNode } from '$lib/store';
	import {
		findStep,
		getSequentialTimeNodeFromChronoNode,
		getStepsFromTimeNodes,
		getTotalTimeFromTimeNodes,
		timeToText
	} from '$lib/utils';
	import { tick } from 'svelte';

	headerStore.set({ size: 'sm', route: 'chrono', search: '', selected: [] });

	$: browser && init($page.params.id);

	async function init(id: string) {
		const chrono = $chronoStore.find((chrono) => chrono.id === id);
		if (!chrono) {
			return goto('/');
		}
		await tick();
		nodes = getSequentialTimeNodeFromChronoNode(chrono.nodes);
		steps = getStepsFromTimeNodes(nodes);
		totalTime = getTotalTimeFromTimeNodes(nodes);
		setNode(0);
		if ($page.url.searchParams.get('play')) {
			play();
		}
	}

	let totalTime = 0;
	let currentTotalTime = 0;
	let nodes: TimeNode[] = [];
	let currentIndex = 0;
	let currentTime = 0;
	let currentNode: TimeNode;
	let interval: ReturnType<typeof setInterval>;
	let finished = false;
	let playing = false;
	let steps: ReturnType<typeof getStepsFromTimeNodes> = [];

	function handleOnClick() {
		if (finished) {
			finished = false;
			setNode(0);
			play();
			return;
		}
		playing = !playing;
		if (playing) {
			play();
		} else {
			pause();
		}
	}

	function setNode(index: number) {
		currentIndex = index;
		currentNode = nodes[index];
		currentTime = currentNode.duration;
		currentTotalTime = currentNode?.totalTime ?? 0;
	}

	function play() {
		playing = true;
		clearInterval(interval);
		interval = setInterval(() => {
			currentTime--;
			currentTotalTime++;
			if (currentTime <= 0) {
				if (currentIndex < nodes.length - 1) {
					const pauseOnFinish = currentNode.pauseOnFinish;
					setNode(currentIndex + 1);
					if (pauseOnFinish) {
						pause();
					}
				} else {
					finished = true;
					pause();
				}
			}
		}, 1000);
	}

	function pause() {
		playing = false;
		clearInterval(interval);
	}
</script>

<div
	class="relative w-full h-full transition-all duration-700"
	style:background-color={currentNode?.color ?? 'bg-slate-800'}
>
	{#if currentNode}
		<button on:click={handleOnClick} class="grid grid-rows-[25%_25%] h-full pt-[15%] w-full gap-4">
			<div class="text-5xl text-center">
				<h4>{finished ? 'Click to restart' : currentNode.title}</h4>
				{#if currentNode.parentTitle && !finished}
					<h5 class="text-3xl">
						{currentNode.parentTitle}
					</h5>
				{/if}
			</div>
			<div class="text-9xl">
				{#if finished}
					END
				{:else}
					{timeToText(currentTime)}
				{/if}
			</div>

			<div class="flex items-center justify-center gap-2 px-4 text-black">
				<input
					class="h-full max-w-lg bg-transparent"
					style="direction: rtl"
					type="range"
					max={currentNode.duration}
					value={currentTime}
					on:input={(e) => {
						currentTime = +e.target.value;
					}}
				/>
			</div>
			<StepSlider
				{steps}
				max={totalTime}
				value={totalTime - currentTotalTime}
				on:input={(e) => {
					pause();
					const val = totalTime - +e.target.value;
					const { index, step } = findStep(steps, val);
					currentTotalTime = step.from;
					setNode(index);
				}}
			/>
		</button>
	{/if}
</div>

<style>
	input[type='range'] {
		height: 56px;
		-webkit-appearance: none;
		margin: 10px 0;
		width: 100%;
	}
	input[type='range']:focus {
		outline: none;
	}
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 12px;
		cursor: pointer;
		animate: 0.2s;
		background: #000000;
		border-radius: 50px;
		border: 0px solid #000000;
	}
	input[type='range']::-webkit-slider-thumb {
		border: 0px solid #000000;
		height: 50px;
		width: 50px;
		border-radius: 50px;
		background: white;
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -19px;
	}
	input[type='range']:focus::-webkit-slider-runnable-track {
		background: #000000;
	}
	input[type='range']::-moz-range-track {
		width: 100%;
		height: 12px;
		cursor: pointer;
		animate: 0.2s;
		background: #000000;
		border-radius: 50px;
		border: 0px solid #000000;
	}
	input[type='range']::-moz-range-thumb {
		border: 0px solid #000000;
		height: 50px;
		width: 50px;
		border-radius: 50px;
		background: white;
		cursor: pointer;
	}
	input[type='range']::-ms-track {
		width: 100%;
		height: 12px;
		cursor: pointer;
		animate: 0.2s;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	input[type='range']::-ms-fill-lower {
		background: #000000;
		border: 0px solid #000000;
		border-radius: 100px;
	}
	input[type='range']::-ms-fill-upper {
		background: #000000;
		border: 0px solid #000000;
		border-radius: 100px;
	}
	input[type='range']::-ms-thumb {
		margin-top: 1px;
		border: 0px solid #000000;
		height: 50px;
		width: 50px;
		border-radius: 50px;
		background: white;
		cursor: pointer;
	}
	input[type='range']:focus::-ms-fill-lower {
		background: #000000;
	}
	input[type='range']:focus::-ms-fill-upper {
		background: #000000;
	}
</style>
