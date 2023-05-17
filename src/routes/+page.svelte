<script lang="ts">
	import { _ } from 'svelte-i18n';
	import MeaningCard from '$lib/components/MeaningCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { slide, scale } from 'svelte/transition';

	let results: {
		word: string;
		definitions: {
			etymology?: string;
			grammar?: string;
			senses: string[];
		}[];
	} = {
		word: '',
		definitions: []
	};
</script>

<svelte:head>
	<script type="text/javascript" src="https://www.google.com/jsapi"></script>
</svelte:head>

<div class="container max-w-3xl m-auto">
	<SearchBar bind:results />
	{#if results.word}
		<div class="mt-4" in:slide={{ delay: 300, duration: 100 }} out:slide={{ duration: 300 }}>
			{#key results.word}
				<h2 in:scale={{ delay: 300 }} out:scale class="text-3xl font-semibold text-center">
					{results.word}
				</h2>
			{/key}
			<div class="flex flex-col gap-2 p-5">
				{#each results.definitions as defn, i (defn)}
					<span in:slide={{ delay: (i + 4) * 100 }} out:slide={{ duration: 100 }}>
						<MeaningCard bind:word={results.word} bind:defn />
					</span>
				{/each}
			</div>
		</div>
	{/if}
</div>
