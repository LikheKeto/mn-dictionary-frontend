<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { _ } from 'svelte-i18n';
	import { alerts } from '$lib/alerts';

	const N_PROBABLE_WORDS = 5;

	export let results;

	let searchTerm = '';
	let searchBox: HTMLInputElement;

	let probableWords: string[] = [];
	let selectedProbableWord = 0;

	onMount(() => {
		searchBox.focus();
		window.addEventListener('keypress', (e) => {
			if (e.key === '/') {
				e.preventDefault();
				searchBox.focus();
			}
		});
		searchBox.addEventListener('keydown', (e) => {
			if (e.key === 'Backspace') {
				probableWords = [];
				selectedProbableWord = 0;
			}
			if (e.key === 'Enter') searchOrSelectProbableWord();
			if (e.key === 'Tab') {
				e.preventDefault();
				if (probableWords.length > 0) {
					if (e.shiftKey) selectedProbableWord--;
					else selectedProbableWord++;
					if (selectedProbableWord == -1) selectedProbableWord = 4;
					selectedProbableWord %= N_PROBABLE_WORDS;
					return;
				}
			}
			if (e.key === ' ' || e.key === 'Tab') {
				e.preventDefault();
				getProbableWords();
			}
		});
	});

	const searchHandler = async () => {
		const res = await fetch('http://localhost:8080/search?word=' + searchTerm);
		const parsedRes = await res.json();
		if (!parsedRes.error) {
			results = parsedRes;
		} else {
			alerts.error(parsedRes.error, 1000);
		}
	};

	const getProbableWords = async () => {
		if (probableWords.length > 0) return;
		searchTerm = searchTerm.trim();
		if (!searchTerm) {
			return;
		}
		const res = await fetch(
			`http://inputtools.google.com/request?text=${searchTerm}&itc=ne-t-i0-und&num=${N_PROBABLE_WORDS}&cp=0&cs=1&ie=utf-8`
		);
		const parsedRes = await res.json();
		if (parsedRes?.length > 0 && parsedRes[0] === 'SUCCESS' && parsedRes[1].length > 0) {
			probableWords = parsedRes[1][0][1];
		} else {
			alerts.warning('No transliteration found!', 1000);
		}
	};

	async function searchOrSelectProbableWord() {
		searchTerm = searchTerm.trim();
		if (!searchTerm) return;
		if (searchTerm.match(RegExp('^[a-zA-Z]*$')) && probableWords.length < 1) {
			await getProbableWords();
			searchTerm = probableWords[0];
			await searchHandler();
		}
		if (probableWords.length < 1 || searchTerm === '') return;
		if (searchTerm === probableWords[selectedProbableWord]) {
			return;
		} else {
			searchTerm = probableWords[selectedProbableWord];
			await searchHandler();
		}
	}
</script>

<div class="flex flex-col gap-3 p-5 m-auto text-center">
	<span class="text-3xl font-bold"> {$_('title')} </span>
	<br />
	<div class="flex w-full gap-2">
		<input
			bind:this={searchBox}
			bind:value={searchTerm}
			placeholder={$_('startSearch')}
			maxlength="30"
			class="p-4 text-xl input input-primary w-[100%]"
		/>
		<button on:click={searchOrSelectProbableWord} class="btn btn-primary">{$_('search')}</button>
	</div>
	{#if probableWords.length > 0}
		<div class="flex flex-wrap gap-2">
			{#each probableWords as probableWord, i}
				<div
					on:click={() => {
						selectedProbableWord = i;
					}}
					on:keypress={() => {}}
					transition:slide={{ delay: i * 100 }}
					class="p-4 cursor-pointer border-none badge badge-lg {i === selectedProbableWord
						? 'bg-primary'
						: ''}"
				>
					{probableWord}
				</div>
			{/each}
		</div>
	{/if}
</div>
