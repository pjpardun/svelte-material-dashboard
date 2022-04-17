<script>
  import { MDCTopAppBar } from "@material/top-app-bar";
  import { onDestroy, onMount } from "svelte";
	import { createEventDispatcher } from 'svelte';

  import IconButton from './IconButton.svelte';
	import { mdiMenu, mdiMenuOpen } from '@mdi/js';

  import { appbarDense, appbarFixed, appbarMenuOpen, appbarProminent, appbarShort, appbarShortAlwaysClosed } from './stores.js';


  // Svelte event dispatcher
	// const dispatchSvelteEvent = createEventDispatcher();

  // Internal variables
  let topAppBarElement;
  let topAppBar;
  const debuggingMessages = false;

  // Props
  export let menuOpen = true;
  export let short = false;
  export let shortAlwaysClosed = false;
  export let fixed = false;
  export let prominent = false;
  export let dense = false;

  // Stores - subscribe and set initial value
  const unsubscribeAppbarDense = appbarDense.subscribe( initialValue => {
    appbarDense.set(dense);
  });
  const unsubscribeAppbarFixed = appbarFixed.subscribe( initialValue => {
    appbarFixed.set(fixed);
  });
  const unsubscribeAppbarMenuOpen = appbarMenuOpen.subscribe( initialValue => {
    appbarMenuOpen.set(menuOpen);
  });
  const unsubscribeAppbarProminent = appbarProminent.subscribe( initialValue => {
    appbarProminent.set(prominent);
  });
  const unsubscribeAppbarShort = appbarShort.subscribe( initialValue => {
    appbarShort.set(short);
  });
  const unsubscribeAppbarShortAlwaysClosed = appbarShortAlwaysClosed.subscribe( initialValue => {
    appbarShortAlwaysClosed.set(shortAlwaysClosed);
  });

  // Keep the stores updated
  $: appbarDense.set(dense);
  $: appbarFixed.set(fixed);
  $: appbarMenuOpen.set(menuOpen);
  $: appbarProminent.set(prominent);
  $: appbarShort.set(short);
  $: appbarShortAlwaysClosed.set(shortAlwaysClosed);


  onMount(() => {
    topAppBar = new MDCTopAppBar(topAppBarElement)
    // topAppBar.init();
  });

  onDestroy(() => {
    // Unsubscribe from the stores
    unsubscribeAppbarDense();
    unsubscribeAppbarFixed();
    unsubscribeAppbarMenuOpen();
    unsubscribeAppbarProminent();
    unsubscribeAppbarShort();
    unsubscribeAppbarShortAlwaysClosed();

    // topAppBar.destroy();
  });

</script>

<header class="mdc-top-app-bar" bind:this={topAppBarElement}
  class:mdc-top-app-bar--short={short}
  class:mdc-top-app-bar--short-collapsed={shortAlwaysClosed}
  class:mdc-top-app-bar--fixed={fixed}
  class:mdc-top-app-bar--prominent={prominent}
  class:mdc-top-app-bar--dense={dense}
>
  <div class="mdc-top-app-bar__row">
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
      <slot name="icon-button">
        <IconButton 
          on:click={ () => { console.log("Menu button clicked") }}
          on:MDCIconButtonToggle={(data) => console.log(JSON.stringify(data.detail))} 
          svgIcon={mdiMenu} svgIconToggled={mdiMenuOpen}
          ariaLabel="Open navigation menu" ariaLabelToggled="Close navigation menu"
          bind:toggled={menuOpen}
        />
      </slot>
      <span class="mdc-top-app-bar__title"><slot name="title">Page Title</slot></span>
    </section>
    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
      <slot name="appbar-items">
        <!-- <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Favorite">favorite</button>
        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Search">search</button>
        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button" aria-label="Options">more_vert</button> -->
      </slot>
    </section>
  </div>
</header>
<!-- <main
  class:mdc-top-app-bar--fixed-adjust={!short && !prominent && !dense}
  class:mdc-top-app-bar--short-fixed-adjust={short || shortAlwaysClosed}
  class:mdc-top-app-bar--prominent-fixed-adjust={prominent}
  class:mdc-top-app-bar--dense-fixed-adjust={dense}
>
  <slot>App content</slot>
</main> -->





<style lang="scss" global>
@use "@material/theme" with (
  $primary: #00a4a2,
);

@use "@material/icon-button";
@use "@material/top-app-bar/mdc-top-app-bar";

@include icon-button.core-styles;

.mdc-top-app-bar--fixed-adjust {
  padding-top: 24px;
  background: rgb(242,242,242);
}

.mdc-top-app-bar__title {
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
</style>