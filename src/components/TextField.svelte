<script>
  import { onDestroy, onMount } from "svelte";
  import { MDCTextField } from '@material/textfield';
  import { mdiMagnify  } from '@mdi/js';

  // Internal variables
  let textField
  let textFieldElement
  
  // Props
  export let isTextArea = false;
  export let rows = 1;
  export let cols = 15;
  export let height = undefined;
  export let value;
  export let placeholderText = null;
  export let isSearch = false;
  export let type = "text";
  export let min;
  export let max;



  // Component Initialization
  onMount(() => {
    textField = new MDCTextField(textFieldElement)
  });

  onDestroy(() => {});

</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label bind:this={textFieldElement} class="mdc-text-field mdc-text-field--outlined mdc-text-field--no-label"
class:mdc-text-field--textarea={isTextArea} class:search-padding={isSearch} style="--height-field: {height}px;"
>
  <span class="mdc-notched-outline" class:adjustHeight={height}>
    <span class="mdc-notched-outline__leading">
      {#if isSearch}
      <svg style="height:33px; width:30px; padding-top:10px; padding-left:7.5px;"><path fill="#cccccc" d={mdiMagnify}/></svg>
      {/if}
    </span>
    <span class="mdc-notched-outline__trailing"></span>
  </span>
  {#if isTextArea}
    <textarea class="mdc-text-field__input" rows={rows} cols={cols} aria-label="Label" placeholder={placeholderText} bind:value={value}></textarea>
  {:else if type.toLowerCase() == "date"}
    <input class="mdc-text-field__input" type="date" {min} {max} aria-label="Label" placeholder={placeholderText} bind:value={value}>
  {:else if type.toLowerCase() == "datetime-local"}
    <input class="mdc-text-field__input" type="datetime-local" {min} {max} aria-label="Label" placeholder={placeholderText} bind:value={value}>
  {:else}
    <input class="mdc-text-field__input" type="text" {min} {max} aria-label="Label" placeholder={placeholderText} bind:value={value}>
  {/if}
</label>

<style lang="scss" global>
  @use "@material/theme" with (
    $primary: #018786
  );

  @use "@material/notched-outline/mdc-notched-outline";
  @use "@material/textfield";

  $heightField: 45px;

  @include textfield.core-styles;

  .mdc-text-field--outlined .mdc-notched-outline {
    @include textfield.outlined-height( $heightField );
  }
  .mdc-text-field__input {
    @include textfield.height( $heightField );
  }
  .mdc-text-field--outlined {
    @include textfield.height( $heightField );
  }

  .mdc-text-field--textarea {
    height: var(--height-field);
  }

  .mdc-text-field--outlined .adjustHeight {
    height: var(--height-field);
  }

  .search-padding {
    padding-left: 35px;
  }

  .mdc-text-field {
    background-color: white;
  }

  input[type="datetime-local"]::-webkit-calendar-picker-indicator {
    display: block;
  }
</style>