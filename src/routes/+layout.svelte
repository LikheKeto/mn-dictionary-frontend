<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { themeChange } from 'theme-change';
	import { locale } from 'svelte-i18n';
	import Alerts from '$lib/components/Alerts.svelte';

	let lang: boolean = $locale == 'en';

	$: if (lang) {
		$locale = 'en';
	} else {
		$locale = 'np';
	}

	onMount(() => {
		themeChange(false);
	});
	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter'
	];
</script>

<Alerts />

<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="cursor-pointer modal">
	<label class="relative modal-box" for="">
		<h3 class="text-lg font-bold">You can use some nifty shortcuts to use this app efficiently.</h3>
		<ul class="flex flex-col gap-2 p-4 list-disc">
			<li>
				Use <kbd class="kbd">Space</kbd> or <kbd class="kbd">Tab</kbd> to get transilterated nepali options
			</li>
			<li>
				Then you can use <kbd class="kbd">Tab</kbd> to walk through options
			</li>
			<li>
				Use <kbd class="kbd">Shift + Tab</kbd> to reverse walk through options
			</li>
			<li>
				Hitting <kbd class="kbd">Enter</kbd> on option will initiate dictionary search
			</li>
		</ul>
		<p class="py-4">
			Type like you always type,<q>Yesai gari type garnuhos</q>. The transliterated options are
			retrieved from gip api so all of them may not be actual nepali words.
		</p>
	</label>
</label>

<div class="absolute flex justify-between w-full p-4">
	<label for="my-modal-4" class="text-2xl btn btn-primary">?</label>
	<div class="flex gap-4">
		<label class="swap">
			<input bind:checked={lang} type="checkbox" />
			<div class="swap-on">en🇬🇧</div>
			<div class="swap-off">np🇳🇵</div>
		</label>
		<select
			class=" select select-bordered"
			name="theme-changer"
			id="theme-changer"
			data-choose-theme
		>
			{#each themes as theme}
				<option selected value={theme}>{theme}</option>
			{/each}
		</select>
	</div>
</div>
<div class="pt-[25vh] min-h-screen">
	<slot />
</div>
<footer class="sticky p-4 text-base footer footer-center bg-base-300 text-base-content">
	<div>
		<p>likheketo ko kaam</p>
	</div>
</footer>
