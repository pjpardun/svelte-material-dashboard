<script>
	import { onDestroy, onMount } from "svelte";
	import { MDCRipple } from "@material/ripple";

	// Internal variables
	let card;
	let cardElement;
	let primaryActionElement;

	// Props
	export let outlined = false;
	export let imageUrl;
	export let actionable = true;
	export let imageRatioSquare = false;
	export let fullBleed = false;
	export let title = false;
	export let skinnyCards = false;
	export let verticalFill = false;
	export let scrollable = false;
	
	export let height = null;


	// Component Initialization
	onMount(() => {
		// Make the card ripple
		if (actionable) new MDCRipple(primaryActionElement);
	});

	onDestroy(() => {});

</script>



<div bind:this={cardElement} class="mdc-card"
	class:mdc-card--outlined={outlined}
	class:skinny-card={skinnyCards}
	class:fatty-card={!skinnyCards}
	class:vertical-fill-available={verticalFill}
	class:scrollable={scrollable}
	class:fixedHeight={height && height >= 0}
	style="--my-computed-height: {height}px"
>
	<div bind:this={primaryActionElement} 
		class:mdc-card__actions--full-bleed={fullBleed}
		class:mdc-card__primary-action={actionable} tabindex="0" 
		style="--image-url: url({imageUrl})">

		<!-- Title and image background -->
		<div class="mdc-card__media"
			class:my-card__media={!!imageUrl}
			class:mdc-card__media--16-9={!!imageUrl && !imageRatioSquare}
			class:mdc-card__media--square={!!imageRatioSquare}
			class:fatty-title-padding={title && !skinnyCards}
			class:skinny-title-padding={title && skinnyCards}
		>
			<div class="mdc-card__media-content mdc-typography--headline6">
				{#if title}
					<div class:title-expander={!skinnyCards}>
						<slot name="title">Card Title</slot>
					</div>
					<hr class="ruler">
				{/if}
			</div>
		</div>

		<!-- Card contents -->
		<div class="mdc-card__content freeform-text-content"><slot/></div>
		<slot name="nonsemanticContent"/>
	
		<!-- Actions -->
		{#if actionable}
		<div class="mdc-card__actions">
			<div class="mdc-card__action-buttons">
				<button class="mdc-button mdc-card__action mdc-card__action--button">
					<div class="mdc-button__ripple"></div>
					<span class="mdc-button__label">Action 1</span>
				</button>
				<button class="mdc-button mdc-card__action mdc-card__action--button">
					<div class="mdc-button__ripple"></div>
					<span class="mdc-button__label">Action 2</span>
				</button>
			</div>
			<!-- <div class="mdc-card__action-icons">
				<button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Share">share</button>
				<button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="More options">more_vert</button>
			</div> -->
		</div>
		{/if}

		<!-- Ripples -->
		<div class="mdc-card__ripple"></div>
	</div>
	
</div>
  



<style lang="scss" global>
	@use "@material/typography/mdc-typography";
	@use "@material/card";

	@include card.core-styles;

	// .freeform-text-content {
	// 	padding-top: 16px;
	// 	padding-bottom: 16px;
	// }

	.fixed-card-size {
		height: 350px;
		width: 350px;
	}

	.my-card__media {
		background-image: var(--image-url);
	}

	.mdc-typography--headline6 {
		font-size: 18px,
	};

	.fatty-card {
		margin: 20px;
		// padding-top: 20px;
		// padding-left: 20px;
		// padding-right: 20px;
		// padding-bottom: 0px;
		background-color: rgb(250,250,250);
	}

	.skinny-card {
		margin: 0px;
	}

	.vertical-fill-available {
		height: 100%;
	}

	.fatty-title-padding {
		padding-top: 48px;
	}

	.skinny-title-padding {
		padding-top: 28px;
	}

	.fatty-title-padding .skinny-title-padding {
		-webkit-user-select: none; /* Safari */        
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* IE10+/Edge */
		user-select: none; /* Standard */
	}

	.title-expander {
		padding: 8px;
		padding-left: 16px;
		background-color: white;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}

	.ruler {
		border: 0;
		height: 0;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
		margin: 0px;
	}
	
	.scrollable {
		overflow-y: auto;
	}

	.fixedHeight {
		height: var(--my-computed-height);
	}


</style>