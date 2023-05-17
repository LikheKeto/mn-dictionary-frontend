<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let word: string = '';
	export let defn: {
		etymology?: string;
		grammar?: string;
		senses: string[];
	} = {
		etymology: '',
		grammar: '',
		senses: []
	};
</script>

<div class="p-4 rounded-lg bg-base-200">
	<div class="flex justify-between">
		<div class="flex items-end gap-2">
			<p class="text-2xl font-semibold text-primary">{word}</p>
			<div>{defn.grammar || ''}</div>
		</div>
		{#if defn.etymology}
			<div class="flex gap-2">
				<p>{$_('etymology')}:</p>
				{defn.etymology}
			</div>
		{/if}
	</div>
	<hr class="my-1 border border-primary" />
	<!-- <p class="text-lg underline">{$_('meaning')}</p> -->
	<div>
		{#each defn.senses as sense}
			<div class="text-lg">{sense}</div>
		{/each}
	</div>
</div>
