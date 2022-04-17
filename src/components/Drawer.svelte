<svelte:head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</svelte:head>

<script>
  import { MDCList } from "@material/list";
  import { MDCDrawer } from "@material/drawer";
  import { onDestroy, onMount } from "svelte";
	import { createEventDispatcher } from 'svelte';
  import {link} from 'svelte-spa-router';

  import { appbarDense, appbarFixed, appbarProminent, appbarShort, appbarShortAlwaysClosed, drawerDismissible, drawerModal } from './stores.js';


  // Svelte event dispatcher
	const dispatchSvelteEvent = createEventDispatcher();

  // Internal variables
  let drawerElement;
  let drawer;
  const debuggingMessages = false;

  // Props
  export let drawerOpen = true;
  export let permanentlyOpen = false;


  /**
   * Dismissible drawers are by default hidden off screen, and can slide into view. Dismissible drawers should be used when navigation is not common, and the main app content is prioritized.
   */
  export let dismissible = false;
  export let modal = false;


  /**
   * Drawers can contain a header element which will not scroll with the rest of the drawer content. Things like account switchers and titles should live in the header element.
   */
  // export let header = {"title": "Drawer Title", "subtitle": "Drawer subtitle"};
  export let header = null;


  // Stores - subscribe and set initial value
  const unsubscribeDrawerDismissible = drawerDismissible.subscribe( initialValue => {
    drawerDismissible.set(dismissible);
  });
  const unsubscribeDrawerModal = drawerModal.subscribe( initialValue => {
    drawerModal.set(modal);
  });

  // Keep the stores updated
  $: drawerDismissible.set(dismissible);
  $: drawerModal.set(modal);
  

  // Bind the drawer state
  $: if (drawer) drawer.open = drawerOpen;


  
  onMount(() => {

    // For permanently visible drawer, the list must be instantiated for appropriate keyboard interaction
    if (permanentlyOpen || (!dismissible && !modal)) {
      drawer = new MDCList(drawerElement);
      drawer.wrapFocus = true;

    } else {
      // Other variants use the MDCDrawer component, which will instantiate MDCList automatically
      drawer = new MDCDrawer(drawerElement);
    }

    // Set initial drawer open state
    drawer.open = drawerOpen;    


    // // TODO: Relocate to App
    // // Refocus browser focus() on main content when drawer closes
    // document.body.addEventListener('MDCDrawer:closed', () => {
    //   mainContentEl.querySelector('input, button').focus();
    // });
  });

  onDestroy(() => {
    // Unsubscribe from the stores
    unsusbscribeDrawerDismissible();
    unsubscribeDrawerModal();
    // topAppBar.destroy();
  });

  const drawerClick = (event) => {
    console.log(`drawerClick() called! event.target = `);
    console.log(event.target);

    // Modal drawer closes when there's a click
    if (modal) {
      drawer.open = !drawer.open;
      drawerOpen = !drawerOpen;
    }

    // TODO: Figure out which menu item was clicked, and set "activated"

  };

</script>




<aside class="mdc-drawer mdc-top-app-bar-below" bind:this={drawerElement} on:click={drawerClick}
  class:mdc-drawer--modal={modal}
  class:mdc-drawer--dismissible={dismissible}
  class:drawer-fixed={$appbarFixed}
  class:mdc-top-app-bar--fixed-adjust={!$appbarShort && !$appbarProminent && !$appbarDense}
	class:mdc-top-app-bar--short-fixed-adjust={$appbarShort || $appbarShortAlwaysClosed}
	class:mdc-top-app-bar--prominent-fixed-adjust={$appbarProminent}
	class:mdc-top-app-bar--dense-fixed-adjust={$appbarDense}
>
  {#if !!header}
  <div class="mdc-drawer__header">
    <h3 class="mdc-drawer__title">{header.title}</h3>
    <h6 class="mdc-drawer__subtitle">{header.subtitle}</h6>
  </div>
  {/if}
  <div class="mdc-drawer__content">
    <slot name="drawerContent">
      <nav class="mdc-list" style="padding: 0px;">
        <a class="mdc-list-item mdc-list-item--activated" href="/templates" use:link aria-current="page" style="padding-top: 20px; padding-bottom: 20px; padding-left: 20px">
          <span class="mdc-list-item__ripple"></span>
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true">control_point_duplicate</i>
          <span class="mdc-list-item__text drawerSpan">Templates</span>
        </a>
        <a class="mdc-list-item" href="/projects" use:link style="padding-top: 20px; padding-bottom: 20px; padding-left: 20px">
          <span class="mdc-list-item__ripple"></span>
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true">add_circle_outline</i>
          <span class="mdc-list-item__text drawerSpan">Projects</span>
        </a>
        <a class="mdc-list-item" href="/userprofiles" use:link style="padding-top: 20px; padding-bottom: 20px; padding-left: 20px">
          <span class="mdc-list-item__ripple"></span>
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true">face</i>
          <span class="mdc-list-item__text drawerSpan">User Profiles</span>
        </a>
        <a class="mdc-list-item" href="/devprofiles" use:link style="padding-top: 20px; padding-bottom: 20px; padding-left: 20px">
          <span class="mdc-list-item__ripple"></span>
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true">face_retouching_natural</i>
          <span class="mdc-list-item__text drawerSpan">Developer Profiles</span>
        </a>
        <a class="mdc-list-item" href="/dashboard" use:link style="padding-top: 20px; padding-bottom: 20px; padding-left: 20px">
          <span class="mdc-list-item__ripple"></span>
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true">timelapse</i>
          <span class="mdc-list-item__text drawerSpan">Dashboard</span>
        </a>
      </nav>
    </slot>
  </div>
</aside>

{#if modal}
<div class="mdc-drawer-scrim" on:click={drawerClick}></div>
{/if}




<style lang="scss" global>

@use "@material/drawer";
@use "@material/list";

@include drawer.core-styles;
@include drawer.dismissible-core-styles;
@include drawer.modal-core-styles;
@include list.deprecated-core-styles;

// Note: These styles do not account for any paddings/margins that you may need.
body {
  display: flex;
  height: 100vh;
}

.drawerSpan {
  padding-left: 20px;
}

.mdc-drawer-app-content {
  flex: auto;
  overflow: auto;
  position: relative;
}

.main-content {
  overflow-x: clip;
  overflow-y: visible;
  height: 100%;
}

.app-bar {
  position: absolute;
}

// Only apply this style if below top app bar.
.mdc-top-app-bar-below {
  z-index: 0;
}

.drawer-fixed {
  position: fixed;
}

.mdc-drawer {
  background:rgb(228,229,229);
}

.mdc-list-item .mdc-list-item__ripple .mdc-list-item__graphic .mdc-list-item__text {
  @include list.deprecated-single-line-height(20px);
}
// :global(.mdc-list-item .mdc-list-item__ripple .mdc-list-item__graphic .mdc-list-item__text) {
//   padding:20px;
// }
</style>