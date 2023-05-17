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
		word: 'कल',
		definitions: [
			{
				grammar: 'ना.',
				etymology: '[सं. कल]',
				senses: ['धेरै पुर्जा जोडेर बनाइएको विभिन्न कामका लागि प्रयोग गरिने साधन; यन्त्र; मेसिन।']
			},
			{
				grammar: 'ना.',
				etymology: '[सं. कलह]',
				senses: ['कलह; बाझाबाझ।']
			},
			{
				grammar: 'ना.',
				etymology: '[अङ्.]',
				senses: ['टेलिफोनबाट हुने वा गरिने कुराकानीका निम्तिको बोलावट वा खबर।']
			},
			{
				grammar: 'वि.',
				etymology: '[सं.]',
				senses: [
					'१. मन; इच्छा।',
					'२. मानसिक शान्ति।',
					'३. अर्थ नबुझिए पनि सुनिरहूँजस्तो मिठो र सुरिलो (कलरव, कलस्वर, कलध्वनि इ.)।'
				]
			},
			{
				grammar: 'ना.',
				etymology: '[दा.]',
				senses: ['नालाबाट आएको पानीलाई खोल्ने बन्द गर्ने एक प्रकारको साधन।']
			},
			{
				grammar: 'ना.',
				etymology: '[अस.]',
				senses: ['केरा।']
			}
		]
	};
	// {
	// 	word: '',
	// 	definitions: []
	// };
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
