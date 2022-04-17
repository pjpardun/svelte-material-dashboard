<script>
  import { onDestroy, onMount } from "svelte";

  import { appbarDense, drawerDismissible, appbarProminent, appbarShort, appbarShortAlwaysClosed } from './stores.js';


  // Internal variables
  let mainElement;
  const debuggingMessages = false;

  onMount(() => {
    // mainElement stuff
  });

  onDestroy(() => {
  });

</script>


<main id="main-content" bind:this={mainElement}
	class="main-content"
	class:mdc-top-app-bar--fixed-adjust={!$appbarShort && !$appbarProminent && !$appbarDense}
	class:mdc-top-app-bar--short-fixed-adjust={$appbarShort || $appbarShortAlwaysClosed}
	class:mdc-top-app-bar--prominent-fixed-adjust={$appbarProminent}
	class:mdc-top-app-bar--dense-fixed-adjust={$appbarDense}
	class:mdc-drawer-app-content={$drawerDismissible}
>
	<div class="mdc-top-app-bar--fixed-adjust">
    <slot>
      There is no content specified yet in the Main element.
    </slot>
	</div>
</main>




<style lang="scss" global>

.main-content {
  overflow-x: clip;
  overflow-y: visible;
}


</style>