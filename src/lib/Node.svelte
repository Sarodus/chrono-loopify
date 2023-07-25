<script lang="ts">
	import type { ChronoNode } from '$lib/store';
	export let node: ChronoNode;
	export let deep = 0;
	export let loops = 0;

	let expanded = false;
</script>

<div style:margin-left="{deep * 20}px">
	{#if node.isLoop}
		<div class="mb-2 border border-white border-solid grid gap-2 grid-cols-[auto_1fr]">
			<label>
				Loops
				<input
					class="w-20 h-8 bg-transparent border border-white border-solid rounded"
					type="number"
					min={1}
					required
					bind:value={node.loops}
				/>
			</label>
			<input
				class="w-full h-8 bg-transparent border border-white border-solid rounded"
				type="text"
				bind:value={node.title}
			/>
		</div>
		{#each node.nodes as nodeItem}
			<svelte:self bind:node={nodeItem} deep={deep + 1} loops={node.loops} />
		{/each}
	{:else}
		<div class="grid gap-2 border border-white border-solid">
			<div class="grid items-center grid-cols-[auto_auto_1fr_auto] gap-2">
				<input type="color" class="w-12 h-12" bind:value={node.color} />
				<input
					class="w-20 h-8 bg-transparent border border-white border-solid rounded"
					type="number"
					min={0}
					required
					bind:value={node.duration}
				/>
				<div class="overflow-hidden grow text-ellipsis whitespace-nowrap">
					{node.title}
				</div>

				<button
					type="button"
					class="relative h-8 px-4 hover:bg-white/10 active:bg-white/30"
					on:click={() => (expanded = !expanded)}
				>
					<span class="absolute flex items-center justify-center -mt-4 -ml-2"> ⌄ </span>
				</button>
			</div>

			{#if expanded}
				<div class="px-4">
					<label class="grid">
						Work description
						<input
							class="h-8 bg-transparent border border-white border-solid rounded"
							type="text"
							bind:value={node.title}
						/>
					</label>
					<label class="flex items-center gap-4">
						<input type="checkbox" bind:checked={node.pauseOnFinish} />
						Pause on finish
					</label>

					{#if loops}
						<hr />
						<h4>Skip repetitions</h4>
						<div class="grid grid-cols-5">
							{#each { length: loops } as _, loop}
								<label>
									<input
										type="checkbox"
										checked={node.skipRepetitions.includes(loop)}
										bind:group={node.skipRepetitions}
										value={loop}
									/>
									{loop}
								</label>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</div>
