<script>
  import { onDestroy, onMount } from "svelte";
  import {MDCSnackbar} from '@material/snackbar';

  // Internal variables
  let snackbar;
  let snackbarElement;
  let message = "An error has occurred.";
  
  // Props
  export let buttonLabel = "Dismiss";
  export let showButton = true;
  
  /**
   * Open the snackbar
   */
  export const open = (msg = "An error has occurred.") => { 
    // Only do it if the snackbarElement is good to go
    if (!!snackbarElement) {
      message = msg;
      snackbar.open();
    }
  };

  export const close = (closeReason) => {
    // Only do it if the snackbarElement is good to go
    if (!!snackbarElement) {
      snackbar.close(closeReason);
    }
  };

  // Component Initialization
  onMount(() => {
    snackbar = new MDCSnackbar(snackbarElement);
  });

  onDestroy(() => {});

</script>

<aside class="mdc-snackbar" bind:this={snackbarElement}>
  <div class="mdc-snackbar__surface" role="status" aria-relevant="additions">
    <div class="mdc-snackbar__label" aria-atomic="false">
      {message}
    </div>
    {#if showButton}
    <div class="mdc-snackbar__actions" aria-atomic="true">
      <button type="button" on:click class="mdc-button mdc-snackbar__action">
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">{buttonLabel}</span>
      </button>
    </div>
    {/if}
  </div>
</aside>


<style lang="scss" global>
  @use "@material/snackbar/mdc-snackbar";


</style>