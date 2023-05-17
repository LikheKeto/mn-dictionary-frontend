import { derived, writable, type Writable } from 'svelte/store';

type alerts = 'info' | 'warning' | 'success' | 'error';

export type Alert = {
	id: number;
	type: alerts;
	message: string;
	timeout: number;
};

let id = 0;

function createAlertsStore() {
	const _alerts = writable<Alert[]>([]);

	function send(message: string, type: alerts = 'info', timeout: number) {
		_alerts.update((state) => [...state, { id: id++, type, message, timeout }]);
	}

	const alerts = derived<Writable<Alert[]>, Alert[]>(_alerts, ($_alerts, set) => {
		set($_alerts);
		if ($_alerts.length > 0) {
			const timer = setTimeout(() => {
				_alerts.update((state) => state.slice(1));
			}, $_alerts[0].timeout);
			return () => {
				clearTimeout(timer);
			};
		}
	});

	const { subscribe } = alerts;

	return {
		subscribe,
		send,
		info: (msg: string, timeout: number) => send(msg, 'info', timeout),
		warning: (msg: string, timeout: number) => send(msg, 'warning', timeout),
		success: (msg: string, timeout: number) => send(msg, 'success', timeout),
		error: (msg: string, timeout: number) => send(msg, 'error', timeout)
	};
}

export const alerts = createAlertsStore();
