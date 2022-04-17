<script>
  import { MDCRipple } from "@material/ripple";
  import { onDestroy, onMount } from "svelte";

  let buttonObject;
  let buttonRipple;

  onMount(() => {
    buttonRipple = new MDCRipple(buttonObject)
  });

  onDestroy(() => {});


</script>

<div class="mdc-touch-target-wrapper">
  <button bind:this={buttonObject} class="mdc-button">
    <div class="mdc-button__ripple"></div>
    <span class="mdc-button__label">
      <slot></slot>
    </span>
    <span class="mdc-button__touch" />
  </button>
</div>

<style lang="scss" global>
@use "@material/theme" with (
  $primary: rgb(0, 0, 0),
  // $secondary: #feeae6,
  // $on-primary: #442b2d,
  // $on-secondary: #442b2d,
);

@use '@material/button/mdc-button';
@use '@material/button';
@use '@material/ripple';

.mdc-button {
  // @include icon-button.core-styles;
  @include button.container-fill-color(#FFB842);
  min-width: 100px;
}
</style>