<script lang="ts">
	import { alerts, type Alert } from '$lib/alerts';
	import { slide } from 'svelte/transition';

	let alertsArr: Alert[] = [];
	alerts.subscribe((val) => (alertsArr = val));
</script>

<div class="container fixed bottom-0 z-10 flex flex-col w-full gap-1 left-[50%] translate-x-[-50%]">
	{#each alertsArr as alert, index (alert.id)}
		<div
			class="shadow-lg rounded-b-none {index !== 0
				? 'rounded-none'
				: ''} alert alert-{alert.type} transition-all"
			transition:slide
		>
			<div>
				{#if alert.type === 'info'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="flex-shrink-0 w-6 h-6 stroke-current"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
				{:else if alert.type === 'success'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="flex-shrink-0 w-6 h-6 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
				{:else if alert.type === 'error'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="flex-shrink-0 w-6 h-6 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
				{:else if alert.type === 'warning'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="flex-shrink-0 w-6 h-6 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/></svg
					>
				{/if}
				<span>{alert.message}</span>
			</div>
		</div>
	{/each}
</div>
