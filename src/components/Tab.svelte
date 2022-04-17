<script>
	import { onDestroy, onMount } from "svelte";
	import { MDCTabBar } from '@material/tab-bar';

	// Internal variables
	let tabBar
	let tabBarObject

	// Props
	//export let tabActive = false;
	export let tabIcon = false;
	export let tabForProjects = true;

	// Component Initialization
	onMount(() => {
		tabBar = new MDCTabBar(tabBarObject)

		var contentEls = document.querySelectorAll('.content');

		tabBar.listen('MDCTabBar:activated', function(event) {
			// Hide currently-active content
			document.querySelector('.content--active').classList.remove('content--active');
			// Show content for newly-activated tab
			contentEls[event.detail.index].classList.add('content--active');
		}); 

	});

	onDestroy(() => {});

</script>

{#if tabForProjects}
	<div bind:this={tabBarObject} class="mdc-tab-bar" role="tablist">
		<div class="mdc-tab-scroller">
		<div class="mdc-tab-scroller__scroll-area">
			<div class="mdc-tab-scroller__scroll-content">
			<!-- this button will default to active via having mdc-tab--active class -->
			<button class="mdc-tab mdc-tab--active" role="tab" aria-selected="true" tabindex="0">
				<span class="mdc-tab__content">
				{#if tabIcon}
					<span class="mdc-tab__icon material-icons" aria-hidden="true">nondeveloper</span>
				{/if}
				<span class="mdc-tab__text-label">Non-Developer</span>
				</span>
				<span class="mdc-tab-indicator mdc-tab-indicator--active">
				<span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
				</span>
				<span class="mdc-tab__ripple"></span>
			</button>
			<button class="mdc-tab" role="tab" aria-selected="true" tabindex="0">
				<span class="mdc-tab__content">
				{#if tabIcon}
					<span class="mdc-tab__icon material-icons" aria-hidden="true">developer</span>
				{/if}
				<span class="mdc-tab__text-label">Developer</span>
				</span>
				<span class="mdc-tab-indicator">
				<span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
				</span>
				<span class="mdc-tab__ripple"></span>
			</button>
			</div>
		</div>
		</div>
	</div>
	<div class="content content--active">
		<slot name="non-dev-content"><p>Default content one</p></slot>
	</div>
	<div class="content">
		<slot name="dev-content"><p>Default content two</p></slot>
	</div>

{:else}

<div bind:this={tabBarObject} class="mdc-tab-bar" role="tablist">
	<div class="mdc-tab-scroller">
	<div class="mdc-tab-scroller__scroll-area">
		<div class="mdc-tab-scroller__scroll-content">
		<!-- this button will default to active via having mdc-tab--active class -->
		<button class="mdc-tab" role="tab" aria-selected="true" tabindex="0">
			<span class="mdc-tab__content">
			{#if tabIcon}
				<span class="mdc-tab__icon material-icons" aria-hidden="true">options</span>
			{/if}
			<span class="mdc-tab__text-label">Options</span>
			</span>
			<span class="mdc-tab-indicator">
			<span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
			</span>
			<span class="mdc-tab__ripple"></span>
		</button>
		</div>
	</div>
	</div>
</div>
<div class="content content--active">
	<slot name="roles-content"><p>Default content one</p></slot>
</div>

{/if}

<style lang="scss" global>
	@use "@material/theme" with (
	$primary: #00a4a2,
	);
	
	@use "@material/tab-bar/mdc-tab-bar";
	@use "@material/tab-scroller/mdc-tab-scroller";
	@use "@material/tab-indicator/mdc-tab-indicator";
	@use "@material/tab/mdc-tab";

	.content {
	display: none;
	}

	.content--active {
	display: block;
	padding-top: 16px;
	}
</style>