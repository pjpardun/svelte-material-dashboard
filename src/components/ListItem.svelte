<script>
	import { onDestroy, onMount } from "svelte";
 	import { MDCRipple } from "@material/ripple";

	// Internal variables
	let listElement;
	let slotValue;

	// Props
	export let dataValue = null;
	export let label = null;

	// Component Initialization
	onMount(() => {
		const listItemRipples = new MDCRipple(listElement);
	});

	onDestroy(() => {});
</script>

<li class="mdc-list-item" tabindex="0" data-value={dataValue} bind:this={listElement} on:click={(evt)=>console.log(`Clicked ListItem = ${JSON.stringify(slotValue.firstChild)}`)}>
	<span class="mdc-list-item__ripple"></span>
	<span class="mdc-list-item__text" bind:this={slotValue}>
		{#if !!label}
			{label}
		{:else}
			<slot>Default value</slot>
		{/if}
	</span>
</li>


<style lang="scss" global>
@use "@material/theme" with (
  $primary: #00a4a2,
);
@use "@material/list";

@include list.deprecated-core-styles;
</style>