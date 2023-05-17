import { browser } from '$app/environment';
import { init, register, locale } from 'svelte-i18n';
import { writable } from 'svelte/store';

const defaultLocale = browser ? localStorage.getItem('locale') || 'en' : 'en';

register('en', () => import('./locales/en.json'));
register('np', () => import('./locales/np.json'));

init({
	fallbackLocale: 'en',
	initialLocale: defaultLocale
});
let currentLocaleEn = writable(defaultLocale === 'en');
locale.subscribe((val) => currentLocaleEn.set(val === 'en'));

if (browser) {
	currentLocaleEn.subscribe((val) => {
		localStorage.setItem('locale', val ? 'en' : 'np');
	});
}
