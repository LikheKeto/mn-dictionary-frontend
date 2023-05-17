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
<div class="absolute flex items-center justify-center gap-4 right-10 top-10">
	<label class="swap">
		<input bind:checked={lang} type="checkbox" />
		<div class="swap-on">en🇬🇧</div>
		<div class="swap-off">np🇳🇵</div>
	</label>
	<select class=" select select-bordered" name="theme-changer" id="theme-changer" data-choose-theme>
		{#each themes as theme}
			<option selected value={theme}>{theme}</option>
		{/each}
	</select>
</div>
<div class="pt-[25vh] min-h-screen">
	<slot />
</div>
<footer class="sticky p-4 text-base footer footer-center bg-base-300 text-base-content">
	<div>
		<p>likheketo ko kaam</p>
	</div>
</footer>
